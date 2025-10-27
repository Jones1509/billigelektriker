import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-footer.png";

export const Footer = () => {
  const { t } = useTranslation();


  return (
    <footer className="relative overflow-hidden bg-white">
      {/* Main Footer Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8 max-w-[1400px] mx-auto">
          
          {/* Column 1 (Left): Company Info + Social Media */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2">
                <img src={logoIcon} alt="Billig Elektriker Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg">Billig Elektriker</h3>
                <p className="text-slate-500 text-xs">ASA ApS</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-2 text-sm leading-relaxed font-semibold">
              Professionel el-service til fair priser
            </p>
            
            <p className="text-slate-600 mb-3 text-sm leading-relaxed">
              Certificerede elektrikere med passion for kvalitet og kundetilfredshed
            </p>
            
            <p className="text-slate-500 text-xs mb-4">CVR: 12345678</p>
            
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white mb-4 shadow-lg w-full min-h-[44px]">
              <Phone className="h-4 w-4 mr-2" />
              +45 12 34 56 78
            </Button>

            {/* Social Media */}
            <div className="flex gap-2">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group w-9 h-9 flex items-center justify-center">
                <Facebook className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group w-9 h-9 flex items-center justify-center">
                <Instagram className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group w-9 h-9 flex items-center justify-center">
                <Linkedin className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 2 (Middle): Quick Access Links */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">
              Hurtig adgang
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                  Sådan bestiller du
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                  Hjemmesidens funktion
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                  Priser
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-all duration-200 text-sm font-semibold block py-1 hover:translate-x-1">
                  Se alle services →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 (Right): Contact + Google Maps */}
          <div className="lg:col-span-5">
            <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">
              Kontakt & Lokation
            </h4>
            
            <div className="space-y-2.5 mb-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 text-sm font-medium">Grønnevej 259, 2830 Virum</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <a href="tel:+4512345678" className="text-slate-700 text-sm font-medium hover:text-blue-600 transition-colors">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@billigelektriker.dk" className="text-slate-700 text-sm font-medium hover:text-blue-600 transition-colors break-all">
                  info@billigelektriker.dk
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-slate-700 text-sm">
                  <p className="font-medium">Man-Fre: 8-17, Weekend: Efter aftale</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.8907877193676!2d12.448826776940447!3d55.78947867314778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46525259f9c2f6f1%3A0x9c4c5e5b0f0e0e0e!2sGr%C3%B8nnevej%20259%2C%202830%20Virum!5e0!3m2!1sen!2sdk!4v1234567890123!5m2!1sen!2sdk"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Billig Elektriker Location"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="border-t border-slate-200 pt-6 bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 -mb-12 pb-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-slate-600 text-xs">
            <p className="text-center font-medium">
              © 2025 Billig Elektriker (ASA ApS) · CVR: 12345678
            </p>
            <span className="hidden md:inline text-slate-400">·</span>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#" className="hover:text-blue-600 transition-all duration-200 font-medium hover:underline underline-offset-4">
                Privatlivspolitik
              </a>
              <span className="text-slate-400">|</span>
              <a href="#" className="hover:text-blue-600 transition-all duration-200 font-medium hover:underline underline-offset-4">
                Handelsbetingelser
              </a>
              <span className="text-slate-400">|</span>
              <a href="#" className="hover:text-blue-600 transition-all duration-200 font-medium hover:underline underline-offset-4">
                Cookiepolitik
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
