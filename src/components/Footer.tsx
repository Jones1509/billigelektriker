import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
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


  return (
    <footer className="bg-[#F7F9FC]">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr] gap-12 mb-12">
          
          {/* Kolonne 1: About + Logo */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-[#2563EB] to-blue-600 rounded-xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-[#1F2937] font-bold text-2xl">Billig Elektriker</h3>
                <p className="text-[#6B7280] text-sm">ASA ApS</p>
              </div>
            </div>
            
            <p className="text-[#4B5563] mb-2 text-sm leading-relaxed">
              Professionel el-service til fair priser
            </p>
            <p className="text-[#6B7280] mb-4 text-sm leading-relaxed">
              Certificerede elektrikere med passion for kvalitet og kundetilfredshed
            </p>
            

            {/* Newsletter */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm mb-6">
              <h4 className="text-[#1F2937] font-semibold mb-1 text-sm">Få tilbud og tips</h4>
              <p className="text-[#6B7280] text-xs mb-3">Modtag nyheder og eksklusive tilbud</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Din email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#F9FAFB] border-[#E5E7EB] text-[#1F2937] placeholder:text-[#9CA3AF]"
                />
                <Button type="submit" size="sm" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6">
                  Tilmeld
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#2563EB] hover:border-[#2563EB] transition-all group">
                <Facebook className="h-5 w-5 text-[#4B5563] group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#2563EB] hover:border-[#2563EB] transition-all group">
                <Instagram className="h-5 w-5 text-[#4B5563] group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#2563EB] hover:border-[#2563EB] transition-all group">
                <Youtube className="h-5 w-5 text-[#4B5563] group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Kolonne 2: Information */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-sm uppercase tracking-wider">
              Information
            </h4>
            <div className="h-0.5 w-10 bg-[#2563EB] mb-5"></div>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Sådan bestiller du
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Hjemmesidens funktion
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Priser
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Returnering
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Fragt & levering
                </a>
              </li>
            </ul>
          </div>

          {/* Kolonne 3: Kundeservice */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-sm uppercase tracking-wider">
              Kundeservice
            </h4>
            <div className="h-0.5 w-10 bg-[#2563EB] mb-5"></div>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Handelsbetingelser
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Privatlivspolitik
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Cookiepolitik
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Garanti & ansvar
                </a>
              </li>
              <li>
                <Link to="/kontakt" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Kontakt os
                </Link>
              </li>
              <li>
                <Link to="/om-os" className="text-[#6B7280] hover:text-[#2563EB] hover:translate-x-1 transition-all text-sm inline-block">
                  Om os
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolonne 4: Contact + Map */}
          <div>
            <h4 className="text-[#1F2937] font-bold mb-2 text-sm uppercase tracking-wider">
              Kontakt & Lokation
            </h4>
            <div className="h-0.5 w-10 bg-[#2563EB] mb-5"></div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-[18px] w-[18px] text-[#2563EB] mt-0.5 flex-shrink-0" />
                <p className="text-[#4B5563] text-sm">Lyngby-Taarbæk Kommune</p>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-[18px] w-[18px] text-[#2563EB] mt-0.5 flex-shrink-0" />
                <a href="tel:+4512345678" className="text-[#4B5563] text-sm hover:text-[#2563EB] transition-colors">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-[18px] w-[18px] text-[#2563EB] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@billigelektriker.dk" className="text-[#4B5563] text-sm hover:text-[#2563EB] transition-colors">
                  info@billigelektriker.dk
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-[18px] w-[18px] text-[#2563EB] mt-0.5 flex-shrink-0" />
                <div className="text-[#4B5563] text-sm">
                  <p>Man-Fre: 8-17</p>
                  <p>Weekend: Efter aftale</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden shadow-md border border-[#E5E7EB]">
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
              className="text-[#2563EB] text-sm mt-2 inline-block hover:underline"
            >
              Vis i Google Maps →
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-[#E5E7EB] border-t border-[#D1D5DB]">
        <div className="max-w-[1200px] mx-auto px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6B7280]">
            <p>
              © 2025 Billig Elektriker (ASA ApS) · CVR: 12345678
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-[#2563EB] transition-colors">
                Privatlivspolitik
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#2563EB] transition-colors">
                Handelsbetingelser
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#2563EB] transition-colors">
                Cookiepolitik
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
