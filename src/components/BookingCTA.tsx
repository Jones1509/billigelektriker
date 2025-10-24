import { Button } from "./ui/button";
import { Calendar, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import electricalComposition from "@/assets/electrical-composition-light.png";

export const BookingCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="w-full bg-[#F8FAFC] py-16 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Gradient transitions */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[hsl(var(--blue-tint))] to-[#F8FAFC] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE - 60% */}
          <div className="lg:col-span-3">
            {/* Badge */}
            <div className="inline-block mb-5">
              <span className="inline-block px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#0369A1] bg-[rgba(14,165,233,0.12)] border-2 border-[rgba(14,165,233,0.3)] rounded-full">
                Professionel Rådgivning
              </span>
            </div>
            
            {/* Heading */}
            <h2 className="text-[34px] md:text-[48px] font-extrabold text-[#1E293B] leading-[1.3] tracking-[-0.3px] [word-spacing:2px] mb-4 max-w-[650px]">
              Vi Hjælper Dig Med Den Rigtige Løsning
            </h2>
            
            {/* Subtitle */}
            <p className="text-base md:text-lg text-[#64748B] leading-[1.7] mb-8 max-w-[550px]">
              Book en gratis rådgivning med vores certificerede elektrikere. Vi hjælper dig med alt fra fejlfinding til smart home-installationer.
            </p>
            
            {/* Trust bullets */}
            <div className="space-y-4 mb-9">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-[rgba(14,165,233,0.25)]">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-semibold text-[#475569]">Certificerede elektrikere</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-[rgba(14,165,233,0.25)]">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-semibold text-[#475569]">Ingen forpligtelser</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-[rgba(14,165,233,0.25)]">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-semibold text-[#475569]">Svar samme dag</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              className="inline-flex items-center gap-2 px-11 py-6 text-lg font-bold text-white bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] rounded-xl shadow-[0_6px_24px_rgba(14,165,233,0.35)] hover:shadow-[0_8px_32px_rgba(14,165,233,0.45)] hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Book Gratis Samtale
            </Button>
            
            {/* Phone info */}
            <p className="mt-5 text-[15px] text-[#64748B]">
              Eller ring direkte:{" "}
              <a 
                href="tel:71997171" 
                className="font-bold text-[#0EA5E9] hover:text-[#0284C7] hover:underline transition-colors"
              >
                71 99 71 71
              </a>
            </p>
            
            {/* Small text */}
            <p className="mt-4 text-[13px] text-[#94A3B8]">
              Ingen forpligtelser • Gratis rådgivning • Vi ringer inden for 24 timer
            </p>
          </div>
          
          {/* RIGHT SIDE - 40% */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end items-center p-10 lg:p-0">
            <div className="relative flex items-center justify-center">
              {/* Gradient glow background */}
              <div className="absolute inset-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 transition-all duration-500 group-hover:opacity-120 group-hover:blur-[50px]"
                   style={{
                     background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(139,92,246,0.08) 50%, transparent 100%)',
                     filter: 'blur(40px)',
                     zIndex: 0
                   }}>
              </div>
              
              {/* Illustration with smooth blend and animation */}
              <div className="relative z-10 w-full max-w-[400px] md:max-w-[450px] lg:max-w-[550px] transition-all duration-500 hover:scale-105 group"
                   style={{
                     filter: 'drop-shadow(0 20px 60px rgba(14,165,233,0.2))',
                     animation: 'pulse 3s ease-in-out infinite'
                   }}>
                <img 
                  src={electricalComposition} 
                  alt="Abstrakt elektrisk komposition med lyn-symbol og service-ikoner" 
                  className="w-full h-auto"
                  style={{
                    mixBlendMode: 'screen',
                    opacity: 0.95,
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-[#F8FAFC] pointer-events-none"></div>
    </section>
  );
};
