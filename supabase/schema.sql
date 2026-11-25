-- PrimeTech · Sistema de tickets, clientes, proyectos, contabilidad y suscripciones.
-- Se puede volver a ejecutar sin perder datos (usa IF NOT EXISTS / OR REPLACE).

create extension if not exists pgcrypto;

-- ---------- Administradores (quién entra al panel) ----------
create table if not exists public.admins (
  email text primary key,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins a where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;

-- ---------- Clientes ----------
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,                       -- nombre comercial
  legal_name text,                          -- razón social
  rfc text,
  industry text,                            -- giro
  contact_name text,
  email text,
  phone text,
  address text,
  website text,
  notes text,
  status text not null default 'activo' check (status in ('activo','pausado','inactivo')),
  support_enabled boolean not null default false,   -- soporte técnico, reparación y compra de equipos
  portal_token text not null unique default encode(gen_random_bytes(12), 'hex'),
  color text default '#22d3ee',
  created_at timestamptz not null default now()
);

-- Servicios que el cliente tiene contigo (se vuelven categorías de ticket)
create table if not exists public.client_services (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- Proyectos ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  name text not null,
  type text,                                -- sitio web, chatbot, ERP, CCTV, etc.
  stage text not null default 'diagnostico'
    check (stage in ('prospecto','diagnostico','propuesta','construccion','entrega','soporte','pausado','cancelado')),
  amount numeric(12,2) default 0,           -- monto acordado (sin IVA)
  start_date date,
  due_date date,
  description text,
  repo_url text,
  site_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.project_notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

-- ---------- Suscripciones ----------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,                       -- hosting, soporte mensual, chatbot, licencia...
  amount numeric(12,2) not null default 0,
  currency text not null default 'MXN',
  period text not null default 'mensual' check (period in ('mensual','bimestral','trimestral','semestral','anual','unico')),
  start_date date default current_date,
  next_charge date,
  status text not null default 'activa' check (status in ('activa','pausada','cancelada')),
  notes text,
  created_at timestamptz not null default now()
);

-- ---------- Contabilidad ----------
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  kind text not null check (kind in ('ingreso','gasto')),
  amount numeric(12,2) not null,
  concept text not null,
  category text,                            -- proyecto, suscripción, equipo, herramienta, publicidad...
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  method text,                              -- transferencia, efectivo, tarjeta
  paid boolean not null default true,       -- false = por cobrar / por pagar
  notes text,
  created_at timestamptz not null default now()
);

-- ---------- Tickets ----------
create sequence if not exists public.ticket_number_seq start 1001;

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  number integer not null unique default nextval('public.ticket_number_seq'),
  client_id uuid not null references public.clients(id) on delete cascade,
  category text not null,
  subject text not null,
  description text not null,
  priority text not null default 'normal' check (priority in ('baja','normal','alta','urgente')),
  status text not null default 'nuevo' check (status in ('nuevo','en_proceso','en_espera','resuelto','cerrado')),
  contact_name text,
  contact_phone text,
  contact_email text,
  source text not null default 'portal',    -- portal, panel, whatsapp, correo
  project_id uuid references public.projects(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  author text not null check (author in ('cliente','primetech','sistema')),
  body text not null,
  internal boolean not null default false,  -- nota interna: el cliente no la ve
  created_at timestamptz not null default now()
);

create table if not exists public.ticket_files (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.tickets(id) on delete cascade,
  path text not null,
  name text not null,
  size integer,
  mime text,
  created_at timestamptz not null default now()
);

create index if not exists tickets_client_idx on public.tickets(client_id, status);
create index if not exists tx_date_idx on public.transactions(date);
create index if not exists subs_client_idx on public.subscriptions(client_id);

-- updated_at / resolved_at automáticos
create or replace function public.touch_ticket() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  if new.status in ('resuelto','cerrado') and (old.status is null or old.status not in ('resuelto','cerrado')) then
    new.resolved_at := now();
  elsif new.status not in ('resuelto','cerrado') then
    new.resolved_at := null;
  end if;
  return new;
end $$;
drop trigger if exists tickets_touch on public.tickets;
create trigger tickets_touch before update on public.tickets for each row execute function public.touch_ticket();

-- ---------- Seguridad: solo administradores leen y escriben las tablas ----------
do $$
declare t text;
begin
  foreach t in array array['admins','clients','client_services','projects','project_notes','subscriptions','transactions','tickets','ticket_messages','ticket_files']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists admin_all on public.%I', t);
    execute format('create policy admin_all on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- ---------- Portal del cliente (sin login, con su enlace privado) ----------
-- Categorías base de soporte técnico (solo si el cliente lo tiene activado)
create or replace function public.support_categories() returns text[] language sql immutable as $$
  select array['Soporte técnico','Reparación de software','Reparación de hardware','Compra de equipo (laptop, PC, periféricos)','Impresoras y arrendamiento','Redes e internet'];
$$;

create or replace function public.portal_info(p_token text) returns json
language plpgsql stable security definer set search_path = public as $$
declare c public.clients; cats text[];
begin
  select * into c from public.clients where portal_token = p_token and status <> 'inactivo';
  if not found then return null; end if;
  select coalesce(array_agg(s.name order by s.created_at), '{}') into cats
    from public.client_services s where s.client_id = c.id and s.active;
  if c.support_enabled then cats := cats || public.support_categories(); end if;
  cats := cats || array['Otro'];
  return json_build_object(
    'name', c.name, 'color', c.color, 'categories', cats,
    'tickets', coalesce((select json_agg(json_build_object(
        'id', t.id, 'number', t.number, 'subject', t.subject, 'category', t.category,
        'status', t.status, 'priority', t.priority, 'created_at', t.created_at, 'updated_at', t.updated_at,
        'messages', coalesce((select json_agg(json_build_object('author', m.author, 'body', m.body, 'created_at', m.created_at) order by m.created_at)
                    from public.ticket_messages m where m.ticket_id = t.id and not m.internal), '[]'::json),
        'files', coalesce((select json_agg(json_build_object('name', f.name, 'path', f.path)) from public.ticket_files f where f.ticket_id = t.id), '[]'::json)
      ) order by t.created_at desc) from public.tickets t where t.client_id = c.id), '[]'::json)
  );
end $$;

create or replace function public.portal_create_ticket(
  p_token text, p_category text, p_subject text, p_description text,
  p_contact_name text default null, p_contact_phone text default null, p_contact_email text default null,
  p_priority text default 'normal', p_files json default '[]'::json
) returns json
language plpgsql security definer set search_path = public as $$
declare c public.clients; t public.tickets; f json;
begin
  select * into c from public.clients where portal_token = p_token and status <> 'inactivo';
  if not found then raise exception 'Enlace no válido'; end if;
  if coalesce(trim(p_subject),'') = '' or coalesce(trim(p_description),'') = '' then raise exception 'Falta asunto o descripción'; end if;
  if p_priority not in ('baja','normal','alta','urgente') then p_priority := 'normal'; end if;
  insert into public.tickets(client_id, category, subject, description, priority, contact_name, contact_phone, contact_email, source)
  values (c.id, left(p_category,120), left(p_subject,200), left(p_description,8000), p_priority,
          nullif(trim(p_contact_name),''), nullif(trim(p_contact_phone),''), nullif(trim(p_contact_email),''), 'portal')
  returning * into t;
  for f in select * from json_array_elements(coalesce(p_files,'[]'::json)) loop
    if (f->>'path') like p_token || '/%' then
      insert into public.ticket_files(ticket_id, path, name, size, mime)
      values (t.id, f->>'path', left(f->>'name',200), (f->>'size')::int, f->>'mime');
    end if;
  end loop;
  return json_build_object('id', t.id, 'number', t.number, 'client', c.name, 'client_email', c.email);
end $$;

create or replace function public.portal_reply(p_token text, p_ticket uuid, p_body text) returns boolean
language plpgsql security definer set search_path = public as $$
declare tid uuid;
begin
  select t.id into tid from public.tickets t join public.clients c on c.id = t.client_id
   where c.portal_token = p_token and t.id = p_ticket;
  if tid is null or coalesce(trim(p_body),'') = '' then return false; end if;
  insert into public.ticket_messages(ticket_id, author, body) values (tid, 'cliente', left(p_body,4000));
  update public.tickets set status = case when status in ('en_espera','resuelto') then 'en_proceso' else status end where id = tid;
  return true;
end $$;

create or replace function public.portal_token_ok(p_token text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.clients where portal_token = p_token and status <> 'inactivo');
$$;

revoke all on function public.portal_info(text), public.portal_create_ticket(text,text,text,text,text,text,text,text,json),
  public.portal_reply(text,uuid,text), public.portal_token_ok(text) from public;
grant execute on function public.portal_info(text), public.portal_create_ticket(text,text,text,text,text,text,text,text,json),
  public.portal_reply(text,uuid,text), public.portal_token_ok(text) to anon, authenticated;

-- ---------- Archivos adjuntos (bucket privado) ----------
insert into storage.buckets (id, name, public, file_size_limit)
values ('adjuntos', 'adjuntos', false, 15728640)
on conflict (id) do update set public = false, file_size_limit = 15728640;

drop policy if exists adjuntos_admin on storage.objects;
create policy adjuntos_admin on storage.objects for all to authenticated
  using (bucket_id = 'adjuntos' and public.is_admin()) with check (bucket_id = 'adjuntos' and public.is_admin());

drop policy if exists adjuntos_portal_insert on storage.objects;
create policy adjuntos_portal_insert on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'adjuntos' and public.portal_token_ok((storage.foldername(name))[1]));

drop policy if exists adjuntos_portal_read on storage.objects;
create policy adjuntos_portal_read on storage.objects for select to anon
  using (bucket_id = 'adjuntos' and public.portal_token_ok((storage.foldername(name))[1]));

-- ---------- Panel: resumen ----------
create or replace view public.v_month_summary with (security_invoker = true) as
select date_trunc('month', date)::date as month,
       sum(amount) filter (where kind = 'ingreso' and paid) as ingresos,
       sum(amount) filter (where kind = 'gasto' and paid) as gastos,
       sum(amount) filter (where kind = 'ingreso' and not paid) as por_cobrar
from public.transactions group by 1 order by 1 desc;
