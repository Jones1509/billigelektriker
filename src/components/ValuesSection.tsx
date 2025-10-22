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
    <section className="relative py-24 md:py-28 lg:py-32 bg-gradient-to-b from-background via-blue-50/30 to-background overflow-hidden">
      {/* Extremely subtle electrical circuit background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-values" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M10 10h25v25h25v25h-25v25h-25v-25h-25v-25h25z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="35" cy="35" r="1.5" fill="currentColor" />
              <circle cx="85" cy="85" r="2" fill="currentColor" />
              <line x1="35" y1="10" x2="35" y2="35" stroke="currentColor" strokeWidth="0.5" />
              <line x1="85" y1="60" x2="85" y2="85" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-values)" />
        </svg>
      </div>
      
      {/* Soft shadow underneath */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-14 md:mb-16 lg:mb-20 animate-fade-in px-4">
          {/* Professional Badge with subtle animation */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 border border-primary/20 text-primary text-sm font-semibold mb-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="tracking-wide">{t('values.badge')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-foreground leading-tight drop-shadow-sm">
            {t('values.title')}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('values.subtitle')}
          </p>
        </div>

        {/* Values Grid - Perfect Alignment with Premium Design */}
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
            {values.map((value, idx) => {
              // Define accent colors for each card
              const accentColors = [
                { bg: "bg-blue-100", border: "border-blue-200", hover: "group-hover:bg-blue-50" }, // Security - Blue
                { bg: "bg-green-100", border: "border-green-200", hover: "group-hover:bg-green-50" }, // Quality - Green
                { bg: "bg-purple-100", border: "border-purple-200", hover: "group-hover:bg-purple-50" }, // Punctuality - Purple
                { bg: "bg-blue-100", border: "border-blue-200", hover: "group-hover:bg-blue-50" }, // Guarantee - Blue
              ];
              
              return (
                <div 
                  key={idx} 
                  className="group flex flex-col items-center p-10 rounded-[20px] bg-card border border-primary/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,102,255,0.15)] hover:border-primary/30 hover:bg-gradient-to-b hover:from-card hover:to-blue-50/20 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-3 h-full min-h-[440px]"
                  style={{ 
                    animationDelay: `${idx * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out both'
                  }}
                >
                  {/* Icon with Circular Background */}
                  <div className={`relative flex items-center justify-center w-[120px] h-[120px] rounded-full ${accentColors[idx].bg} ${accentColors[idx].border} border-2 ${accentColors[idx].hover} flex-shrink-0 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] shadow-lg group-hover:shadow-[0_8px_25px_rgba(0,102,255,0.2)]`}>
                    <img 
                      src={value.icon} 
                      alt={value.title}
                      className="w-16 h-16 object-contain transition-all duration-300"
                    />
                    {/* Pulse effect on icon background */}
                    <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 animate-pulse transition-all duration-300"></div>
                  </div>
                  
                  {/* Title - Fixed min-height for consistent alignment */}
                  <h3 className="font-bold text-xl text-center text-foreground group-hover:text-primary transition-colors duration-300 leading-tight min-h-[60px] flex items-center justify-center mb-4">
                    {value.title}
                  </h3>
                  
                  {/* Description - Grows to fill space, pushes button down */}
                  <p className="text-base text-center text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300 flex-grow mb-auto">
                    {value.description}
                  </p>
                  
                  {/* Arrow Button - Premium version */}
                  <div className="flex items-center justify-center mt-8 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-primary shadow-[0_4px_12px_rgba(0,102,255,0.3)] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_6px_20px_rgba(0,102,255,0.4)] group-hover:scale-110 group-hover:bg-[#0052CC]">
                      <ArrowRight className="w-5 h-5 text-primary-foreground transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Add keyframe animation */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        
        {/* Optional CTA */}
        <div className="text-center mt-10 md:mt-12 lg:mt-14 animate-fade-in px-4">
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Klar til at opleve forskellen?
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <Phone className="w-4 h-4" />
            Få et uforpligtende tilbud
          </button>
        </div>
      </div>
    </section>
  );
};
