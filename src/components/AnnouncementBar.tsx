import { Zap, Phone, Clock, MapPin, Facebook, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AnnouncementBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden lg:block bg-gradient-to-r from-[#0A1628] via-[#0d1d35] to-[#0A1628] border-b border-white/10 shadow-lg overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between h-14 text-sm">
          {/* Left side - Multiple info items */}
          <div className="flex items-center gap-4 xl:gap-8">
            {/* Free shipping */}
            <div className="flex items-center gap-2 xl:gap-2.5 text-white group whitespace-nowrap">
              <Zap className="h-4 xl:h-4.5 w-4 xl:w-4.5 text-secondary group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="font-medium text-xs xl:text-sm">{t('announcements.freeShipping')}</span>
            </div>
            
            <div className="h-4 w-px bg-white/20 hidden xl:block"></div>
            
            {/* Response time - skjul på mindre skærme */}
            <div className="hidden xl:flex items-center gap-2.5 text-white/90 group whitespace-nowrap">
              <Clock className="h-4.5 w-4.5 text-secondary/80 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="text-xs">{t('announcements.quickResponse')}</span>
            </div>
            
            <div className="h-4 w-px bg-white/20 hidden xl:block"></div>
            
            {/* Location - skjul på mindre skærme */}
            <div className="hidden xl:flex items-center gap-2.5 text-white/90 group whitespace-nowrap">
              <MapPin className="h-4.5 w-4.5 text-secondary/80 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="text-xs">{t('announcements.location')}</span>
            </div>
          </div>
          
          {/* Right side - Contact and social media */}
          <div className="flex items-center gap-3 xl:gap-6">
            {/* Phone */}
            <a 
              href="tel:+4512345678"
              className="flex items-center gap-2 xl:gap-2.5 text-white/90 hover:text-white transition-all duration-300 ease-in-out group relative whitespace-nowrap"
            >
              <Phone className="h-3.5 xl:h-4 w-3.5 xl:w-4 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.8)] flex-shrink-0" />
              <span className="text-xs font-medium group-hover:scale-105 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">+45 12 34 56 78</span>
            </a>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            {/* Email - kortere på mindre skærme */}
            <a 
              href="mailto:info@billigelektriker.dk"
              className="flex items-center gap-2 xl:gap-2.5 text-white/90 hover:text-white transition-all duration-300 group relative"
            >
              <Mail className="h-3.5 xl:h-4 w-3.5 xl:w-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
              <span className="text-xs font-medium relative group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap">
                <span className="hidden xl:inline">info@billigelektriker.dk</span>
                <span className="xl:hidden">info@billigelektriker.dk</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"></span>
              </span>
            </a>
            
            <div className="h-4 w-px bg-white/20 hidden xl:block"></div>
            
            {/* Quick links - skjul på mindre skærme */}
            <div className="hidden xl:flex items-center gap-5">
              <Link 
                to="/om-os" 
                className="text-xs text-white/80 hover:text-[#60A5FA] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium group flex items-center gap-1 whitespace-nowrap"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">{t('announcements.aboutUs')}</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
              <Link 
                to="/kontakt" 
                className="text-xs text-white/80 hover:text-[#60A5FA] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium group flex items-center gap-1 whitespace-nowrap"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">{t('announcements.contact')}</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </div>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            {/* Social media */}
            <div className="flex items-center gap-2 xl:gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 group relative overflow-hidden p-1"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-[#60A5FA] rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-10 transition-all duration-300"></div>
                <Facebook className="h-4 xl:h-4.5 w-4 xl:w-4.5 relative group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 group relative overflow-hidden p-1"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-[#60A5FA] rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-10 transition-all duration-300"></div>
                <Instagram className="h-4 xl:h-4.5 w-4 xl:w-4.5 relative group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 group relative overflow-hidden p-1"
                aria-label="YouTube"
              >
                <div className="absolute inset-0 bg-[#60A5FA] rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-10 transition-all duration-300"></div>
                <Youtube className="h-4 xl:h-4.5 w-4 xl:w-4.5 relative group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
