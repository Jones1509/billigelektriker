import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
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
    <footer className="relative overflow-hidden">
      {/* Modern dark background with subtle texture */}
      <div className="absolute inset-0 bg-[#1a202c]"></div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Main Footer Content */}
      <div className="container relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1.3fr] gap-12 lg:gap-16 mb-12">
          
          {/* Column 1: About + Logo */}
          <div>
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

          {/* Column 2: Information */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider relative pb-2">
              Information
              <span className="absolute bottom-0 left-0 w-[30px] h-[2px] bg-primary"></span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all duration-300 text-sm inline-block">
                  Sådan bestiller du
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all duration-300 text-sm inline-block">
                  Hjemmesidens funktion
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all duration-300 text-sm inline-block">
                  Priser
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all duration-300 text-sm inline-block">
                  Returnering
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all duration-300 text-sm inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white hover:translate-x-0.5 transition-all duration-300 text-sm inline-block">
                  Fragt & levering
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact + Map */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider relative pb-2">
              Kontakt & Lokation
              <span className="absolute bottom-0 left-0 w-[30px] h-[2px] bg-primary"></span>
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

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
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
