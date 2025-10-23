import { Button } from "./ui/button";
import { Calendar, Phone, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";

export const BookingCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Smooth top transition */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(var(--blue-tint))] to-transparent pointer-events-none z-0"></div>
      
      {/* Smooth bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(var(--blue-tint))] via-transparent to-transparent pointer-events-none z-0"></div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Clean centered card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-100 dark:border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-12 md:p-16 text-center">
            
            {/* Small badge */}
            <div className="inline-flex items-center justify-center mb-8">
              <Badge 
                className="px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full"
              >
                Gratis Rådgivning
              </Badge>
            </div>

            {/* Bold heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-[1.15] max-w-3xl mx-auto">
              {t('bookingCta.title')}
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              {t('bookingCta.subtitle')}
            </p>

            {/* Trust points - inline on desktop, stacked on mobile */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 mb-12">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" strokeWidth={3} />
                </div>
                <span className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
                  {t('bookingCta.trustPoints.certified')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" strokeWidth={3} />
                </div>
                <span className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
                  {t('bookingCta.trustPoints.noCommitment')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" strokeWidth={3} />
                </div>
                <span className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
                  {t('bookingCta.trustPoints.sameDay')}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-7 rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] transition-all duration-300"
              >
                <Calendar className="mr-3 h-5 w-5" />
                {t('bookingCta.bookCall')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 font-bold text-lg px-10 py-7 rounded-xl transition-all duration-300"
              >
                <Phone className="mr-3 h-5 w-5" />
                {t('bookingCta.callNow')}
              </Button>
            </div>

            {/* Small text under buttons */}
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('bookingCta.badges')}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};
