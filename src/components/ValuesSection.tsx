import { ArrowRight } from "lucide-react";
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
    <section className="py-12 md:py-24 pb-0 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Subtle electrical circuit background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-values" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h20v20h20v20h-20v20h-20v-20h-20v-20h20z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="30" cy="30" r="2" fill="currentColor" />
              <circle cx="70" cy="70" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-values)" />
        </svg>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-16 animate-fade-in px-4">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {t('values.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('values.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('values.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0">
          {values.map((value, idx) => (
            <div 
              key={idx} 
              className="group text-center space-y-4 md:space-y-6 p-6 md:p-8 rounded-2xl bg-card backdrop-blur-sm border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Icon */}
              <div className="flex justify-center">
                <img 
                  src={value.icon} 
                  alt={value.title}
                  className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Content */}
              <div>
                <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 group-hover:text-primary transition-colors leading-tight">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {value.description}
                </p>
              </div>

              {/* Arrow Button */}
              <div className="flex justify-center pt-2">
                <button className="group/btn relative w-12 h-12 rounded-full bg-primary flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-primary/50">
                  <ArrowRight className="w-5 h-5 text-primary-foreground transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
