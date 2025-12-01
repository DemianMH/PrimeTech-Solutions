// src/lib/invitationData.ts

export type EventType = 
  | 'boda' | 'cumpleanos' | 'infantil' | 'bautizo' | 'comunion' 
  | 'confirmacion' | 'posada' | 'halloween' | 'fiesta' | 'baby_shower' | 'despedida' | 'otro';

export type FontStyle = 'modern' | 'elegant' | 'handwritten' | 'classic' | 'playful' | 'spooky' | 'tech';

// NUEVO: Definición de Itinerario
export interface ItineraryItem {
  id: string;
  time: string;
  icon: 'church' | 'rings' | 'cheers' | 'dinner' | 'party' | 'cake' | 'photo' | 'bus';
  description: string;
}

export interface InvitationData {
  id?: string;
  type: EventType;
  themeColor: string; 
  font: FontStyle;    
  musicUrl: string;
  coverImage: string;
  gallery: string[];
  hosts: string[];
  eventDate: string;
  location: { name: string; address: string; mapUrl: string; };
  reception?: { name: string; address: string; mapUrl: string; };
  giftRegistry?: { type: 'mesa' | 'sobres' | 'amazon' | 'none'; bankInfo?: string; url?: string; phrase?: string; };
  dressCode?: { type: 'formal' | 'casual' | 'etiqueta' | 'disfraz' | 'tematico'; label: string; };
  padrinos?: string[];
  whatsappNumber: string;
  age?: number;
  
  // NUEVO: Campo de itinerario
  itinerary?: ItineraryItem[];

  // Campos de sistema
  slug?: string;
  clientName?: string;
  clientPhone?: string;
  isActive?: boolean;
  createdAt?: number;
}

export const eventConfig: Record<EventType, {
  icon: string;
  labels: { host: string; location: string; reception: string; action: string; };
  sections: { 
    hasReception: boolean; 
    hasPadrinos: boolean; 
    hasAge: boolean;      
    giftLabel: string;    
  };
  defaultFont: FontStyle;
  defaultColor: string;
}> = {
  boda: {
    icon: "💍",
    labels: { host: "Nuestra Boda", location: "Ceremonia Religiosa", reception: "Recepción", action: "Confirmar Asistencia" },
    sections: { hasReception: true, hasPadrinos: true, hasAge: false, giftLabel: "Mesa de Regalos" },
    defaultFont: "elegant", defaultColor: "gold"
  },
  cumpleanos: {
    icon: "🎉",
    labels: { host: "¡Festejo mi Cumple!", location: "Lugar de la Fiesta", reception: "After Party", action: "¡Ahí nos vemos!" },
    sections: { hasReception: false, hasPadrinos: false, hasAge: true, giftLabel: "Regalos" },
    defaultFont: "modern", defaultColor: "purple"
  },
  infantil: {
    icon: "🎈",
    labels: { host: "¡Mi Cumpleaños!", location: "Salón de Fiestas", reception: "", action: "¡Vamos a jugar!" },
    sections: { hasReception: false, hasPadrinos: false, hasAge: true, giftLabel: "Mis Regalos" },
    defaultFont: "playful", defaultColor: "blue"
  },
  bautizo: {
    icon: "🕊️",
    labels: { host: "Mi Bautizo", location: "Parroquia", reception: "Celebración", action: "Acompañanos" },
    sections: { hasReception: true, hasPadrinos: true, hasAge: false, giftLabel: "Obsequios" },
    defaultFont: "classic", defaultColor: "sky"
  },
  fiesta: {
    icon: "🥂",
    labels: { host: "Party Time", location: "Location", reception: "", action: "Confirmar" },
    sections: { hasReception: false, hasPadrinos: false, hasAge: false, giftLabel: "Cover / Regalos" },
    defaultFont: "modern", defaultColor: "rose"
  },
  halloween: {
    icon: "🎃",
    labels: { host: "Fiesta de Terror", location: "Casa Embrujada", reception: "", action: "Entrar si te atreves" },
    sections: { hasReception: false, hasPadrinos: false, hasAge: false, giftLabel: "Ofrendas" },
    defaultFont: "spooky", defaultColor: "orange"
  },
  baby_shower: {
    icon: "🍼",
    labels: { host: "Baby Shower", location: "Lugar", reception: "", action: "Confirmar" },
    sections: { hasReception: false, hasPadrinos: false, hasAge: false, giftLabel: "Mesa de Regalos" },
    defaultFont: "handwritten", defaultColor: "yellow"
  },
  despedida: {
    icon: "💃",
    labels: { host: "Despedida de Soltera", location: "Meeting Point", reception: "", action: "Let's Party" },
    sections: { hasReception: true, hasPadrinos: false, hasAge: false, giftLabel: "Sobres" },
    defaultFont: "modern", defaultColor: "rose"
  },
  comunion: {
    icon: "✝️", labels: { host: "Primera Comunión", location: "Iglesia", reception: "Festejo", action: "Confirmar" },
    sections: { hasReception: true, hasPadrinos: true, hasAge: false, giftLabel: "Regalos" }, defaultFont: "classic", defaultColor: "yellow"
  },
  confirmacion: {
    icon: "🔥", labels: { host: "Confirmación", location: "Iglesia", reception: "Comida", action: "Confirmar" },
    sections: { hasReception: true, hasPadrinos: true, hasAge: false, giftLabel: "Regalos" }, defaultFont: "classic", defaultColor: "red"
  },
  posada: {
    icon: "🎄", labels: { host: "Posada Navideña", location: "Lugar", reception: "", action: "Confirmar" },
    sections: { hasReception: false, hasPadrinos: false, hasAge: false, giftLabel: "Intercambio" }, defaultFont: "handwritten", defaultColor: "green"
  },
  otro: { 
    icon: "📅", 
    labels: { host: "Evento", location: "Ubicación", reception: "Recepción", action: "Asistir" },
    sections: { hasReception: true, hasPadrinos: false, hasAge: false, giftLabel: "Detalles" }, 
    defaultFont: "modern", defaultColor: "gray" 
  },
};

export const eventPresets = eventConfig;