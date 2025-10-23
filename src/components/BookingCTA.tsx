import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export const BookingCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-8 md:py-12 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(var(--blue-tint)) 0%, hsl(var(--blue-tint) / 0.5) 100%)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
            <CardContent className="relative p-6 md:p-8 text-center space-y-4 md:space-y-6">
              <div className="inline-flex p-4 md:p-6 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-xl">
                <Calendar className="h-8 w-8 md:h-12 md:w-12 text-white" />
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
                  {t('bookingCta.title')}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('bookingCta.subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4">
                <Button size="lg" className="w-full sm:w-auto group shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
                  <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t('bookingCta.bookCall')}
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-300">
                  <Phone className="mr-2 h-5 w-5" />
                  {t('bookingCta.callNow')}
                </Button>
              </div>

              <p className="text-xs md:text-sm text-muted-foreground pt-2 md:pt-4">
                {t('bookingCta.benefits')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
