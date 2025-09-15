import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <a href="/" className="inline-block">
              <Image
                src="/logo-text-color.png"
                alt="Logo de PrimeTech Solutions"
                width={150}
                height={40}
                className="dark:hidden"
              />
              <Image
                src="/logo-text-white.png"
                alt="Logo de PrimeTech Solutions"
                width={150}
                height={40}
                className="hidden dark:block"
              />
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Soluciones integrales 360 para potenciar tu presencia digital y tecnológica.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navegación</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/servicios" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Servicios</a></li>
              <li><a href="/diseno-grafico" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Diseño Gráfico</a></li>
              <li><a href="/cursos" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Cursos</a></li>
              <li><a href="/portafolio" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Portafolio</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/aviso-de-privacidad" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Aviso de Privacidad</a></li>
              <li><a href="/terminos-y-condiciones" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Contacto</h3>
             <div className="mt-4 flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <Phone size={16} />
                <a href="https://wa.me/523334862414" target="_blank" rel="noopener noreferrer" className="text-base hover:text-gray-900 dark:hover:text-white">33 3486 2414</a>
             </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="https://www.facebook.com/PrimeTechSolutions01/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/demian_mh/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/demian-mora-hernandez-a2b07027a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-8 md:mt-0 md:order-1 text-base text-gray-400">&copy; 2025 PrimeTech Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;