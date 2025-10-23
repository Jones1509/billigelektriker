import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SectionSeparator = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative py-12 md:py-16">
      {/* Gradient background transition from white to light blue */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--background)) 0%, #F0F6FF 100%)'
        }}
      />
      
      {/* Separator badge */}
      <div className="container relative z-10 flex justify-center">
        <div 
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border shadow-lg animate-fade-in hover:scale-105 transition-transform duration-300"
          style={{
            background: 'linear-gradient(90deg, rgba(14,165,233,0.12), rgba(139,92,246,0.12))',
            borderColor: 'rgba(14,165,233,0.35)'
          }}
        >
          <Lightbulb className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-sm md:text-base font-bold text-primary uppercase tracking-wider">
            {t('sectionSeparator.exploreProducts')}
          </span>
        </div>
      </div>
    </div>
  );
};
