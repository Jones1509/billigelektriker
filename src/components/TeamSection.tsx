import { Button } from "./ui/button";
import { Phone, Sparkles, Zap, ArrowRight, Star, Users } from "lucide-react";
import teamPhoto from "@/assets/team-photo-ai.jpg";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "./ui/card";

export const TeamSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-8 md:py-12 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(var(--muted) / 0.3) 0%, hsl(var(--background)) 100%)' }}>
      {/* Top fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(var(--muted)/0.5)] to-transparent pointer-events-none z-0"></div>
      
      {/* Very subtle decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-10 animate-fade-in px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            {t('team.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('team.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 md:gap-12 px-4 md:px-0 max-w-6xl mx-auto items-center">
          {/* Left - Clean Image */}
          <div className="relative animate-fade-in">
            
            <Card className="border-0 shadow-lg overflow-hidden group rounded-2xl">
              <CardContent className="p-0 relative">
                <img 
                  src={teamPhoto} 
                  alt="Billig Elektriker certificerede elektrikere"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right - Feature Cards */}
          <div className="space-y-4 animate-fade-in flex flex-col justify-center">
            {/* Feature Card 1 */}
            <Card className="border border-border/60 shadow-md bg-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 rounded-xl">
              <CardContent className="p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1 text-foreground">{t('team.professionalQuality')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t('team.experiencedCraftsmen')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="border border-border/60 shadow-md bg-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 rounded-xl">
              <CardContent className="p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1 text-foreground">{t('team.readyForTask')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t('team.allSizes')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Button */}
            <Button 
              size="lg" 
              className="w-full group mt-2 h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>{t('team.cta')}</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
