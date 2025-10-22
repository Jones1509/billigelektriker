import { Zap, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AnnouncementBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden lg:block bg-[hsl(213,90%,25%)] border-b border-[hsl(213,90%,20%)]">
      <div className="container">
        <div className="flex items-center justify-between h-10 text-sm">
          {/* Left side - Free shipping message */}
          <div className="flex items-center gap-2 text-white">
            <Zap className="h-4 w-4 text-secondary" />
            <span className="font-medium">Gratis fragt ved køb over 750 kr.</span>
          </div>
          
          {/* Right side - Links and social media */}
          <div className="flex items-center gap-6">
            <Link 
              to="/om-os" 
              className="text-white/90 hover:text-white transition-colors"
            >
              Om os
            </Link>
            <Link 
              to="/kontakt" 
              className="text-white/90 hover:text-white transition-colors"
            >
              Kontakt os
            </Link>
            
            <div className="flex items-center gap-3 ml-3 pl-3 border-l border-white/20">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
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
