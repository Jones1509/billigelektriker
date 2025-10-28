import { ArrowRight, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import iconSecurity from "@/assets/icon-security.webp";
import iconQuality from "@/assets/icon-quality.webp";
import iconPunctuality from "@/assets/icon-punctuality.webp";
import iconGuarantee from "@/assets/icon-guarantee.webp";

export const ValuesSection = () => {
  const { t } = useTranslation();
  
  const values = [
    {
      icon: iconSecurity,
      title: t('values.safety.title'),
      description: t('values.safety.description')
    },
    {
      icon: iconQuality,
      title: t('values.price.title'),
      description: t('values.price.description')
    },
    {
      icon: iconPunctuality,
      title: t('values.punctuality.title'),
      description: t('values.punctuality.description')
    },
    {
      icon: iconGuarantee,
      title: t('values.warranty.title'),
      description: t('values.warranty.description')
    }
  ];

  return (
    <section className="relative py-8 md:py-12 pb-0 overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(var(--muted) / 0.2) 0%, hsl(var(--blue-tint) / 0.6) 100%)' }}>
      {/* Smooth top fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(var(--muted)/0.2)] to-transparent pointer-events-none z-[5]"></div>
      
      {/* Decorative electrical circuit pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-values" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M10 10h25v25h25v25h-25v25h-25v-25h-25v-25h25z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="35" cy="35" r="2" fill="currentColor" />
              <circle cx="85" cy="85" r="2.5" fill="currentColor" />
              <line x1="35" y1="10" x2="35" y2="35" stroke="currentColor" strokeWidth="0.5" />
              <line x1="85" y1="60" x2="85" y2="85" stroke="currentColor" strokeWidth="0.5" />
              <line x1="10" y1="35" x2="35" y2="35" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-values)" />
        </svg>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-6 md:mb-8 animate-fade-in px-4">
          {/* Premium Badge with gentle bounce */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] text-primary text-sm font-semibold mb-4 shadow-[0_4px_12px_rgba(0,102,255,0.15)] animate-[gentleBounce_2s_ease-in-out_infinite]">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="tracking-wide">{t('values.badge')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold mb-3 text-[#0F172A] leading-tight tracking-tight">
            {t('values.title')}
          </h2>
          <p className="text-lg md:text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            {t('values.subtitle')}
          </p>
        </div>

        {/* Values Grid - Premium Design */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
            {values.map((value, idx) => {
              // Define gradient colors for each icon wrapper
              const iconGradients = [
                "bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE]", // Security - Blue
                "bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0]", // Quality - Green
                "bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE]", // Punctuality - Purple
                "bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE]", // Guarantee - Blue
              ];
              
              return (
                <div 
                  key={idx} 
                  className="group relative flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-white border border-primary/[0.08] shadow-[0_4px_6px_rgba(0,0,0,0.03),0_10px_30px_rgba(0,102,255,0.05)] hover:shadow-[0_20px_40px_rgba(0,102,255,0.12),0_4px_8px_rgba(0,0,0,0.04)] hover:border-primary/15 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-4 h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[340px] overflow-hidden"
                  style={{ 
                    animationDelay: `${(idx + 1) * 100}ms`,
                    opacity: 0,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Top shine effect */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon with circular gradient background and outer ring */}
                  <div className={`relative flex items-center justify-center w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] rounded-full ${iconGradients[idx]} flex-shrink-0 mb-4 sm:mb-5 lg:mb-6 transition-all duration-[400ms] group-hover:scale-110 group-hover:-rotate-[5deg]`}>
                    {/* Outer ring effect */}
                    <div className="absolute inset-[-8px] rounded-full border-2 border-primary/10 opacity-0 group-hover:opacity-100 group-hover:inset-[-12px] transition-all duration-300"></div>
                    
                    <img 
                      src={value.icon} 
                      alt={value.title}
                      className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain relative z-10"
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-[17px] sm:text-[19px] lg:text-[20px] text-center text-[#0F172A] tracking-tight leading-tight min-h-[44px] sm:min-h-[48px] lg:min-h-[52px] flex items-center justify-center mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 px-2">
                    {value.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-center text-[#64748B] leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] flex-grow mb-auto px-1 sm:px-2">
                    {value.description}
                  </p>
                  
                  {/* Arrow Button - Premium Interactive */}
                  <div className="flex items-center justify-center mt-6 flex-shrink-0">
                    <button className="w-12 h-12 rounded-full bg-primary shadow-[0_4px_16px_rgba(0,102,255,0.25)] flex items-center justify-center transition-all duration-300 hover:bg-[#0052CC] hover:translate-x-1 hover:scale-105 hover:shadow-[0_6px_24px_rgba(0,102,255,0.4)] cursor-pointer">
                      <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Add keyframe animations */}
        <style>{`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes gentleBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}</style>
        
        {/* Optional CTA */}
        <div className="text-center mt-4 md:mt-6 animate-fade-in px-4">
          <p className="text-muted-foreground mb-4 text-sm md:text-base">
            {t('values.ctaQuestion')}
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <Phone className="w-4 h-4" />
            {t('values.ctaButton')}
          </button>
        </div>
      </div>
    </section>
  );
};
