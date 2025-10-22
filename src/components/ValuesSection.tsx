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
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Extremely subtle electrical circuit background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-values" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M10 10h25v25h25v25h-25v25h-25v-25h-25v-25h25z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="35" cy="35" r="1.5" fill="currentColor" />
              <circle cx="85" cy="85" r="1.5" fill="currentColor" />
              <line x1="35" y1="10" x2="35" y2="35" stroke="currentColor" strokeWidth="0.5" />
              <line x1="85" y1="60" x2="85" y2="85" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-values)" />
        </svg>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-10 md:mb-12 lg:mb-14 animate-fade-in px-4">
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold mb-6 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <span className="tracking-wide">{t('values.badge')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 text-foreground leading-tight">
            {t('values.title')}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('values.subtitle')}
          </p>
        </div>

        {/* Values Grid - Perfect Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0 max-w-[1400px] mx-auto">
          {values.map((value, idx) => (
            <div 
              key={idx} 
              className="group relative h-full flex flex-col p-10 rounded-2xl bg-card border border-border/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,102,255,0.12)] hover:border-primary/30 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/[0.02] group-hover:to-primary/[0.01] rounded-2xl transition-all duration-300 pointer-events-none"></div>
              
              {/* Icon - Fixed size and centered */}
              <div className="relative flex justify-center items-center h-20 mb-6">
                <div className="relative">
                  <img 
                    src={value.icon} 
                    alt={value.title}
                    className="w-20 h-20 object-contain transition-all duration-300 group-hover:scale-105 group-hover:rotate-[5deg]"
                  />
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 blur-xl rounded-full transition-all duration-300 -z-10"></div>
                </div>
              </div>
              
              {/* Title - Fixed min-height for alignment */}
              <h3 className="font-bold text-xl text-center text-foreground group-hover:text-primary transition-colors duration-300 leading-tight min-h-[3.5rem] mb-4">
                {value.title}
              </h3>
              
              {/* Description - Grows to fill space */}
              <p className="text-base text-center text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300 flex-grow mb-8">
                {value.description}
              </p>
              
              {/* Arrow Button - Always at bottom */}
              <div className="flex justify-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/5 group-hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/30">
                  <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
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
