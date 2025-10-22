import { Button } from "./ui/button";
import { Phone, Shield, Clock, Award, Users, Sparkles } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import { useTranslation } from "react-i18next";

export const TeamSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-green-50/40 to-background"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--secondary)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center px-4 md:px-0">
          {/* Left content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Badge with icon */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary/10 via-secondary/15 to-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold shadow-lg shadow-secondary/5">
              <Users className="h-4 w-4" />
              {t('team.badge')}
            </div>
            
            {/* Title with gradient */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('team.title')}
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('team.description')}
            </p>
            
            {/* Trust badges - simplified */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{t('team.certified')}</div>
                  <div className="text-xs text-muted-foreground">{t('team.certifiedDescription')}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{t('team.fastResponse')}</div>
                  <div className="text-xs text-muted-foreground">{t('team.fastResponseDescription')}</div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full md:w-auto mt-2"
            >
              <Phone className="mr-2 h-5 w-5" />
              {t('team.cta')}
            </Button>
          </div>

          {/* Right image - simplified */}
          <div className="relative animate-fade-in">
            <div className="relative overflow-hidden rounded-2xl shadow-lg border border-border">
              <img 
                src={teamPhoto} 
                alt="Billig Elektriker team"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
