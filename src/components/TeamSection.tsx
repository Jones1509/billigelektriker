import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import { useTranslation } from "react-i18next";

export const TeamSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background"></div>
      
      <div className="container relative z-10">
        {/* Centered header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            {t('team.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('team.description')}
          </p>
        </div>

        {/* Symmetric layout */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Image - centered and prominent */}
          <div className="relative animate-fade-in mb-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={teamPhoto} 
                alt="Billig Elektriker team"
                className="w-full"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* CTA - centered */}
          <div className="text-center animate-fade-in">
            <Button 
              size="lg" 
              className="group px-8 py-6 text-base"
            >
              <Phone className="mr-2 h-5 w-5" />
              {t('team.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
