import { Button } from "./ui/button";
import { ArrowRight, Phone } from "lucide-react";
import switchesImage from "@/assets/switches-background.webp";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-[85dvh] md:min-h-[700px] lg:min-h-[750px] flex items-start md:items-center overflow-hidden pt-16 sm:pt-20 md:pt-0">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-[scale_20s_ease-in-out_infinite]"
        style={{ 
          imageRendering: "crisp-edges",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden"
        }}
      >
        <source src="/video-background.mp4" type="video/mp4" />
      </video>
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-blue-900/60 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.15),transparent_50%)]"></div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">{t('hero.certified')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-white leading-[1.1] sm:leading-tight">
              {t('hero.title1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-green-300">{t('hero.title2')}</span>{t('hero.title3')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-5 text-white/95 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/95 font-semibold shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 group h-12 sm:h-14 text-base sm:text-lg">
                {t('hero.seeOurWork')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-md bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-primary font-semibold shadow-xl hover:scale-105 transition-all duration-300 h-12 sm:h-14 text-base sm:text-lg">
                <Phone className="mr-2 h-5 w-5" />
                {t('hero.cta')}
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-8 md:mt-10 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-white max-w-xl">
              <div className="flex flex-col items-center gap-2 sm:gap-3 text-center animate-fade-in">
                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-secondary backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-2xl border-2 border-white/30 ring-2 sm:ring-3 md:ring-4 ring-secondary/20">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm leading-tight font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{t('hero.warranty')}</span>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-3 text-center animate-fade-in [animation-delay:150ms]">
                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-secondary backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-2xl border-2 border-white/30 ring-2 sm:ring-3 md:ring-4 ring-secondary/20">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm leading-tight font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{t('hero.quickResponse')}</span>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-3 text-center animate-fade-in [animation-delay:300ms]">
                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-secondary backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-2xl border-2 border-white/30 ring-2 sm:ring-3 md:ring-4 ring-secondary/20">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm leading-tight font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{t('hero.freeParking')}</span>
              </div>
            </div>
          </div>
          
          {/* Image - Right Side */}
          <div className="relative hidden lg:block animate-fade-in">
            <img 
              src={switchesImage} 
              alt="Forskellige farverige stikkontakter og afbrydere" 
              className="relative w-full h-auto rounded-2xl hover:scale-105 transition-transform duration-500"
              style={{ 
                imageRendering: "-webkit-optimize-contrast",
                WebkitFontSmoothing: "antialiased"
              }}
              loading="eager"
            />
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
