import { Button } from "./ui/button";
import { Calendar, Phone, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";

export const BookingCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative py-16 md:py-20 bg-[#F8FAFC] dark:bg-gray-950">
      {/* Smooth top transition */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
      
      {/* Smooth bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-[800px] mx-auto">
          {/* Centered Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-lg p-10 md:p-14 text-center">
            
            {/* Badge */}
            <Badge 
              variant="outline" 
              className="mb-6 px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-primary/10 text-primary border-primary/30 rounded-full"
            >
              Gratis Rådgivning
            </Badge>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight max-w-[600px] mx-auto">
              {t('bookingCta.title')}
            </h2>

            {/* Subtext */}
            <p className="text-base md:text-lg text-muted-foreground mb-9 leading-relaxed max-w-[550px] mx-auto">
              {t('bookingCta.subtitle')}
            </p>

            {/* Trust Bullets - Inline on Desktop, Stacked on Mobile */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-6 mb-9 text-left md:text-center">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  {t('bookingCta.trustPoints.certified')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  {t('bookingCta.trustPoints.noCommitment')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm md:text-base text-foreground font-medium">
                  {t('bookingCta.trustPoints.sameDay')}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t('bookingCta.bookCall')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 font-bold text-base md:text-lg px-8 py-6 rounded-xl transition-all"
              >
                <Phone className="mr-2 h-5 w-5" />
                {t('bookingCta.callNow')}
              </Button>
            </div>

            {/* Small text under buttons */}
            <p className="text-xs md:text-sm text-muted-foreground/80 mt-5">
              {t('bookingCta.badges')}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};
