import { Button } from "./ui/button";
import { Calendar, Phone, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import teamPhoto from "@/assets/team-photo-branded.jpg";

export const BookingCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Split-screen layout */}
          <div className="grid lg:grid-cols-2 gap-0 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl">
            
            {/* Left Side - Image */}
            <div className="relative h-[350px] lg:h-auto min-h-[500px]">
              <img 
                src={teamPhoto} 
                alt="Billig Elektriker team" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
              
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 w-fit">
                <Check className="h-4 w-4" />
                Gratis Rådgivning
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {t('bookingCta.title')}
              </h2>

              {/* Subtext */}
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
                {t('bookingCta.subtitle')}
              </p>

              {/* Trust Elements */}
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-3 text-foreground">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">{t('bookingCta.trustPoints.certified')}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">{t('bookingCta.trustPoints.noCommitment')}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-base">{t('bookingCta.trustPoints.sameDay')}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('bookingCta.bookCall')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 font-semibold transition-all"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('bookingCta.callNow')}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" />
                <span>{t('bookingCta.badges')}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
