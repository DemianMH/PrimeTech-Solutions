"use client";
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { InvitationData } from '@/lib/invitationData';
import { Button } from '@/components/ui/button';
import { Check, Trash2, Smartphone, Loader2, XCircle, Search, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [invitations, setInvitations] = useState<InvitationData[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "invitaciones"));
            const list: InvitationData[] = [];
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data() as InvitationData, slug: doc.id });
            });
            // Ordenar: Pendientes primero, luego por fecha más reciente
            setInvitations(list.sort((a, b) => (Number(a.isActive) - Number(b.isActive)) || ((b.createdAt || 0) - (a.createdAt || 0))));
        } catch (e) {
            console.error("Error cargando invitaciones:", e);
        }
        setLoading(false);
    };

    useEffect(() => { refreshData(); }, []);

    const toggleStatus = async (slug: string, currentStatus: boolean | undefined) => {
        if (!slug) return;
        if (!currentStatus && !confirm("¿Confirmar pago y activar invitación?")) return;
        
        const ref = doc(db, "invitaciones", slug);
        await updateDoc(ref, { isActive: !currentStatus });
        refreshData();
    };

    const deleteInvitation = async (slug: string) => {
        if(!confirm("⚠️ ¿ESTÁS SEGURO? \n\nSe borrará la invitación permanentemente. No hay vuelta atrás.")) return;
        await deleteDoc(doc(db, "invitaciones", slug));
        refreshData();
    };

    const sendWhatsApp = (inv: InvitationData) => {
        // Usamos window.location.origin para asegurar que el link sea correcto (localhost o dominio real)
        const domain = window.location.origin;
        const url = `${domain}/${inv.slug}`;
        const msg = `¡Hola ${inv.clientName}! 🏴‍☠️\n\nTu invitación digital ya quedó lista y activada.\n\nPuedes verla y compartirla aquí:\n${url}\n\n¡Gracias por confiar en PrimeTech!`;
        window.open(`https://wa.me/${inv.clientPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    if (loading) return <div className="h-screen bg-slate-950 flex items-center justify-center text-white"><Loader2 className="animate-spin text-blue-500" size={48}/></div>;

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans">
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-blue-600 p-2 rounded-xl text-2xl">🛡️</span> Panel de Control
                    </h1>
                    <p className="text-slate-400 text-sm mt-2 ml-1">Administra las invitaciones digitales desde aquí.</p>
                </div>
                <div className="flex gap-3">
                     <Link href="/invitaciones/crear">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white border-0">
                            + Nueva Invitación
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={refreshData} className="border-slate-700 hover:bg-slate-800 text-slate-300">
                        Actualizar Lista
                    </Button>
                </div>
            </header>

            <div className="grid gap-6">
                {invitations.map((inv) => (
                    <div key={inv.slug} className={`relative overflow-hidden p-6 rounded-2xl border transition-all hover:shadow-2xl ${inv.isActive ? 'border-green-900/50 bg-green-950/10' : 'border-yellow-600/50 bg-yellow-950/10'}`}>
                        
                        {/* Indicador de Estado */}
                        <div className="absolute top-0 right-0 p-4">
                             <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg ${inv.isActive ? 'bg-green-500 text-black' : 'bg-yellow-500 text-black animate-pulse'}`}>
                                {inv.isActive ? '✅ ACTIVA / PAGADA' : '⏳ PENDIENTE DE PAGO'}
                            </span>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 md:items-center">
                            
                            {/* Información Principal */}
                            <div className="flex-1 space-y-3">
                                <div>
                                    <p className="text-slate-500 text-xs font-mono mb-1">
                                        Creada el: {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() + ' ' + new Date(inv.createdAt).toLocaleTimeString() : 'N/A'}
                                    </p>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        {inv.hosts.join(' & ')} 
                                        <span className="text-sm font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 capitalize">{inv.type}</span>
                                    </h2>
                                </div>

                                {/* Link y Cliente */}
                                <div className="flex flex-wrap gap-4 mt-2">
                                    <a href={`/${inv.slug}`} target="_blank" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 bg-blue-950/30 px-3 py-2 rounded-lg border border-blue-900/50 transition-colors group">
                                        <ExternalLink size={16}/> 
                                        <span className="font-mono text-sm underline-offset-4 group-hover:underline">/{inv.slug}</span>
                                    </a>
                                    
                                    <div className="flex items-center gap-4 text-sm text-slate-300 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-500">Cliente:</span>
                                            <span className="font-bold text-white">{inv.clientName || '---'}</span>
                                        </div>
                                        <div className="w-px h-4 bg-slate-700"></div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-500">Tel:</span>
                                            <span className="font-mono">{inv.clientPhone || '---'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botonera de Acciones */}
                            <div className="flex flex-row flex-wrap gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                                
                                <Button 
                                    onClick={() => toggleStatus(inv.slug!, inv.isActive)}
                                    className={inv.isActive 
                                        ? "bg-transparent border border-red-900 text-red-400 hover:bg-red-950/50" 
                                        : "bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg shadow-green-900/20"
                                    }
                                >
                                    {inv.isActive ? <><XCircle size={18} className="mr-2"/> Desactivar</> : <><Check size={18} className="mr-2"/> Aprobar Pago</>}
                                </Button>

                                <Button 
                                    onClick={() => sendWhatsApp(inv)} 
                                    disabled={!inv.isActive}
                                    className="bg-[#25D366] hover:bg-[#1ebc57] text-black font-bold border-0"
                                    title="Enviar por WhatsApp"
                                >
                                    <Smartphone size={18} className="mr-2"/> Enviar
                                </Button>

                                <div className="w-px h-10 bg-slate-800 hidden md:block mx-2"></div>

                                {/* Botón Editar (placeholder por ahora lleva al admin, idealmente llevaría al editor con datos cargados) */}
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800" title="Editar (Próximamente)">
                                    <Edit size={18}/>
                                </Button>

                                <Button onClick={() => deleteInvitation(inv.slug!)} variant="ghost" size="icon" className="text-slate-500 hover:text-red-500 hover:bg-red-950/30" title="Eliminar Definitivamente">
                                    <Trash2 size={18}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {invitations.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center text-slate-500 py-32 bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800">
                        <Search size={48} className="mb-4 opacity-20"/>
                        <p className="text-lg font-medium">No hay invitaciones registradas.</p>
                        <p className="text-sm opacity-60">Las solicitudes nuevas aparecerán aquí.</p>
                    </div>
                )}
            </div>
        </div>
    );
}