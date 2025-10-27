import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tak for din tilmelding!");
    setEmail("");
  };

  const paymentMethods = [
    { name: "Dankort", bgColor: "bg-red-600", textColor: "text-white" },
    { name: "Visa", bgColor: "bg-blue-600", textColor: "text-yellow-300" },
    { name: "Mastercard", bgColor: "bg-gradient-to-r from-red-600 to-orange-500", textColor: "text-white" },
    { name: "MobilePay", bgColor: "bg-blue-500", textColor: "text-white" },
    { name: "Apple Pay", bgColor: "bg-black", textColor: "text-white" },
    { name: "Google Pay", bgColor: "bg-white", textColor: "text-blue-600 border border-slate-300" },
    { name: "Klarna", bgColor: "bg-pink-500", textColor: "text-white" },
    { name: "Maestro", bgColor: "bg-blue-700", textColor: "text-red-500" },
    { name: "Amex", bgColor: "bg-blue-700", textColor: "text-white" },
    { name: "Coop", bgColor: "bg-orange-500", textColor: "text-white" },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-50">

      {/* Main Footer Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          
          {/* Section 1: About + Logo */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg shadow-primary/20">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-2xl">Billig Elektriker</h3>
                <p className="text-slate-600 text-sm">ASA ApS</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-2 text-sm leading-relaxed font-medium">
              Professionel el-service til fair priser
            </p>
            <p className="text-slate-600 mb-4 text-sm leading-relaxed">
              Certificerede elektrikere med passion for kvalitet og kundetilfredshed
            </p>
            
            <p className="text-slate-500 text-sm mb-4">CVR: 12345678</p>
            
            <Button className="bg-primary hover:bg-primary/90 text-white mb-6 shadow-md w-full sm:w-auto min-h-[44px]">
              <Phone className="h-4 w-4 mr-2" />
              +45 12 34 56 78
            </Button>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-slate-900 font-semibold mb-3 text-sm">Få tilbud og tips</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Din email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-slate-300 text-slate-900 min-h-[44px]"
                />
                <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 min-h-[44px] whitespace-nowrap">
                  Tilmeld
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="p-3 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Facebook className="h-5 w-5 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="p-3 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Instagram className="h-5 w-5 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="p-3 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Linkedin className="h-5 w-5 text-slate-600 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links - 3 Columns */}
          <div className="lg:col-span-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Column 1: Services */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2 min-h-[44px] py-1">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    El-arbejde
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2 min-h-[44px] py-1">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Smart Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2 min-h-[44px] py-1">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Erhverv
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2 min-h-[44px] py-1">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Udlejning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2 min-h-[44px] py-1">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Akut hjælp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium min-h-[44px] flex items-center">
                    Se alle services →
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Information */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Sådan bestiller du
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Hjemmesidens funktion
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Priser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Returnering
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Fragt & levering
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Service */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider">
                Kundeservice
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Handelsbetingelser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Privatlivspolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Cookiepolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Garanti & ansvar
                  </a>
                </li>
                <li>
                  <Link to="/kontakt" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Kontakt os
                  </Link>
                </li>
                <li>
                  <Link to="/om-os" className="text-slate-600 hover:text-primary transition-colors text-sm block min-h-[44px] py-2">
                    Om os
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider">
              Kontakt
            </h4>
            
            <div className="space-y-3 sm:space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 text-sm font-medium">Grønnevej 259</p>
                  <p className="text-slate-600 text-sm">2830 Virum</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 min-h-[44px]">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+4512345678" className="text-slate-700 text-sm hover:text-primary transition-colors flex items-center">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-3 min-h-[44px]">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@billigelektriker.dk" className="text-slate-700 text-sm hover:text-primary transition-colors break-all flex items-center">
                  info@billigelektriker.dk
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-slate-700 text-sm">
                  <p>Man-Fre: 8-17</p>
                  <p>Weekend: Efter aftale</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Interactive Google Maps */}
        <div className="mb-8 sm:mb-12">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 border-slate-200 hover:-translate-y-1 transition-transform duration-300">
            <iframe
              src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=55.7745,12.4885&zoom=17&maptype=roadmap"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[280px] xs:h-[300px] sm:h-[350px] lg:h-[400px]"
            ></iframe>
          </div>
          <div className="text-center mt-4 space-y-2 px-4">
            <p className="text-slate-600 text-sm sm:text-base flex items-center justify-center gap-2 flex-wrap">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Grønnevej 259, 2830 Virum</span>
            </p>
            <p className="text-slate-500 text-xs sm:text-sm">Vi dækker Lyngby, København og Nordsjælland</p>
            <a 
              href="https://maps.google.com/?q=Grønnevej+259+2830+Virum" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm font-medium inline-block hover:underline"
            >
              Vis i Google Maps →
            </a>
          </div>
        </div>

        {/* Payment Methods - Compact Single Row */}
        <div className="py-4 sm:py-6 mb-4 sm:mb-6 border-t border-slate-200 px-4">
          <p className="text-slate-500 text-center text-xs sm:text-sm mb-3 sm:mb-4">Vi accepterer:</p>
          <div className="flex justify-center items-center gap-2 sm:gap-2 flex-wrap max-w-4xl mx-auto">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className={`px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold ${method.bgColor} ${method.textColor} opacity-70 hover:opacity-100 transition-all cursor-pointer hover:scale-105 min-h-[32px] flex items-center justify-center`}
                title={method.name}
              >
                {method.name}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300 pt-4 sm:pt-6 bg-slate-100/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 -mb-8 pb-6 sm:pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600">
            <p className="text-center md:text-left text-[11px] sm:text-xs">
              © 2025 Billig Elektriker (ASA ApS). Alle rettigheder forbeholdes. CVR: 12345678
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-primary transition-colors text-[11px] sm:text-xs min-h-[44px] flex items-center">
                Privatlivspolitik
              </a>
              <a href="#" className="hover:text-primary transition-colors text-[11px] sm:text-xs min-h-[44px] flex items-center">
                Handelsbetingelser
              </a>
              <Link to="/kontakt" className="hover:text-primary transition-colors text-[11px] sm:text-xs min-h-[44px] flex items-center">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
