import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import switchesImage from "@/assets/switches-hero.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden bg-muted/30">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.7)" }}
      >
        <source src="/video-background.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent"></div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
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
              Få et tilbud i dag – helt gratis og uforpligtende.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                Få et tilbud
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Play className="mr-2 h-5 w-5" />
                Se video
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
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
