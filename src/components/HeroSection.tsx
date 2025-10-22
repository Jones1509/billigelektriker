import { Button } from "./ui/button";
import { ArrowRight, Phone } from "lucide-react";
import switchesImage from "@/assets/switches-background.webp";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video-background.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="text-2xl font-bold text-green-500">Billig Elektriker</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              El-service der virker.<br />Hver gang
            </h1>
            <p className="text-xl mb-4 text-white/90">
              Certificerede elektrikere med fair priser og hurtig respons – fra fejlfinding til komplette installationer.
            </p>
            <p className="text-lg mb-8 text-white/80">
              Certificerede elektrikere i København. Vi hjælper dig med alt fra små reparationer til store projekter.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Se vores arbejde
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary font-semibold">
                <Phone className="mr-2 h-5 w-5" />
                Kontakt os
              </Button>
            </div>
          </div>
          
          {/* Image - Right Side */}
          <div className="relative hidden lg:block">
            <img 
              src={switchesImage} 
              alt="Forskellige farverige stikkontakter og afbrydere" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
