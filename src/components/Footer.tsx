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
    { name: "Dankort", color: "bg-red-600", icon: "💳" },
    { name: "Visa", color: "bg-blue-600", icon: "💳" },
    { name: "Mastercard", color: "bg-orange-500", icon: "💳" },
    { name: "MobilePay", color: "bg-blue-500", icon: "📱" },
    { name: "Apple Pay", color: "bg-slate-900", icon: "🍎" },
    { name: "Google Pay", color: "bg-blue-400", icon: "🔵" },
    { name: "Klarna", color: "bg-pink-500", icon: "💰" },
    { name: "Maestro", color: "bg-red-500", icon: "💳" },
    { name: "American Express", color: "bg-blue-700", icon: "💳" },
    { name: "Forbrugsforeningen", color: "bg-green-600", icon: "🏪" },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-50">

      {/* Main Footer Content */}
      <div className="container relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Section 1: About + Logo */}
          <div className="lg:col-span-3">
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
            
            <Button className="bg-primary hover:bg-primary/90 text-white mb-6 shadow-md">
              <Phone className="h-4 w-4 mr-2" />
              +45 12 34 56 78
            </Button>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-slate-900 font-semibold mb-3 text-sm">Få tilbud og tips</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Din email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-slate-300 text-slate-900"
                />
                <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
                  Tilmeld
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group">
                <Facebook className="h-5 w-5 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group">
                <Instagram className="h-5 w-5 text-slate-600 group-hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:border-primary transition-colors group">
                <Linkedin className="h-5 w-5 text-slate-600 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links - 3 Columns */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Services */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    El-arbejde
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Smart Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Erhverv
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Udlejning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Akut hjælp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                    Se alle services →
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Information */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Sådan bestiller du
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Hjemmesidens funktion
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Priser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Returnering
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Fragt & levering
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Service */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">
                Kundeservice
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Handelsbetingelser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Privatlivspolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Cookiepolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Garanti & ansvar
                  </a>
                </li>
                <li>
                  <Link to="/kontakt" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Kontakt os
                  </Link>
                </li>
                <li>
                  <Link to="/om-os" className="text-slate-600 hover:text-primary transition-colors text-sm">
                    Om os
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Kontakt
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 text-sm font-medium">Grønnevej 259</p>
                  <p className="text-slate-600 text-sm">2800 Kongens Lyngby (Sorgenfri)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+4512345678" className="text-slate-700 text-sm hover:text-primary transition-colors">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@billigelektriker.dk" className="text-slate-700 text-sm hover:text-primary transition-colors break-all">
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
        <div className="mb-12">
          <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-slate-200 hover:-translate-y-1 transition-transform duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.5!2d12.5009!3d55.7815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253866f9e6c15%3A0x7f8b1c3e4d5a6b2c!2sGr%C3%B8nnevej%20259%2C%202800%20Kongens%20Lyngby!5e0!3m2!1sda!2sdk!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] md:h-[350px] lg:h-[400px]"
            ></iframe>
          </div>
          <div className="text-center mt-4 space-y-2">
            <p className="text-slate-600 text-sm flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Grønnevej 259, 2800 Kongens Lyngby (Sorgenfri)
            </p>
            <p className="text-slate-500 text-xs">Vi dækker Lyngby, København og Nordsjælland</p>
            <a 
              href="https://maps.google.com/?q=Grønnevej+259+2800+Kongens+Lyngby" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm font-medium inline-block hover:underline"
            >
              Vis i Google Maps →
            </a>
          </div>
        </div>

        {/* Payment Methods - Compact Single Row */}
        <div className="py-6 mb-6 border-t border-slate-200">
          <p className="text-slate-500 text-center text-xs mb-4">Vi accepterer:</p>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="w-10 h-6 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer grayscale hover:grayscale-0"
                title={method.name}
              >
                <div className={`w-full h-full rounded flex items-center justify-center ${method.color} text-white text-[8px] font-bold`}>
                  {method.icon}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300 pt-6 bg-slate-100/50 -mx-8 px-8 -mb-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>
              © 2025 Billig Elektriker (ASA ApS). Alle rettigheder forbeholdes. CVR: 12345678
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privatlivspolitik
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Handelsbetingelser
              </a>
              <Link to="/kontakt" className="hover:text-primary transition-colors">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
