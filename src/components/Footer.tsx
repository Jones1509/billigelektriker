import { Button } from "@/components/ui/button";
import { Zap, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();


  return (
    <footer className="relative overflow-hidden bg-slate-50">

      {/* Main Footer Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 mb-8 max-w-[1400px] mx-auto">
          
          {/* Section 1: About + Logo */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg shadow-primary/20">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-xl">Billig Elektriker</h3>
                <p className="text-slate-600 text-xs">ASA ApS</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-1 text-[13px] leading-relaxed font-medium">
              Professionel el-service til fair priser
            </p>
            <p className="text-slate-600 mb-3 text-[13px] leading-[1.5]">
              Certificerede elektrikere med passion for kvalitet og kundetilfredshed
            </p>
            
            <p className="text-slate-500 text-[13px] mb-3">CVR: 12345678</p>
            
            <Button className="bg-primary hover:bg-primary/90 text-white mb-3 shadow-md w-full sm:w-auto min-h-[44px]">
              <Phone className="h-4 w-4 mr-2" />
              +45 12 34 56 78
            </Button>

            {/* Social Media */}
            <div className="flex gap-2 mt-3">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group w-8 h-8 flex items-center justify-center">
                <Facebook className="h-4 w-4 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group w-8 h-8 flex items-center justify-center">
                <Instagram className="h-4 w-4 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group w-8 h-8 flex items-center justify-center">
                <Linkedin className="h-4 w-4 text-slate-600 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links - 3 Columns */}
          <div className="lg:col-span-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5">
            {/* Column 1: Services */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-3 text-[13px] uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] flex items-center gap-2 py-1 leading-[1.8]">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    El-arbejde
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] flex items-center gap-2 py-1 leading-[1.8]">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Smart Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] flex items-center gap-2 py-1 leading-[1.8]">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Erhverv
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] flex items-center gap-2 py-1 leading-[1.8]">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Udlejning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] flex items-center gap-2 py-1 leading-[1.8]">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Akut hjælp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors text-[13px] font-medium flex items-center py-1">
                    Se alle services →
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Information */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-3 text-[13px] uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Sådan bestiller du
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Hjemmesidens funktion
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Priser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Returnering
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Fragt & levering
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Service */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-3 text-[13px] uppercase tracking-wider">
                Kundeservice
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Handelsbetingelser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Privatlivspolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Cookiepolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Garanti & ansvar
                  </a>
                </li>
                <li>
                  <Link to="/kontakt" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Kontakt os
                  </Link>
                </li>
                <li>
                  <Link to="/om-os" className="text-slate-600 hover:text-primary transition-colors text-[13px] block py-1 leading-[1.8]">
                    Om os
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-semibold mb-3 text-[13px] uppercase tracking-wider">
              Kontakt
            </h4>
            
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 text-[13px] font-medium">Grønnevej 259</p>
                  <p className="text-slate-600 text-[13px]">2830 Virum</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+4512345678" className="text-slate-700 text-[13px] hover:text-primary transition-colors">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@billigelektriker.dk" className="text-slate-700 text-[13px] hover:text-primary transition-colors break-all">
                  info@billigelektriker.dk
                </a>
              </div>
              
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-slate-700 text-[13px]">
                  <p>Man-Fre: 8-17</p>
                  <p>Weekend: Efter aftale</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300 pt-5 pb-5 bg-slate-100/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 -mb-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-xs text-slate-600">
            <p className="text-center text-xs">
              © 2025 Billig Elektriker (ASA ApS) · CVR: 12345678
            </p>
            <span className="hidden md:inline">·</span>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-primary transition-colors text-xs">
                Privatlivspolitik
              </a>
              <a href="#" className="hover:text-primary transition-colors text-xs">
                Handelsbetingelser
              </a>
              <Link to="/kontakt" className="hover:text-primary transition-colors text-xs">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
