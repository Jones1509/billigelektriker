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
    { name: "Dankort", logo: "💳" },
    { name: "Visa", logo: "💳" },
    { name: "Mastercard", logo: "💳" },
    { name: "MobilePay", logo: "📱" },
    { name: "Apple Pay", logo: "🍎" },
    { name: "Google Pay", logo: "🔵" },
    { name: "Klarna", logo: "💰" },
    { name: "Maestro", logo: "💳" },
    { name: "American Express", logo: "💳" },
    { name: "Forbrugsforeningen", logo: "🏪" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Subtle electrical pattern background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 opacity-95"></div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          hsl(var(--primary)) 10px,
          hsl(var(--primary)) 11px
        )`
      }}></div>

      {/* Main Footer Content */}
      <div className="container relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Section 1: About + Logo */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg shadow-primary/20">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl">Billig Elektriker</h3>
                <p className="text-blue-300 text-sm">ASA ApS</p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-2 text-sm leading-relaxed">
              Professionel el-service til fair priser
            </p>
            <p className="text-slate-400 mb-4 text-sm leading-relaxed">
              Certificerede elektrikere med passion for kvalitet og kundetilfredshed
            </p>
            
            <p className="text-slate-400 text-sm mb-4">CVR: 12345678</p>
            
            <Button className="bg-primary hover:bg-primary/90 text-white mb-6">
              <Phone className="h-4 w-4 mr-2" />
              +45 12 34 56 78
            </Button>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm">Få tilbud og tips</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Din email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
                  Tilmeld
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5 text-slate-300" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5 text-slate-300" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-colors">
                <Linkedin className="h-5 w-5 text-slate-300" />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links - 3 Columns */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    El-arbejde
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Smart Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Erhverv
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    Udlejning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
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
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Information
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Sådan bestiller du
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Hjemmesidens funktion
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Priser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Returnering
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Fragt & levering
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Service */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Kundeservice
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Handelsbetingelser
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Privatlivspolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Cookiepolitik
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Garanti & ansvar
                  </a>
                </li>
                <li>
                  <Link to="/kontakt" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Kontakt os
                  </Link>
                </li>
                <li>
                  <Link to="/om-os" className="text-slate-400 hover:text-primary transition-colors text-sm">
                    Om os
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Contact + Map */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Kontakt & Lokation
            </h4>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 text-sm">Lyngby-Taarbæk Kommune</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+4512345678" className="text-slate-300 text-sm hover:text-primary transition-colors">
                  +45 12 34 56 78
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@billigelektriker.dk" className="text-slate-300 text-sm hover:text-primary transition-colors">
                  info@billigelektriker.dk
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <p>Man-Fre: 8-17</p>
                  <p>Weekend: Efter aftale</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:scale-105 transition-transform duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36064.37728910234!2d12.481379!3d55.770249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46524fe90aa1f3fd%3A0x9d24919290c1c4f0!2sLyngby-Taarb%C3%A6k%20Kommune!5e0!3m2!1sen!2sdk!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              ></iframe>
            </div>
            <a 
              href="https://maps.google.com/?q=Lyngby-Taarbæk+Kommune" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary text-sm mt-2 inline-block hover:underline"
            >
              Vis i Google Maps →
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 py-8 border-y border-slate-800 mb-8">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Autoriseret elektriker</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Certificeret personale</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">2 års garanti</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Hurtig respons</span>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="bg-slate-800/50 rounded-2xl p-8 mb-8">
          <h4 className="text-white text-center font-semibold mb-6 text-sm uppercase tracking-wider">
            Vi accepterer følgende betalingsmetoder
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white rounded-lg p-3 w-16 h-10 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                title={method.name}
              >
                <span className="text-2xl">{method.logo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
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
