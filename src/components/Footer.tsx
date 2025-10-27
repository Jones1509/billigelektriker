import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-footer.png";

export const Footer = () => {
  const { t } = useTranslation();


  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100">

      {/* Main Footer Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 max-w-[1200px] mx-auto items-start">
          
          {/* Section 1: About + Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="transition-all duration-300 hover:scale-105">
                <img src={logoIcon} alt="Billig Elektriker Logo" className="h-12 w-12 object-contain" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-xl tracking-tight">Billig Elektriker</h3>
                <p className="text-slate-500 text-xs font-medium">ASA ApS</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-2 text-sm leading-[1.5] font-medium">
              Professionel el-service til fair priser
            </p>
            <p className="text-slate-600 mb-3 text-sm leading-[1.5]">
              Certificerede elektrikere med passion for kvalitet og kundetilfredshed
            </p>
            
            <p className="text-slate-500 text-xs mb-5 font-medium leading-[1.5]">CVR: 12345678</p>
            
            {/* Newsletter Form */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 rounded-xl mb-5 shadow-sm">
              <h4 className="text-slate-900 font-bold mb-1.5 text-lg leading-[1.5]">Få vores nyheder</h4>
              <p className="text-slate-500 text-[13px] mb-3 leading-[1.5]">Modtag tips og tilbud</p>
              
              <div className="flex gap-0 items-center">
                <Input 
                  type="email" 
                  placeholder="Din email adresse" 
                  className="flex-1 h-[50px] rounded-r-none border-r-0 border-2 border-slate-200 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] px-[18px] transition-all duration-300"
                />
                <Button className="h-[50px] px-8 flex-shrink-0 rounded-l-none bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-semibold text-[15px] transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] border-0">
                  Tilmeld
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-2.5 mt-5">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 hover:shadow-lg group w-9 h-9 flex items-center justify-center">
                <Facebook className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 hover:shadow-lg group w-9 h-9 flex items-center justify-center">
                <Instagram className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 hover:shadow-lg group w-9 h-9 flex items-center justify-center">
                <Linkedin className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links - 2 Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-8">
            {/* Column 1: Information */}
            <div>
              <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Sådan bestiller du
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Hjemmesidens funktion
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Priser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Returnering
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Fragt & levering
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Customer Service */}
            <div>
              <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">
                Kundeservice
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Handelsbetingelser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Privatlivspolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Cookiepolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Garanti & ansvar
                  </a>
                </li>
                <li>
                  <Link to="/kontakt" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Kontakt os
                  </Link>
                </li>
                <li>
                  <Link to="/om-os" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1 leading-relaxed">
                    Om os
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">
              Kontakt
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed">Grønnevej 259</p>
                  <p className="text-slate-600 text-sm leading-relaxed">2830 Virum</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+4512345678" className="text-slate-600 text-sm hover:text-primary transition-all duration-200 hover:translate-x-1 leading-relaxed">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@billigelektriker.dk" className="text-slate-600 text-sm hover:text-primary transition-all duration-200 hover:translate-x-1 leading-relaxed break-all">
                  info@billigelektriker.dk
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm leading-relaxed">
                  <p className="text-slate-700 font-semibold">Man-Fre: 8-17</p>
                  <p className="text-slate-600">Weekend: Efter aftale</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/80 pt-6 pb-6 bg-white/30 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 -mb-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-slate-600">
            <p className="text-center text-xs font-medium">
              © 2025 Billig Elektriker (ASA ApS) · CVR: 12345678
            </p>
            <span className="hidden md:inline text-slate-400">·</span>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="#" className="hover:text-primary transition-all duration-200 text-xs font-medium hover:underline underline-offset-4">
                Privatlivspolitik
              </a>
              <a href="#" className="hover:text-primary transition-all duration-200 text-xs font-medium hover:underline underline-offset-4">
                Handelsbetingelser
              </a>
              <Link to="/kontakt" className="hover:text-primary transition-all duration-200 text-xs font-medium hover:underline underline-offset-4">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
