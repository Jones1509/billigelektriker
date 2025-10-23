import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Lightbulb, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import smartLightIndoor from "@/assets/smart-light-mobile.jpg";
import smartLightOutdoor from "@/assets/smart-light-outdoor.jpg";
import smartLightBedroom from "@/assets/smart-light-bedroom.jpg";
import { useTranslation } from "react-i18next";

const smartHomeImages = [
  {
    id: 1,
    src: smartLightIndoor,
    titleKey: 'smartLight.images.indoor.title',
    descriptionKey: 'smartLight.images.indoor.description'
  },
  {
    id: 2,
    src: smartLightOutdoor,
    titleKey: 'smartLight.images.outdoor.title',
    descriptionKey: 'smartLight.images.outdoor.description'
  },
  {
    id: 3,
    src: smartLightBedroom,
    titleKey: 'smartLight.images.bedroom.title',
    descriptionKey: 'smartLight.images.bedroom.description'
  }
];

export const SmartLightSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % smartHomeImages.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + smartHomeImages.length) % smartHomeImages.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      {/* Smooth gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #F0F6FF 0%, #EFF6FF 40%, hsl(var(--background)) 100%)'
        }}
      />
      
      {/* Subtle electric pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066ff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center max-w-7xl mx-auto">
          {/* Image carousel section */}
          <div className="relative order-2 md:order-1 animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Main image */}
              <div className="relative aspect-[4/5]">
                <img 
                  src={smartHomeImages[currentIndex].src}
                  alt={t(smartHomeImages[currentIndex].titleKey)}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    isAnimating ? 'scale-105' : 'scale-100'
                  }`}
                />
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Image title and description - responsive positioning */}
                <div className="absolute bottom-32 md:bottom-40 left-4 right-4 md:left-6 md:right-6 text-white z-10">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 drop-shadow-lg">
                    {t(smartHomeImages[currentIndex].titleKey)}
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-white/95 drop-shadow-md">
                    {t(smartHomeImages[currentIndex].descriptionKey)}
                  </p>
                </div>

                {/* Indicators - positioned above arrows */}
                <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-20">
                  {smartHomeImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 md:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-6 md:w-8 bg-white shadow-lg'
                          : 'w-2 md:w-3 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Gå til billede ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation arrows - bottom center */}
                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4 z-20">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-sm border-none cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg hover:shadow-xl"
                    aria-label="Forrige billede"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 backdrop-blur-sm border-none cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg hover:shadow-xl"
                    aria-label="Næste billede"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Text content section */}
          <div className="space-y-4 md:space-y-6 order-1 md:order-2 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">{t('smartLight.badge')}</span>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              {t('smartLight.title')}
            </h2>
            
            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('smartLight.description')}
            </p>

            {/* Feature box with electric styling */}
            <div className="relative overflow-hidden bg-background rounded-2xl p-6 md:p-8 border border-primary/10 shadow-lg">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary" />
              
              <div className="flex items-start gap-4">
                {/* Icon with glow effect */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.25) 100%)',
                    boxShadow: '0 0 30px hsl(var(--primary) / 0.2)'
                  }}
                >
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {t('smartLight.installation.title')}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {t('smartLight.installation.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button with gradient */}
            <Button 
              size="lg" 
              className="group text-lg px-8 py-6 bg-gradient-to-r from-primary via-blue-600 to-primary hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)'
              }}
            >
              <span>{t('smartLight.cta')}</span>
              <Lightbulb className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
