import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-electrician.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professionel elektriker arbejder"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0" 
          style={{ background: 'var(--hero-overlay)' }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              El-service der virker. Hver gang.
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl">
              Certificerede elektrikere med fair priser og hurtig respons – fra fejlfinding til komplette installationer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="default" className="group">
                Få et tilbud
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="secondary">
                Se produkter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
