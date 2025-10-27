import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-footer.png";

export const Footer = () => {
  const { t } = useTranslation();


  return (
    <footer className="relative overflow-hidden bg-[#F5F5F5]">
      {/* Main Footer Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 max-w-[1400px] mx-auto">
          
          {/* Left Section: Company Info + Social Media */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-xl shadow-md">
                <img src={logoIcon} alt="Billig Elektriker Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg">Billig Elektriker</h3>
              </div>
            </div>
            
            <p className="text-slate-700 mb-3 text-sm leading-relaxed">
              Professionel el-service til fair priser
            </p>
            
            <p className="text-slate-500 text-xs mb-4">CVR: 12345678</p>
            
            <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white mb-4 shadow-lg w-full min-h-[44px]">
              <Phone className="h-4 w-4 mr-2" />
              +45 12 34 56 78
            </Button>

            <div className="mb-4">
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Man-Fre: 8-17</p>
                  <p className="text-slate-600 text-xs">Weekend: Efter aftale</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-2">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-all duration-300 group w-9 h-9 flex items-center justify-center">
                <Facebook className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-all duration-300 group w-9 h-9 flex items-center justify-center">
                <Instagram className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-all duration-300 group w-9 h-9 flex items-center justify-center">
                <Linkedin className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Middle Section: Two Link Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            {/* Column 1: Services */}
            <div>
              <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    El-arbejde
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    Smart Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    Erhverv
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    Udlejning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    Akut hjælp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80 transition-all duration-200 text-sm font-semibold flex items-center py-1 hover:translate-x-1">
                    Se alle services →
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Information */}
            <div>
              <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    Sådan bestiller du
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    Hjemmesidens funktion
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    Priser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 text-sm block py-1">
                    Garanti & ansvar
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section: Contact + Google Maps */}
          <div className="lg:col-span-4">
            <h4 className="text-slate-900 font-bold mb-4 text-sm uppercase tracking-wider">
              Kontakt
            </h4>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 text-sm font-semibold">Grønnevej 259</p>
                  <p className="text-slate-600 text-sm">2830 Virum</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <a href="tel:+4512345678" className="text-slate-700 text-sm font-medium hover:text-primary transition-colors">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <a href="mailto:info@billigelektriker.dk" className="text-slate-700 text-sm font-medium hover:text-primary transition-colors break-all">
                  info@billigelektriker.dk
                </a>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden shadow-lg">
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
        <div className="border-t border-slate-300 pt-6 bg-slate-200/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 -mb-12 pb-6">
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
              <a href="#" className="hover:text-primary transition-all duration-200 text-xs font-medium hover:underline underline-offset-4">
                Cookiepolitik
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
