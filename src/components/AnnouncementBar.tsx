import { Zap, Phone, Clock, MapPin, Facebook, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AnnouncementBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden md:block bg-gradient-to-r from-[#0A1628] via-[#0d1d35] to-[#0A1628] border-b border-white/10 shadow-lg overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between h-12 md:h-14 text-sm px-2 md:px-0">
          {/* Left side - Gratis fragt */}
          <div className="flex items-center gap-2 text-white group whitespace-nowrap">
            <Zap className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
            <span className="font-medium text-xs md:text-sm">{t('announcements.freeShipping')}</span>
          </div>
          
          {/* Right side - Kontakt info */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Phone */}
            <a 
              href="tel:+4512345678"
              className="flex items-center gap-1.5 md:gap-2 text-white/90 hover:text-white transition-all duration-300 ease-in-out group relative whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 group-hover:scale-105 transition-all duration-300 flex-shrink-0" />
              <span className="text-xs font-medium">+45 12 34 56 78</span>
            </a>
            
            <div className="h-4 w-px bg-white/20 hidden lg:block"></div>
            
            {/* Email - kun på større skærme */}
            <a 
              href="mailto:info@billigelektriker.dk"
              className="hidden lg:flex items-center gap-2 text-white/90 hover:text-white transition-all duration-300 group relative"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="text-xs font-medium whitespace-nowrap">info@billigelektriker.dk</span>
            </a>
            
            <div className="h-4 w-px bg-white/20 hidden lg:block"></div>
            
            {/* Social media - kun på større skærme */}
            <div className="hidden lg:flex items-center gap-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 group relative overflow-hidden p-1"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 relative group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 group relative overflow-hidden p-1"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 relative group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 group relative overflow-hidden p-1"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 relative group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
