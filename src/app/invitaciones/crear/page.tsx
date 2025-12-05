"use client";
import React, { useState } from 'react';
import { InvitationData, eventConfig, EventType, FontStyle, ItineraryItem } from '@/lib/invitationData';
import LiveInvitation from '@/components/invitations/LiveInvitation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Save, ArrowLeft, Palette, User, MapPin, Gift, Monitor, Smartphone, Loader2, CreditCard, Upload, Trash2, Plus, Clock, AlertCircle, Video } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase"; 

const initialData: InvitationData = {
    type: 'boda',
    themeColor: 'gold', 
    font: 'elegant',
    musicUrl: '',
    coverMedia: { url: '', type: 'image' },
    gallery: [],
    hosts: ['', ''],
    eventDate: new Date().toISOString().split('T')[0],
    location: { name: '', address: '', mapUrl: '' },
    whatsappNumber: '',
    giftRegistry: { type: 'mesa', phrase: '' },
    dressCode: { type: 'formal', label: 'Formal' },
    padrinos: [],
    itinerary: []
};

const itineraryIcons = [
    { id: 'church', emoji: '⛪', label: 'Misa/Ceremonia' },
    { id: 'rings', emoji: '💍', label: 'Civil/Anillos' },
    { id: 'cheers', emoji: '🥂', label: 'Brindis/Cóctel' },
    { id: 'dinner', emoji: '🍽️', label: 'Cena/Comida' },
    { id: 'party', emoji: '💃', label: 'Fiesta/Baile' },
    { id: 'cake', emoji: '🎂', label: 'Pastel' },
    { id: 'photo', emoji: '📸', label: 'Fotos' },
    { id: 'bus', emoji: '🚌', label: 'Transporte' },
];

const countryCodes = [
    { code: '+52', label: '🇲🇽 México (+52)' },
    { code: '+1', label: '🇺🇸 USA (+1)' },
    { code: '+34', label: '🇪🇸 España (+34)' },
    { code: '+57', label: '🇨🇴 Colombia (+57)' },
    { code: '+54', label: '🇦🇷 Argentina (+54)' },
    { code: '+56', label: '🇨🇱 Chile (+56)' },
    { code: '+51', label: '🇵🇪 Perú (+51)' },
];

const solidColors = ['navy','black','gold','rose','blue','purple','green','orange','yellow','sky', 'red', 'teal', 'emerald', 'indigo', 'fuchsia', 'slate'];
const gradientColors = ['sunset', 'ocean', 'royal', 'forest', 'midnight', 'berry', 'fire', 'aurora'];

export default function BuilderPage() {
    const [data, setData] = useState<InvitationData>(initialData);
    const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
    const [activeSection, setActiveSection] = useState<'design' | 'content' | 'place' | 'itinerary' | 'gifts'>('design');
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('mobile');
    
    // Estado local para el teléfono (separado)
    const [phoneCode, setPhoneCode] = useState('+52');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [showSaveModal, setShowSaveModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingFile, setUploadingFile] = useState<string | null>(null);
    const [clientInfo, setClientInfo] = useState({ name: '', phone: '', slug: '' });

    const config = eventConfig[data.type] || eventConfig.boda;

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'musicUrl' | 'coverMedia') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (field === 'musicUrl') {
            if (!file.type.includes('audio')) return alert('Solo se permiten archivos de audio (MP3).');
            if (file.size > 10 * 1024 * 1024) return alert('El audio debe pesar menos de 10MB.');
        } else {
            // Lógica para portada (Foto o Video)
            const isVideo = file.type.includes('video');
            const isImage = file.type.includes('image');
            
            if (!isVideo && !isImage) return alert('Solo se permiten Imágenes (JPG/PNG) o Videos (MP4).');
            if (file.size > 25 * 1024 * 1024) return alert('El archivo debe pesar menos de 25MB.');
            
            // Si es video, verificar duración (aprox por tamaño, o advertencia)
            // No podemos validar duración exacta sin cargar metadata, pero el límite de MB ayuda.
        }

        setUploadingFile(field);
        try {
            const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            
            if (field === 'coverMedia') {
                const type = file.type.includes('video') ? 'video' : 'image';
                setData(prev => ({ ...prev, coverMedia: { url, type } }));
            } else {
                setData(prev => ({ ...prev, [field]: url }));
            }
        } catch (error) {
            console.error("Error subiendo archivo:", error);
            alert("Error al subir el archivo.");
        } finally {
            setUploadingFile(null);
        }
    };

    const addItineraryItem = () => {
        const newItem: ItineraryItem = {
            id: Date.now().toString(),
            time: '14:00',
            icon: 'church',
            description: 'Ceremonia'
        };
        setData(prev => ({...prev, itinerary: [...(prev.itinerary || []), newItem]}));
    };

    const updateItineraryItem = (id: string, field: keyof ItineraryItem, value: any) => {
        setData(prev => ({
            ...prev,
            itinerary: prev.itinerary?.map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const removeItineraryItem = (id: string) => {
        setData(prev => ({
            ...prev,
            itinerary: prev.itinerary?.filter(item => item.id !== id)
        }));
    };

    const handleTypeChange = (newType: EventType) => {
        const newConfig = eventConfig[newType];
        setData((prev) => {
            const currentRegistryType = prev.giftRegistry?.type || 'mesa';
            // Resetear hosts si cambia la estructura
            const newHosts = newConfig.sections.multiHost ? ['', ''] : [''];
            return {
                ...prev,
                type: newType,
                hosts: newHosts,
                themeColor: newConfig.defaultColor,
                font: newConfig.defaultFont,
                giftRegistry: { 
                    ...prev.giftRegistry,
                    type: currentRegistryType, 
                    phrase: newConfig.sections.giftLabel === 'Sobres' ? 'Agradecemos su presente en sobre.' : newConfig.labels.action 
                }
            };
        });
    };

    const handleAutoFill = () => {
        const typeConfig = eventConfig[data.type];
        setData(prev => ({
            ...prev,
            hosts: data.type === 'boda' ? ['Ana', 'Carlos'] : ['Sofía'],
            eventDate: '2025-11-15T16:00',
            age: 5,
            location: { name: 'Hacienda La Joya', address: 'Calle 123, Ciudad', mapUrl: 'https://google.com/maps' },
            reception: { name: 'Jardín Las Fuentes', address: 'Mismo lugar', mapUrl: '' },
            whatsappNumber: '5213312345678',
            giftRegistry: { type: 'sobres', phrase: typeConfig.labels.action, bankInfo: '', url: '' },
            padrinos: ['Juan Pérez - Padrino de Velación', 'María López - Madrina de Anillos'],
            itinerary: [
                { id: '1', time: '16:00', icon: 'church', description: 'Ceremonia Religiosa' },
                { id: '2', time: '18:00', icon: 'cheers', description: 'Recepción y Cóctel' },
                { id: '3', time: '20:00', icon: 'dinner', description: 'Cena' },
            ]
        }));
        setPhoneNumber('3312345678');
    };

    const handlePreSave = () => {
        // Concatenar teléfono antes de guardar
        const fullPhone = `${phoneCode.replace('+','')}${phoneNumber}`;
        setData(prev => ({ ...prev, whatsappNumber: fullPhone }));

        const names = data.hosts.filter(h => h.trim() !== '').join('-y-') || 'evento';
        const rawSlug = `${data.type}-${names}`;
        
        const cleanSlug = rawSlug.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9-]/g, '-') 
            .replace(/-+/g, '-')       
            .replace(/^-|-$/g, '');
        
        const uniqueSuffix = Math.random().toString(36).substring(2, 5);
        const finalSlug = `${cleanSlug}-${uniqueSuffix}`;

        setClientInfo(prev => ({ ...prev, slug: finalSlug }));
        setShowSaveModal(true);
    };

    const saveToFirebase = async () => {
        if(!clientInfo.slug || !clientInfo.phone || !clientInfo.name) {
            alert("Por favor completa tu nombre, teléfono y verifica el link.");
            return;
        }
        
        setIsSaving(true);
        try {
            const finalData: InvitationData = {
                ...data,
                whatsappNumber: `${phoneCode.replace('+','')}${phoneNumber}`, // Asegurar guardar numero actualizado
                slug: clientInfo.slug,
                clientName: clientInfo.name,
                clientPhone: clientInfo.phone,
                isActive: false, 
                createdAt: Date.now()
            };

            await setDoc(doc(db, "invitaciones", clientInfo.slug), finalData);
            
            const adminNumber = "523330620287"; 
            const domain = typeof window !== 'undefined' ? window.location.origin : 'https://www.primetechsolutions.com.mx';
            const invitationLink = `${domain}/${clientInfo.slug}`;
            
            const msg = `¡Hola! 👋 Acabo de terminar mi invitación digital.\n\n🔗 Link: ${invitationLink}\n👤 Cliente: ${clientInfo.name}\n\nAdjunto mi comprobante de pago para que puedan ACTIVARLA. ✅`;
            
            window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(msg)}`, '_blank');
            
            alert("¡Solicitud creada! Se abrirá WhatsApp para que envíes tu comprobante.");
            setShowSaveModal(false);
        } catch (error) {
            console.error("Error guardando:", error);
            alert("Hubo un error al guardar. Intenta de nuevo.");
        } finally {
            setIsSaving(false);
        }
    };

    // Actualizar un host específico
    const updateHost = (index: number, value: string) => {
        const newHosts = [...data.hosts];
        newHosts[index] = value;
        setData({...data, hosts: newHosts});
    };

    const inputStyle = "bg-slate-800 border-slate-700 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 w-full";
    const labelStyle = "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block";

    const editorContent = (
        <div className="pb-32 md:pb-0 space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-700/50 mb-4 sticky top-0 bg-[#0f172a] z-10 pt-2">
                {[
                    { id: 'design', icon: <Palette size={18}/>, label: 'Diseño' },
                    { id: 'content', icon: <User size={18}/>, label: 'Datos' },
                    { id: 'place', icon: <MapPin size={18}/>, label: 'Lugar' },
                    { id: 'itinerary', icon: <Clock size={18}/>, label: 'Itinerario' },
                    { id: 'gifts', icon: <Gift size={18}/>, label: 'Extras' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id as any)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                            activeSection === item.id 
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        )}
                    >
                        {item.icon} {item.label}
                    </button>
                ))}
            </div>

            {activeSection === 'design' && (
                <div className="space-y-6">
                    <div>
                        <Label className={labelStyle}>Tipo de Evento</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {Object.keys(eventConfig).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => handleTypeChange(key as EventType)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-2 rounded-xl border transition-all gap-1 h-20",
                                        data.type === key 
                                            ? "bg-blue-600/20 border-blue-500 text-blue-100" 
                                            : "bg-slate-800 border-transparent text-slate-500 hover:bg-slate-700"
                                    )}
                                >
                                    <span className="text-2xl">{eventConfig[key as EventType].icon}</span>
                                    <span className="text-[10px] uppercase font-bold truncate w-full text-center">{key}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label className={labelStyle}>Colores Sólidos</Label>
                        <div className="flex flex-wrap gap-3 mb-4">
                            {solidColors.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setData({...data, themeColor: c})}
                                    className={cn(
                                        "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                                        "border border-slate-500 shadow-sm", // Borde añadido para visibilidad
                                        data.themeColor === c ? "border-white scale-110 ring-2 ring-blue-500" : "opacity-70"
                                    )}
                                    style={{ backgroundColor: c === 'navy' ? '#0f172a' : c === 'gold' ? '#d6d3d1' : c }}
                                    title={c}
                                />
                            ))}
                        </div>
                        <Label className={labelStyle}>Gradientes Especiales</Label>
                        <div className="flex flex-wrap gap-3">
                            {gradientColors.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setData({...data, themeColor: c})}
                                    className={cn(
                                        "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                                        "border border-slate-500 shadow-sm",
                                        data.themeColor === c ? "border-white scale-110 ring-2 ring-blue-500" : "opacity-80"
                                    )}
                                    style={{ 
                                        background: c === 'sunset' ? 'linear-gradient(to bottom right, #ffedd5, #fecdd3)' : 
                                                    c === 'ocean' ? 'linear-gradient(to bottom right, #dbeafe, #a5f3fc)' :
                                                    c === 'royal' ? 'linear-gradient(to bottom right, #0f172a, #581c87)' :
                                                    c === 'midnight' ? 'linear-gradient(to bottom, #111827, #000000)' :
                                                    'gray'
                                    }}
                                    title={c}
                                >
                                    <span className="text-[8px] text-black/50 font-bold block pt-3">{c[0].toUpperCase()}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label className={labelStyle}>Tipografía</Label>
                        <select className={inputStyle} value={data.font} onChange={(e) => setData({...data, font: e.target.value as FontStyle})}>
                            <option value="modern">Moderna (Limpia)</option>
                            <option value="elegant">Elegante (Boda)</option>
                            <option value="playful">Divertida (Niños)</option>
                            <option value="classic">Clásica (Formal)</option>
                            <option value="spooky">Halloween</option>
                            <option value="tech">Tech (Geek)</option>
                        </select>
                    </div>
                </div>
            )}

            {activeSection === 'content' && (
                <div className="space-y-6">
                    <div>
                        <Label className={labelStyle}>{config.labels.host}</Label>
                        
                        {/* INPUTS SEPARADOS PARA NOMBRES */}
                        {config.sections.multiHost ? (
                             <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <span className="text-[10px] text-slate-500 mb-1 block">Nombre 1 (Ej. Novia)</span>
                                    <Input 
                                        className={inputStyle} 
                                        placeholder="Nombre 1" 
                                        value={data.hosts[0] || ''} 
                                        onChange={(e) => updateHost(0, e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <span className="text-[10px] text-slate-500 mb-1 block">Nombre 2 (Ej. Novio)</span>
                                    <Input 
                                        className={inputStyle} 
                                        placeholder="Nombre 2" 
                                        value={data.hosts[1] || ''} 
                                        onChange={(e) => updateHost(1, e.target.value)} 
                                    />
                                </div>
                             </div>
                        ) : (
                            <Input 
                                className={inputStyle} 
                                placeholder="Nombre del Festejado/a" 
                                value={data.hosts[0] || ''} 
                                onChange={(e) => updateHost(0, e.target.value)} 
                            />
                        )}
                    </div>

                    {config.sections.hasAge && (
                         <div>
                            <Label className={labelStyle}>Edad a cumplir</Label>
                            <Input type="number" className={inputStyle} value={data.age || ''} onChange={(e) => setData({...data, age: parseInt(e.target.value) || 0})} />
                        </div>
                    )}
                    <div>
                        <Label className={labelStyle}>Fecha y Hora</Label>
                        <Input type="datetime-local" className={`${inputStyle} [color-scheme:dark]`} value={data.eventDate} onChange={(e) => setData({...data, eventDate: e.target.value})} />
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <Label className={labelStyle}>Foto o Video de Portada</Label>
                        <div className="flex gap-4 items-center">
                            {data.coverMedia?.url && (
                                data.coverMedia.type === 'video' ? (
                                    <video src={data.coverMedia.url} className="w-16 h-16 object-cover rounded-lg border border-slate-600" />
                                ) : (
                                    <img src={data.coverMedia.url} className="w-16 h-16 object-cover rounded-lg border border-slate-600" />
                                )
                            )}
                            <div className="flex-1">
                                <label className="cursor-pointer flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg text-sm transition-colors border border-dashed border-slate-500">
                                    {uploadingFile === 'coverMedia' ? <Loader2 className="animate-spin" size={16}/> : <Upload size={16}/>}
                                    {uploadingFile === 'coverMedia' ? 'Subiendo...' : 'Subir Imagen o Video (3min Max)'}
                                    <input type="file" className="hidden" accept="image/png, image/jpeg, video/mp4" onChange={(e) => handleFileUpload(e, 'coverMedia')} disabled={!!uploadingFile}/>
                                </label>
                                <p className="text-[10px] text-slate-500 mt-2">Soporta JPG, PNG y MP4 (Videos cortos en loop).</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <Label className={labelStyle}>Música de Fondo</Label>
                         <div className="flex flex-col gap-2">
                            {data.musicUrl && <p className="text-xs text-green-400 flex items-center gap-1"><Sparkles size={12}/> Audio cargado correctamente</p>}
                            <label className="cursor-pointer flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg text-sm transition-colors border border-dashed border-slate-500">
                                {uploadingFile === 'musicUrl' ? <Loader2 className="animate-spin" size={16}/> : <Upload size={16}/>}
                                {uploadingFile === 'musicUrl' ? 'Subiendo...' : 'Subir Audio (MP3 - Max 10MB)'}
                                <input type="file" className="hidden" accept="audio/mpeg" onChange={(e) => handleFileUpload(e, 'musicUrl')} disabled={!!uploadingFile}/>
                            </label>
                         </div>
                    </div>
                </div>
            )}

            {activeSection === 'itinerary' && (
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className={labelStyle}>Cronograma del Evento</Label>
                        <Button size="sm" onClick={addItineraryItem} className="bg-blue-600 hover:bg-blue-500 text-xs">
                            <Plus size={14} className="mr-1"/> Agregar Hora
                        </Button>
                    </div>
                    {(!data.itinerary || data.itinerary.length === 0) && (
                        <div className="text-center py-8 text-slate-500 border border-dashed border-slate-700 rounded-lg">
                            <Clock size={32} className="mx-auto mb-2 opacity-50"/>
                            <p className="text-sm">Aún no hay actividades.</p>
                        </div>
                    )}
                    <div className="space-y-3">
                        {data.itinerary?.map((item) => (
                            <div key={item.id} className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex gap-3 items-start animate-in slide-in-from-bottom-2">
                                <div className="space-y-2">
                                    <Input type="time" className="bg-slate-900 border-slate-600 h-10 w-24 text-center [color-scheme:dark]" value={item.time} onChange={(e) => updateItineraryItem(item.id, 'time', e.target.value)} />
                                    <select className="bg-slate-900 border-slate-600 h-10 w-24 text-lg rounded-md text-center" value={item.icon} onChange={(e) => updateItineraryItem(item.id, 'icon', e.target.value)}>
                                        {itineraryIcons.map(icon => (<option key={icon.id} value={icon.id}>{icon.emoji}</option>))}
                                    </select>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Input className="bg-slate-900 border-slate-600" placeholder="Descripción (ej. Misa)" value={item.description} onChange={(e) => updateItineraryItem(item.id, 'description', e.target.value)} />
                                </div>
                                <Button size="icon" variant="ghost" className="text-slate-500 hover:text-red-400" onClick={() => removeItineraryItem(item.id)}><Trash2 size={16}/></Button>
                            </div>
                        ))}
                    </div>
                 </div>
            )}

            {activeSection === 'place' && (
                <div className="space-y-6">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <Label className={labelStyle}>{config.labels.location}</Label>
                        <Input className={inputStyle + " mb-2"} placeholder="Nombre del Lugar" value={data.location.name} onChange={(e) => setData({...data, location: {...data.location, name: e.target.value}})} />
                        <Input className={inputStyle + " mb-2"} placeholder="Dirección" value={data.location.address} onChange={(e) => setData({...data, location: {...data.location, address: e.target.value}})} />
                        <Input className={inputStyle} placeholder="Link Google Maps" value={data.location.mapUrl} onChange={(e) => setData({...data, location: {...data.location, mapUrl: e.target.value}})} />
                    </div>
                     {config.sections.hasReception && (
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <Label className={labelStyle}>{config.labels.reception} (Opcional)</Label>
                            <Input className={inputStyle + " mb-2"} placeholder="Lugar Recepción" value={data.reception?.name || ''} onChange={(e) => setData({...data, reception: {...data.reception!, name: e.target.value}})} />
                            <Input className={inputStyle} placeholder="Dirección" value={data.reception?.address || ''} onChange={(e) => setData({...data, reception: {...data.reception!, address: e.target.value}})} />
                        </div>
                    )}
                </div>
            )}

            {activeSection === 'gifts' && (
                <div className="space-y-6">
                    <div>
                        <Label className={labelStyle}>WhatsApp Confirmación</Label>
                        <div className="flex gap-2">
                            <select 
                                className="bg-slate-800 border-slate-700 text-white rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 w-32"
                                value={phoneCode}
                                onChange={(e) => setPhoneCode(e.target.value)}
                            >
                                {countryCodes.map(c => (
                                    <option key={c.code} value={c.code}>{c.label}</option>
                                ))}
                            </select>
                            <Input 
                                className={inputStyle} 
                                placeholder="Número (10 dígitos)" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} 
                                type="tel"
                            />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">Selecciona país y escribe tu número sin espacios.</p>
                    </div>
                     <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <Label className={labelStyle}>{config.sections.giftLabel}</Label>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                             {[
                                 {id: 'mesa', label: 'Mesa Regalos'},
                                 {id: 'sobres', label: '✉️ Sobres'},
                                 {id: 'amazon', label: '🛒 Web/Amazon'},
                                 {id: 'none', label: '🚫 Nada'},
                             ].map((opt) => (
                                 <button key={opt.id} onClick={() => setData(prev => ({...prev, giftRegistry: { ...prev.giftRegistry!, type: opt.id as any }}))} className={cn("px-3 py-2 rounded-lg text-xs font-bold transition-all border", data.giftRegistry?.type === opt.id ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-900 border-slate-700 text-slate-400")}>{opt.label}</button>
                             ))}
                        </div>
                         {data.giftRegistry?.type !== 'none' && (
                            <>
                                <Input className={inputStyle + " mb-2"} placeholder="Frase..." value={data.giftRegistry?.phrase} onChange={(e) => setData(prev => ({...prev, giftRegistry: { ...prev.giftRegistry!, phrase: e.target.value }}))} />
                                {data.giftRegistry?.type !== 'sobres' && (
                                     <Textarea className={inputStyle} placeholder={data.giftRegistry?.type === 'amazon' ? "Link de la lista..." : "Datos bancarios..."} value={data.giftRegistry?.bankInfo} onChange={(e) => setData(prev => ({...prev, giftRegistry: { ...prev.giftRegistry!, bankInfo: e.target.value }}))} />
                                )}
                            </>
                        )}
                    </div>
                     <div>
                        <Label className={labelStyle}>Código de Vestimenta</Label>
                        <Input className={inputStyle} placeholder="Ej: Formal..." value={data.dressCode?.label} onChange={(e) => setData({...data, dressCode: { type: 'tematico', label: e.target.value }})} />
                    </div>
                    {config.sections.hasPadrinos && (
                        <div>
                            <Label className={labelStyle}>Padrinos / Cortejo / Texto</Label>
                            <Textarea className={inputStyle} placeholder="Lista de nombres..." value={data.padrinos?.join('\n') || ''} onChange={(e) => setData({...data, padrinos: e.target.value.split('\n')})}/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="h-screen md:h-screen flex flex-col md:flex-row bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
            <div className="hidden md:flex w-[450px] border-r border-slate-800 bg-[#1e293b] flex-col z-20 shadow-2xl">
                 <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <Link href="/diseno-grafico" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm"><ArrowLeft size={16}/> Salir</Link>
                    <h1 className="font-bold text-white">PrimeBuilder</h1>
                    <Button size="sm" variant="ghost" onClick={handleAutoFill}><Sparkles size={14}/></Button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700">{editorContent}</div>
                 <div className="p-4 border-t border-slate-700 bg-[#1e293b]">
                     <Button onClick={handlePreSave} className="w-full bg-blue-600 hover:bg-blue-500 font-bold py-6 text-lg shadow-lg"><Save size={20} className="mr-2"/> Solicitar Link</Button>
                 </div>
            </div>

            {/* VERSION MÓVIL (APP MODE - FIXED) */}
            <div className="md:hidden fixed inset-0 z-[100] flex flex-col h-[100dvh] w-full bg-[#0f172a]">
                <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-[#1e293b] flex-shrink-0">
                    <Link href="/diseno-grafico"><ArrowLeft size={20} className="text-slate-400"/></Link>
                    <div className="flex bg-slate-800 rounded-full p-1">
                        <button onClick={() => setMobileTab('edit')} className={cn("px-4 py-1.5 rounded-full text-xs font-bold transition-all", mobileTab === 'edit' ? "bg-blue-600 text-white" : "text-slate-400")}>Editar</button>
                        <button onClick={() => setMobileTab('preview')} className={cn("px-4 py-1.5 rounded-full text-xs font-bold transition-all", mobileTab === 'preview' ? "bg-blue-600 text-white" : "text-slate-400")}>Ver</button>
                    </div>
                    <Button size="icon" variant="ghost" onClick={handleAutoFill}><Sparkles size={18} className="text-yellow-400"/></Button>
                </div>
                
                <div className="flex-1 overflow-y-auto relative w-full">
                    {mobileTab === 'edit' ? (
                        <div className="p-4 pb-24">{editorContent}</div> 
                    ) : (
                        <div className="min-h-full w-full bg-black relative">
                            <LiveInvitation data={data} previewMode={true} />
                        </div>
                    )}
                </div>
                
                {mobileTab === 'edit' && <div className="absolute bottom-6 right-6 z-50"><Button onClick={handlePreSave} size="lg" className="rounded-full w-14 h-14 bg-green-600 hover:bg-green-500 shadow-xl shadow-green-900/50 p-0 flex items-center justify-center"><Save size={24} /></Button></div>}
            </div>

            {/* PREVIEW DESKTOP */}
            <div className="hidden md:flex flex-1 bg-[#0f172a] relative items-center justify-center p-8">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#334155 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
                <div className="absolute top-6 right-6 z-20 flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => setViewMode('mobile')} className={cn("rounded-full hover:bg-slate-700", viewMode === 'mobile' ? "bg-blue-600 text-white" : "text-slate-400")}><Smartphone size={20} /></Button>
                    <Button size="icon" variant="ghost" onClick={() => setViewMode('desktop')} className={cn("rounded-full hover:bg-slate-700", viewMode === 'desktop' ? "bg-blue-600 text-white" : "text-slate-400")}><Monitor size={20} /></Button>
                </div>
                <div className="bg-slate-800/50 backdrop-blur absolute top-6 rounded-full px-4 py-2 border border-slate-700 text-slate-400 text-sm">Vista Previa en Tiempo Real</div>
                <div className={cn("relative z-10 transition-all duration-500 shadow-2xl overflow-hidden bg-white transform-gpu", viewMode === 'mobile' ? 'w-[375px] h-[750px] rounded-[40px] border-[12px] border-slate-900 ring-2 ring-slate-700' : 'w-[90%] h-[85%] rounded-lg border border-slate-700')} style={{ transform: 'scale(1)', contain: 'strict' }}>
                    {viewMode === 'mobile' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-50"></div>}
                    <div className="w-full h-full overflow-y-auto scrollbar-hide bg-white"><LiveInvitation data={data} previewMode={true} /></div>
                </div>
            </div>

            {/* MODAL DE PAGO Y GUARDADO */}
            {showSaveModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95">
                        <button onClick={() => setShowSaveModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
                        <div className="text-center mb-6"><h2 className="text-2xl font-bold text-slate-900">¡Último paso! 🚀</h2><p className="text-slate-500 text-sm">Ingresa tus datos.</p></div>
                        
                        <div className="space-y-4">
                            <div><Label className="text-slate-700 text-xs font-bold mb-1">NOMBRE</Label><Input className="bg-slate-50 border-slate-300 text-slate-900" value={clientInfo.name} onChange={e => setClientInfo({...clientInfo, name: e.target.value})} placeholder="Ej: Juan Pérez"/></div>
                            <div><Label className="text-slate-700 text-xs font-bold mb-1">WHATSAPP</Label><Input className="bg-slate-50 border-slate-300 text-slate-900" value={clientInfo.phone} onChange={e => setClientInfo({...clientInfo, phone: e.target.value})} placeholder="33..." type="tel"/></div>
                            <div><Label className="text-slate-700 text-xs font-bold mb-1">LINK</Label><div className="flex items-center bg-slate-100 border border-slate-300 rounded-md px-3 h-10"><span className="text-slate-400 text-xs mr-1">primetech.com/</span><input className="bg-transparent border-none focus:ring-0 text-blue-600 font-bold text-sm w-full p-0" value={clientInfo.slug} onChange={e => setClientInfo({...clientInfo, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}/></div></div>
                        </div>

                        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                             <p className="text-blue-800 font-bold text-xs mb-3 text-center uppercase">Datos de Transferencia</p>
                             
                             <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 mb-4">
                                <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-2">
                                    <CreditCard className="text-blue-600" size={24} />
                                    <span className="font-bold text-lg text-blue-900">BBVA</span>
                                </div>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <p className="flex flex-col"><span className="font-bold text-[10px] text-slate-400 tracking-wider">BENEFICIARIO</span> <span className="font-medium text-slate-900">GERARDO DEMIAN MORA</span></p>
                                    <p className="flex flex-col"><span className="font-bold text-[10px] text-slate-400 tracking-wider">CLABE (COPIAR)</span> <span className="font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded select-all cursor-text">012320015044275826</span></p>
                                    <p className="flex flex-col"><span className="font-bold text-[10px] text-slate-400 tracking-wider">CUENTA</span> <span className="font-mono text-slate-900 select-all cursor-text">150 442 7582</span></p>
                                </div>
                             </div>

                             <div className="flex gap-3 items-start bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                                <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={16} />
                                <p className="text-[11px] text-yellow-800 leading-tight">
                                    <strong>¡Importante!</strong> Tu invitación se creará en estado <b>inactivo</b>. 
                                    Para activarla, envía la captura de tu pago al WhatsApp que se abrirá al dar clic en el botón de abajo.
                                </p>
                             </div>
                        </div>

                        <Button onClick={saveToFirebase} disabled={isSaving} className="w-full bg-[#25D366] hover:bg-[#1ebc57] text-white font-bold py-6 mt-4 text-lg shadow-lg border-none">
                            {isSaving ? <Loader2 className="animate-spin"/> : 'Enviar y Notificar Pago'}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}