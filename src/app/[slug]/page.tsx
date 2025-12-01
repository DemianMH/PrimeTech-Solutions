"use client";
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; 
import LiveInvitation from "@/components/invitations/LiveInvitation";
import { InvitationData } from '@/lib/invitationData';
import { Loader2 } from 'lucide-react';

export default function PublicInvitationPage({ params }: { params: { slug: string } }) {
    const [data, setData] = useState<InvitationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInvitation = async () => {
            try {
                // Buscamos el documento con el ID igual al slug
                const docRef = doc(db, "invitaciones", params.slug);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const invData = docSnap.data() as InvitationData;
                    
                    // Solo mostrar si está activa (pagada)
                    if (!invData.isActive) {
                        setError("pending_payment");
                    } else {
                        setData(invData);
                    }
                } else {
                    setError("not_found");
                }
            } catch (err) {
                console.error(err);
                setError("error");
            } finally {
                setLoading(false);
            }
        };

        fetchInvitation();
    }, [params.slug]);

    // Pantalla de Carga
    if (loading) return <div className="h-screen flex items-center justify-center bg-black text-white"><Loader2 className="animate-spin" size={48} /></div>;

    // Pantalla 404
    if (error === 'not_found') return <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4 text-center"><h1 className="text-4xl mb-4">🤷‍♂️</h1><p className="text-xl">No encontramos esta invitación.</p></div>;
    
    // Pantalla Pendiente de Pago
    if (error === 'pending_payment') return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
            <h1 className="text-6xl mb-4">🚧</h1>
            <h2 className="text-2xl font-bold mb-2">¡Invitación en Proceso!</h2>
            <p className="text-slate-400 max-w-md">Esta invitación ha sido creada pero aún no está activa.</p>
            <p className="text-xs text-slate-600 mt-8">Si eres el dueño, contacta a soporte.</p>
        </div>
    );

    // Invitación Real
    return data ? <LiveInvitation data={data} /> : null;
}