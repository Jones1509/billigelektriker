import { Button } from "./ui/button";
import { Phone, Sparkles, Zap } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "./ui/card";

export const TeamSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Background matching ServiceColumns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.04),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(34,197,94,0.04),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-12 animate-fade-in px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('team.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('team.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0 max-w-5xl mx-auto">
          {/* Left - Image Card */}
          <Card className="border-0 shadow-lg overflow-hidden animate-fade-in group">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={teamPhoto} 
                  alt="Billig Elektriker team"
                  className="w-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
              </div>
            </CardContent>
          </Card>

          {/* Right - Info Cards */}
          <div className="space-y-4 animate-fade-in flex flex-col justify-center">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 group hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Professionel kvalitet</h4>
                    <p className="text-sm text-muted-foreground">Erfarne håndværkere med passion for dit projekt</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 dark:from-gray-900 dark:to-green-950/20 group hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-secondary to-green-600 rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Klar til opgaven</h4>
                    <p className="text-sm text-muted-foreground">Vi tager opgaver af alle størrelser - hurtigt og effektivt</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full group mt-2"
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
