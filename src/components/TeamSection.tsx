import { Button } from "./ui/button";
import { Phone, Shield, Clock, Award, Users, Sparkles } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import { useTranslation } from "react-i18next";

export const TeamSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 md:py-28 relative overflow-hidden">
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
            
            {/* Trust badges grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {/* Certificeret */}
              <div className="group relative overflow-hidden rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/30 p-4 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-base group-hover:text-primary transition-colors">{t('team.certified')}</div>
                    <div className="text-xs text-muted-foreground">{t('team.certifiedDescription')}</div>
                  </div>
                </div>
              </div>
              
              {/* Hurtig respons */}
              <div className="group relative overflow-hidden rounded-2xl border-2 border-secondary/10 bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-green-950/30 p-4 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-base group-hover:text-secondary transition-colors">{t('team.fastResponse')}</div>
                    <div className="text-xs text-muted-foreground">{t('team.fastResponseDescription')}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Extra trust badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">2 års garanti</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                <Sparkles className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">100+ projekter</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              className="group/btn relative overflow-hidden w-full md:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-700 border-0 shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 text-base font-semibold px-10 py-6 hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5 relative z-10 group-hover/btn:rotate-12 transition-transform" />
              <span className="relative z-10">{t('team.cta')}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            </Button>
          </div>

          {/* Right image with enhanced effects */}
          <div className="relative group animate-fade-in">
            {/* Multiple glow layers */}
            <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-4 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Image container */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 border-2 border-white/20 dark:border-gray-800/20">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
              
              <img 
                src={teamPhoto} 
                alt="Billig Elektriker team"
                className="relative w-full group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border-2 border-primary/20 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">100+</div>
                  <div className="text-xs text-muted-foreground">Tilfredse kunder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
