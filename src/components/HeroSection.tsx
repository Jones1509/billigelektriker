import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import switchesImage from "@/assets/switches-background.webp";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Content */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="text-2xl font-bold text-green-500">Billig Elektriker</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              El-service der virker.<br />Hver gang
            </h1>
            <p className="text-xl mb-4 text-gray-700">
              Certificerede elektrikere med fair priser og hurtig respons – fra fejlfinding til komplette installationer.
            </p>
            <p className="text-lg mb-8 text-gray-600">
              Få et tilbud i dag – helt gratis og uforpligtende.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                Få et tilbud
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                <Play className="mr-2 h-5 w-5" />
                Se video
              </Button>
            </div>
          </div>
          
          {/* Image - Right Side */}
          <div className="relative">
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
