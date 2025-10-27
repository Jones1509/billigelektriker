import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import logoFooter from "@/assets/logo-footer.png";

export const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tak for din tilmelding!");
    setEmail("");
  };


  return (
    <footer className="bg-gradient-to-b from-[#F7F9FC] to-[#EEF4FC] relative">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr] gap-12 mb-8">
          
          {/* Kolonne 1: About + Logo */}
          <div>
            <div className="flex items-start gap-3 mb-6">
              <img src={logoFooter} alt="Billig Elektriker Logo" className="h-14 w-14 flex-shrink-0" />
              <div>
                <h3 className="text-[#1F2937] font-bold text-xl leading-tight mb-1">Billig Elektriker</h3>
                <p className="text-[#6B7280] text-sm">ASA ApS</p>
              </div>
            </div>
            
            <p className="text-[#374151] mb-2 text-sm leading-relaxed font-medium">
              Professionel el-service til fair priser
            </p>
            <p className="text-[#6B7280] mb-4 text-sm leading-relaxed">
              Certificerede elektrikere med passion for kvalitet og kundetilfredshed
            </p>
            

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-white to-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-5 shadow-lg shadow-blue-100/50 mb-6 hover:shadow-xl hover:shadow-blue-100/70 transition-all duration-300">
              <h4 className="text-[#1F2937] font-semibold mb-1 text-sm">Få tilbud og tips</h4>
              <p className="text-[#6B7280] text-xs mb-3">Modtag nyheder og eksklusive tilbud</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Din email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-[#E5E7EB] text-[#1F2937] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                />
                <Button type="submit" size="sm" className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white px-6 shadow-md hover:shadow-lg transition-all">
                  Tilmeld
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <a href="#" className="p-2.5 bg-white border border-[#E5E7EB] rounded-lg hover:bg-gradient-to-br hover:from-[#2563EB] hover:to-[#1D4ED8] hover:border-[#2563EB] transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <Facebook className="h-5 w-5 text-[#4B5563] group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2.5 bg-white border border-[#E5E7EB] rounded-lg hover:bg-gradient-to-br hover:from-[#2563EB] hover:to-[#1D4ED8] hover:border-[#2563EB] transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <Instagram className="h-5 w-5 text-[#4B5563] group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="p-2.5 bg-white border border-[#E5E7EB] rounded-lg hover:bg-gradient-to-br hover:from-[#2563EB] hover:to-[#1D4ED8] hover:border-[#2563EB] transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <Youtube className="h-5 w-5 text-[#4B5563] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Kolonne 2: Information */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-sm uppercase tracking-wider">
              Information
            </h4>
            <div className="h-0.5 w-10 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full mb-5 shadow-sm"></div>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Sådan bestiller du</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Hjemmesidens funktion</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Priser</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Returnering</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">FAQ</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Fragt & levering</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Kolonne 3: Kundeservice */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-sm uppercase tracking-wider">
              Kundeservice
            </h4>
            <div className="h-0.5 w-10 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full mb-5 shadow-sm"></div>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Handelsbetingelser</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Privatlivspolitik</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Cookiepolitik</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Garanti & ansvar</span>
                </a>
              </li>
              <li>
                <Link to="/kontakt" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Kontakt os</span>
                </Link>
              </li>
              <li>
                <Link to="/om-os" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all duration-200 text-sm inline-block relative group">
                  <span className="relative">Om os</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolonne 4: Contact + Map */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-sm uppercase tracking-wider">
              Kontakt & Lokation
            </h4>
            <div className="h-0.5 w-10 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full mb-5 shadow-sm"></div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 group">
                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <MapPin className="h-[18px] w-[18px] text-[#2563EB] flex-shrink-0" />
                </div>
                <p className="text-[#4B5563] text-sm mt-1">Lyngby-Taarbæk Kommune</p>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Phone className="h-[18px] w-[18px] text-[#2563EB] flex-shrink-0" />
                </div>
                <a href="tel:+4512345678" className="text-[#4B5563] text-sm hover:text-[#2563EB] transition-colors mt-1 font-medium">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Mail className="h-[18px] w-[18px] text-[#2563EB] flex-shrink-0" />
                </div>
                <a href="mailto:info@billigelektriker.dk" className="text-[#4B5563] text-sm hover:text-[#2563EB] transition-colors mt-1 break-all">
                  info@billigelektriker.dk
                </a>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Clock className="h-[18px] w-[18px] text-[#2563EB] flex-shrink-0" />
                </div>
                <div className="text-[#4B5563] text-sm mt-1">
                  <p className="font-medium">Man-Fre: 8-17</p>
                  <p>Weekend: Efter aftale</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#E5E7EB] hover:shadow-xl transition-shadow duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36064.37728910234!2d12.481379!3d55.770249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46524fe90aa1f3fd%3A0x9d24919290c1c4f0!2sLyngby-Taarb%C3%A6k%20Kommune!5e0!3m2!1sen!2sdk!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a 
              href="https://maps.google.com/?q=Lyngby-Taarbæk+Kommune" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#2563EB] text-sm mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all duration-200 font-medium hover:underline"
            >
              Vis i Google Maps →
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-gradient-to-r from-[#E5E7EB] via-[#E8EAED] to-[#E5E7EB] border-t border-[#D1D5DB]">
        <div className="max-w-[1200px] mx-auto px-10 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6B7280]">
            <p className="font-medium">
              © 2025 Billig Elektriker (ASA ApS) · CVR: 12345678
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-[#2563EB] transition-colors duration-200">
                Privatlivspolitik
              </a>
              <span className="text-[#D1D5DB]">|</span>
              <a href="#" className="hover:text-[#2563EB] transition-colors duration-200">
                Handelsbetingelser
              </a>
              <span className="text-[#D1D5DB]">|</span>
              <a href="#" className="hover:text-[#2563EB] transition-colors duration-200">
                Cookiepolitik
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
