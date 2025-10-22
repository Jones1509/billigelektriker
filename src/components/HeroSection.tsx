import { Button } from "./ui/button";
import { ArrowRight, Phone } from "lucide-react";
import switchesImage from "@/assets/switches-background.webp";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden pt-32 md:pt-0">
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
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="max-w-2xl animate-fade-in px-4 md:px-0">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-sm font-semibold text-white">Certificeret og Autoriseret</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight">
              El-service der <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-green-300">virker</span>.<br />Hver gang
            </h1>
            <p className="text-base md:text-xl mb-3 md:mb-4 text-white/95 leading-relaxed">
              Certificerede elektrikere med fair priser og hurtig respons – fra fejlfinding til komplette installationer.
            </p>
            <p className="text-sm md:text-lg mb-6 md:mb-8 text-white/85 leading-relaxed">
              Vi hjælper dig med alt fra små reparationer til store projekter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/95 font-semibold shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 group">
                Se vores arbejde
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-md bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-primary font-semibold shadow-xl hover:scale-105 transition-all duration-300">
                <Phone className="mr-2 h-5 w-5" />
                Kontakt os
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-6 text-xs md:text-sm text-white/90 max-w-2xl">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="h-12 w-12 md:h-12 md:w-12 rounded-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 md:h-6 md:w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="leading-tight font-medium">2 års garanti</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="h-12 w-12 md:h-12 md:w-12 rounded-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 md:h-6 md:w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="leading-tight font-medium">Hurtig respons</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="h-12 w-12 md:h-12 md:w-12 rounded-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg className="h-6 w-6 md:h-6 md:w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="leading-tight font-medium">Fri parkering</span>
              </div>
            </div>
          </div>
          
          {/* Image - Right Side */}
          <div className="relative hidden lg:block animate-fade-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-3xl blur-3xl opacity-50 animate-pulse"></div>
            <img 
              src={switchesImage} 
              alt="Forskellige farverige stikkontakter og afbrydere" 
              className="relative w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
