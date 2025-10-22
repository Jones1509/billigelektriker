import { Zap, Phone, Clock, MapPin, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AnnouncementBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden lg:block bg-gradient-to-r from-[hsl(213,90%,22%)] via-[hsl(213,90%,25%)] to-[hsl(213,90%,22%)] border-b border-white/10">
      <div className="container">
        <div className="flex items-center justify-between h-11 text-sm">
          {/* Left side - Multiple info items */}
          <div className="flex items-center gap-6">
            {/* Free shipping */}
            <div className="flex items-center gap-2 text-white group">
              <Zap className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
              <span className="font-medium">Gratis fragt over 750 kr.</span>
            </div>
            
            {/* Response time */}
            <div className="flex items-center gap-2 text-white/90 group">
              <Clock className="h-4 w-4 text-secondary/80 group-hover:scale-110 transition-transform" />
              <span className="text-xs">Hurtig respons 24/7</span>
            </div>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-white/90 group">
              <MapPin className="h-4 w-4 text-secondary/80 group-hover:scale-110 transition-transform" />
              <span className="text-xs">København</span>
            </div>
          </div>
          
          {/* Right side - Contact and social media */}
          <div className="flex items-center gap-5">
            {/* Phone */}
            <a 
              href="tel:+4512345678"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-200 group"
            >
              <Phone className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-medium">+45 12 34 56 78</span>
            </a>
            
            {/* Email */}
            <a 
              href="mailto:info@billigelektriker.dk"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-all duration-200 group"
            >
              <Mail className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">info@billigelektriker.dk</span>
            </a>
            
            {/* Quick links */}
            <div className="flex items-center gap-4 ml-2 pl-4 border-l border-white/20">
              <Link 
                to="/om-os" 
                className="text-xs text-white/80 hover:text-white transition-colors font-medium hover:underline underline-offset-2"
              >
                Om os
              </Link>
              <Link 
                to="/kontakt" 
                className="text-xs text-white/80 hover:text-white transition-colors font-medium hover:underline underline-offset-2"
              >
                Kontakt
              </Link>
            </div>
            
            {/* Social media */}
            <div className="flex items-center gap-2.5 ml-2 pl-4 border-l border-white/20">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
