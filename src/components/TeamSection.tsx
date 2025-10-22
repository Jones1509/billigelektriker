import { Button } from "./ui/button";
import { Phone, Shield, Clock, Zap, CheckCircle2 } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import { useTranslation } from "react-i18next";

export const TeamSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Modern gradient orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/30 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center px-4 md:px-0">
          {/* Left content */}
          <div className="space-y-6 animate-fade-in order-2 md:order-1">
            {/* Badge with icon */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20">
              <Zap className="h-4 w-4" />
              {t('team.badge')}
            </div>
            
            {/* Title with gradient */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('team.title')}
            </h2>
            
            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              {t('team.description')}
            </p>
            
            {/* Feature list - modern style */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-foreground">{t('team.certified')}</span>
                  <span className="text-muted-foreground"> - {t('team.certifiedDescription')}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-foreground">{t('team.fastResponse')}</span>
                  <span className="text-muted-foreground"> - {t('team.fastResponseDescription')}</span>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              className="group w-full md:w-auto mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {t('team.cta')}
            </Button>
          </div>

          {/* Right image - modern with floating stats */}
          <div className="relative animate-fade-in order-1 md:order-2">
            {/* Main image with modern styling */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/50 dark:border-gray-800/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10"></div>
              <img 
                src={teamPhoto} 
                alt="Billig Elektriker team"
                className="w-full relative z-10"
              />
            </div>
            
            {/* Floating stat card - top right */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 border border-border animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Certificeret</div>
                  <div className="text-xs text-muted-foreground">Autoriseret</div>
                </div>
              </div>
            </div>
            
            {/* Floating stat card - bottom left */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 border border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Hurtig respons</div>
                  <div className="text-xs text-muted-foreground">Kontakt i dag</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
