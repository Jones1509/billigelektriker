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
            <div className="relative overflow-hidden bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group mb-4">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2563EB]/10 to-transparent rounded-full -mr-10 -mt-10"></div>
              <h4 className="text-[#1F2937] font-bold mb-0.5 text-sm relative">✨ Få tilbud og tips</h4>
              <p className="text-[#6B7280] text-xs mb-2.5 relative">Eksklusive tilbud direkte til din indbakke</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5 relative">
                <Input
                  type="email"
                  placeholder="din@email.dk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-9 bg-[#F9FAFB] border-[#E5E7EB] text-[#1F2937] placeholder:text-[#9CA3AF] text-sm focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
                />
                <Button type="submit" size="sm" className="h-9 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white px-5 shadow-sm hover:shadow-md transition-all text-sm font-medium">
                  Tilmeld
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-[#6B7280] text-xs mb-2 font-medium">Følg os</p>
              <div className="flex gap-2">
                <a href="#" className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2] to-[#0C63D4] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                  <div className="relative p-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
                    <Facebook className="h-4 w-4 text-[#4B5563] group-hover:text-white transition-colors" />
                  </div>
                </a>
                <a href="#" className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E4405F] via-[#F77737] to-[#FCAF45] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                  <div className="relative p-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-gradient-to-br hover:from-[#E4405F] hover:to-[#FCAF45] hover:border-transparent transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
                    <Instagram className="h-4 w-4 text-[#4B5563] group-hover:text-white transition-colors" />
                  </div>
                </a>
                <a href="#" className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000] to-[#CC0000] rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                  <div className="relative p-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300 hover:scale-110 hover:-translate-y-0.5">
                    <Youtube className="h-4 w-4 text-[#4B5563] group-hover:text-white transition-colors" />
                  </div>
                </a>
              </div>
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
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#2563EB] rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#E5E7EB] group-hover:border-transparent shadow-md group-hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36064.37728910234!2d12.481379!3d55.770249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46524fe90aa1f3fd%3A0x9d24919290c1c4f0!2sLyngby-Taarb%C3%A6k%20Kommune!5e0!3m2!1sen!2sdk!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative z-0"
                ></iframe>
              </div>
            </div>
            <a 
              href="https://maps.google.com/?q=Lyngby-Taarbæk+Kommune" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mt-3 text-[#2563EB] text-sm font-medium hover:text-[#1D4ED8] transition-all duration-300"
            >
              <span className="relative">
                Åbn i Google Maps
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] group-hover:w-full transition-all duration-300"></span>
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-gradient-to-r from-[#E5E7EB] via-[#E8EAED] to-[#E5E7EB] border-t border-[#D1D5DB]">
        <div className="max-w-[1200px] mx-auto px-10 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-[#6B7280]">
              <p className="font-medium text-[#1F2937]">© 2025 Billig Elektriker · ASA ApS · CVR: 12345678</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <span className="text-xs text-[#6B7280] font-medium">Vi accepterer:</span>
              <div className="flex items-center gap-2">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[1.5rem] opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                  <div className="relative bg-white p-1.5 rounded-lg border border-[#E5E7EB] group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <img src="/payment-icons/apple_pay.svg" alt="Apple Pay" className="h-5 w-auto" />
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-[1.5rem] opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                  <div className="relative bg-white p-1.5 rounded-lg border border-[#E5E7EB] group-hover:border-red-500 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <img src="/payment-icons/dankort.svg" alt="Dankort" className="h-5 w-auto" />
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-500 rounded-[1.5rem] opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                  <div className="relative bg-white p-1.5 rounded-lg border border-[#E5E7EB] group-hover:border-green-500 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <img src="/payment-icons/google_pay.svg" alt="Google Pay" className="h-5 w-auto" />
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-pink-400 rounded-[1.5rem] opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                  <div className="relative bg-white p-1.5 rounded-lg border border-[#E5E7EB] group-hover:border-pink-500 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <img src="/payment-icons/klarna.svg" alt="Klarna" className="h-5 w-auto" />
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-500 rounded-[1.5rem] opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                  <div className="relative bg-white p-1.5 rounded-lg border border-[#E5E7EB] group-hover:border-orange-500 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-5 w-auto" />
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[1.5rem] opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                  <div className="relative bg-white p-1.5 rounded-lg border border-[#E5E7EB] group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <img src="/payment-icons/paypal.svg" alt="PayPal" className="h-5 w-auto" />
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-700 to-blue-500 rounded-[1.5rem] opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                  <div className="relative bg-white p-1.5 rounded-lg border border-[#E5E7EB] group-hover:border-blue-600 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <img src="/payment-icons/visa.svg" alt="Visa" className="h-5 w-auto" />
                  </div>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[1.5rem] opacity-0 group-hover:opacity-75 blur transition duration-300"></div>
                  <div className="relative bg-white p-1.5 rounded-lg border border-[#E5E7EB] group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <img src="/payment-icons/mobilepay.svg" alt="MobilePay" className="h-5 w-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
