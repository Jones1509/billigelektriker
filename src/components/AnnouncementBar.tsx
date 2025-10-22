import { Zap, Phone, Clock, MapPin, Facebook, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AnnouncementBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden lg:block bg-gradient-to-r from-[#0A1628] via-[#0d1d35] to-[#0A1628] border-b border-white/10 shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-14 text-sm">
          {/* Left side - Multiple info items */}
          <div className="flex items-center gap-8">
            {/* Free shipping */}
            <div className="flex items-center gap-2.5 text-white group">
              <Zap className="h-4.5 w-4.5 text-secondary group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Gratis fragt over 750 kr.</span>
            </div>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            {/* Response time */}
            <div className="flex items-center gap-2.5 text-white/90 group">
              <Clock className="h-4.5 w-4.5 text-secondary/80 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs">Hurtig respons 24/7</span>
            </div>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            {/* Location */}
            <div className="flex items-center gap-2.5 text-white/90 group">
              <MapPin className="h-4.5 w-4.5 text-secondary/80 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs">København</span>
            </div>
          </div>
          
          {/* Right side - Contact and social media */}
          <div className="flex items-center gap-6">
            {/* Phone */}
            <a 
              href="tel:+4512345678"
              className="flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300 ease-in-out group relative"
            >
              <Phone className="h-4 w-4 animate-pulse group-hover:scale-105 transition-all duration-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
              <span className="text-xs font-medium group-hover:scale-105 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">+45 12 34 56 78</span>
            </a>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            {/* Email */}
            <a 
              href="mailto:info@billigelektriker.dk"
              className="flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300 group relative"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-medium relative group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                info@billigelektriker.dk
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"></span>
              </span>
            </a>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            {/* Quick links */}
            <div className="flex items-center gap-5">
              <Link 
                to="/om-os" 
                className="text-xs text-white/80 hover:text-[#60A5FA] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium group flex items-center gap-1"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Om os</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
              <Link 
                to="/kontakt" 
                className="text-xs text-white/80 hover:text-[#60A5FA] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium group flex items-center gap-1"
              >
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Kontakt</span>
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </div>
            
            <div className="h-4 w-px bg-white/20"></div>
            
            {/* Social media */}
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-500 ease-in-out group relative"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-[#60A5FA] rounded-full scale-0 opacity-0 group-hover:scale-150 group-hover:opacity-20 transition-all duration-300 ease-out"></div>
                <Facebook className="h-4.5 w-4.5 relative group-hover:rotate-[360deg] group-hover:scale-115 transition-all duration-500 ease-in-out" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-500 ease-in-out group relative"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-[#60A5FA] rounded-full scale-0 opacity-0 group-hover:scale-150 group-hover:opacity-20 transition-all duration-300 ease-out"></div>
                <Instagram className="h-4.5 w-4.5 relative group-hover:rotate-[360deg] group-hover:scale-115 transition-all duration-500 ease-in-out" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-500 ease-in-out group relative"
                aria-label="YouTube"
              >
                <div className="absolute inset-0 bg-[#60A5FA] rounded-full scale-0 opacity-0 group-hover:scale-150 group-hover:opacity-20 transition-all duration-300 ease-out"></div>
                <Youtube className="h-4.5 w-4.5 relative group-hover:rotate-[360deg] group-hover:scale-115 transition-all duration-500 ease-in-out" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
