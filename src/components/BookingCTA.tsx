import { Button } from "./ui/button";
import { Calendar, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import consultationProfessional from "@/assets/consultation-professional.png";

export const BookingCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="w-full py-16 md:py-24 lg:py-28 relative overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, #F0F9FF 0%, #F8FAFC 50%, #EFF6FF 100%)'
             }}>
      {/* Gradient transitions */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[hsl(var(--blue-tint))] to-transparent pointer-events-none"></div>
      
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{
             backgroundImage: `radial-gradient(circle at 20% 50%, rgba(14,165,233,0.4) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(139,92,246,0.3) 0%, transparent 50%)`,
             animation: 'pulse 8s ease-in-out infinite'
           }}>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE */}
          <div className="w-full">
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
          
          {/* RIGHT SIDE */}
          <div className="w-full flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[400px] lg:max-w-[480px]">
              {/* Subtle glow behind image */}
              <div className="absolute inset-0 -z-10"
                   style={{
                     background: 'radial-gradient(circle at center, rgba(14,165,233,0.15) 0%, transparent 70%)',
                     filter: 'blur(40px)',
                     transform: 'scale(1.1)'
                   }}>
              </div>
              
              {/* Professional electrician image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                   style={{
                     boxShadow: '0 20px 60px rgba(14,165,233,0.2), 0 0 0 1px rgba(14,165,233,0.1)'
                   }}>
                <img 
                  src={consultationProfessional} 
                  alt="Professionel elektriker med værktøj og kabler" 
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: '4/5'
                  }}
                />
                
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,165,233,0.1)] to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};
