import { Button } from "./ui/button";
import { Lightbulb, Shield } from "lucide-react";
import smartLightImage from "@/assets/smart-light-mobile.jpg";

export const SmartLightSection = () => {
  return (
    <section 
      className="py-20" 
      style={{ backgroundColor: 'hsl(var(--blue-tint))' }}
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <img 
              src={smartLightImage} 
              alt="Smart lys styret fra mobil app"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Smart Home</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              Smart lys – styr stemningen fra din mobil
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Vælg farver, dæmp lyset og tænd automatisk – alt sammen fra app'en. Skab den perfekte stemning til enhver lejlighed.
            </p>

            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Autoriseret montering. 2 års reklamationsret på varer og 12 mdr. garanti på arbejdet.
              </p>
            </div>

            <Button size="lg" className="group">
              Se lamperne
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
