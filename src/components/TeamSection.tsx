import { Button } from "./ui/button";
import { Phone, Sparkles, Zap, ArrowRight, Star, Users } from "lucide-react";
import teamPhoto from "@/assets/team-photo-ai.jpg";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "./ui/card";

export const TeamSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Enhanced Background with smooth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-blue-tint/50"></div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230066ff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>
      
      {/* Smooth fade-out gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-blue-tint pointer-events-none z-[5]"></div>
      
      {/* Decorative gradient blobs */}
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-48 -left-48 w-80 h-80 bg-secondary/6 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('team.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('team.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 md:gap-12 lg:gap-20 px-4 md:px-0 max-w-6xl mx-auto items-center">
          {/* Left - Clean Image with Subtle Decorative Elements */}
          <div className="relative animate-fade-in">
            {/* Decorative background elements */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary to-blue-400 rounded-full opacity-15 blur-2xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-secondary to-green-400 rounded-full opacity-10 blur-2xl -z-10"></div>
            
            <Card className="border-0 shadow-2xl overflow-hidden group rounded-3xl">
              <CardContent className="p-0 relative">
                <img 
                  src={teamPhoto} 
                  alt="Billig Elektriker certificerede elektrikere"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none"></div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Enhanced Feature Cards */}
          <div className="space-y-6 animate-fade-in flex flex-col justify-center">
            {/* Feature Card 1 - Blue */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-blue-900/10 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden rounded-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400"></div>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-500 rounded-2xl opacity-15 rotate-6"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 text-foreground">{t('team.professionalQuality')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t('team.experiencedCraftsmen')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Card 2 - Green */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white via-green-50/30 to-green-100/20 dark:from-gray-900 dark:via-green-950/20 dark:to-green-900/10 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden rounded-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-green-400"></div>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-green-500 rounded-2xl opacity-15 rotate-6"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2 text-foreground">{t('team.readyForTask')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t('team.allSizes')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced CTA Button */}
            <Button 
              size="lg" 
              className="w-full group mt-4 h-14 text-base font-bold rounded-2xl bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <Phone className="mr-2 h-5 w-5 relative z-10" />
              <span className="relative z-10">{t('team.cta')}</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
