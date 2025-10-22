import { Button } from "./ui/button";
import { Lightbulb, Shield } from "lucide-react";
import smartLightImage from "@/assets/smart-light-mobile.jpg";

export const SmartLightSection = () => {
  return (
    <section 
      className="py-12 md:py-24 relative overflow-hidden" 
      style={{ background: 'linear-gradient(180deg, hsl(var(--blue-tint)) 0%, hsl(var(--background)) 100%)' }}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.08),transparent_50%)]"></div>
      
      <div className="container relative z-10 px-4 md:px-0">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative order-2 md:order-1 animate-fade-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-primary/20 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
            <img 
              src={smartLightImage} 
              alt="Smart lys styret fra mobil app"
              className="relative rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-4 md:space-y-6 order-1 md:order-2 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-full border border-purple-500/20">
              <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent">Smart Home Teknologi</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Smart lys – <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-primary">styr stemningen</span> fra din mobil
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Vælg farver, dæmp lyset og tænd automatisk – alt sammen fra app'en. Skab den perfekte stemning til enhver lejlighed.
            </p>

            <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/20 rounded-2xl border border-purple-500/10 shadow-lg">
              <div className="p-2 md:p-3 bg-gradient-to-br from-primary to-purple-600 rounded-xl shadow-lg flex-shrink-0">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold mb-1 text-sm md:text-base">Tryg installation</div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Autoriseret montering. 2 års reklamationsret på varer og 12 mdr. garanti på arbejdet.
                </p>
              </div>
            </div>

            <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-primary hover:from-purple-700 hover:to-blue-700">
              Se lamperne
              <Lightbulb className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
