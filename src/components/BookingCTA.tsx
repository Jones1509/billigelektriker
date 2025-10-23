import { Button } from "./ui/button";
import { Calendar, Phone, Check, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";

export const BookingCTA = () => {
  const { t } = useTranslation();
  
  return (
    <section 
      className="py-12 md:py-16 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #FFFFFF 100%)'
      }}
    >
      {/* Smooth top transition */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(var(--blue-tint))] to-transparent pointer-events-none z-0"></div>
      
      {/* Smooth bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(var(--blue-tint))] via-transparent to-transparent pointer-events-none z-0"></div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Premium card with hover effect */}
          <div 
            className="group relative rounded-[32px] p-12 md:p-16 lg:p-20 text-center transition-all duration-500 hover:-translate-y-1"
            style={{ 
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.12)';
              e.currentTarget.style.border = '2px solid rgba(14,165,233,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
              e.currentTarget.style.border = '2px solid transparent';
            }}
          >
            {/* Glow accent in corner */}
            <div 
              className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ 
                boxShadow: '0 0 16px rgba(14,165,233,0.6)'
              }}
            />
            
            {/* Premium badge with gradient and blur */}
            <div className="inline-flex items-center justify-center mb-5">
              <Badge 
                className="px-6 py-2.5 text-[13px] uppercase tracking-[0.15em] font-bold rounded-full border-2 backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(90deg, rgba(14,165,233,0.15), rgba(139,92,246,0.15))',
                  borderColor: 'rgba(14,165,233,0.4)',
                  boxShadow: '0 4px 12px rgba(14,165,233,0.15)',
                  color: '#0369A1'
                }}
              >
                <Zap className="h-4 w-4 mr-2 text-yellow-500" fill="#FFB800" />
                Gratis Rådgivning
              </Badge>
            </div>

            {/* Bold heading with gradient text */}
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-[1.15] max-w-3xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}
            >
              {t('bookingCta.title')}
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              {t('bookingCta.subtitle')}
            </p>

            {/* Premium trust points with gradient checkmarks */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 md:gap-10 mb-8">
              <div className="flex items-center gap-3">
                <div 
                  className="flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)',
                    boxShadow: '0 3px 8px rgba(14,165,233,0.25)'
                  }}
                >
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-base md:text-lg text-gray-900 dark:text-gray-100 font-semibold">
                  {t('bookingCta.trustPoints.certified')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)',
                    boxShadow: '0 3px 8px rgba(14,165,233,0.25)'
                  }}
                >
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-base md:text-lg text-gray-900 dark:text-gray-100 font-semibold">
                  {t('bookingCta.trustPoints.noCommitment')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div 
                  className="flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #0EA5E9, #3B82F6)',
                    boxShadow: '0 3px 8px rgba(14,165,233,0.25)'
                  }}
                >
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-base md:text-lg text-gray-900 dark:text-gray-100 font-semibold">
                  {t('bookingCta.trustPoints.sameDay')}
                </span>
              </div>
            </div>

            {/* Premium CTA Buttons with gradients */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-white font-bold text-lg px-10 py-7 rounded-xl transition-all duration-300 hover:scale-[1.02] border-0"
                style={{
                  background: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
                  boxShadow: '0 6px 20px rgba(14,165,233,0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0EA5E9, #0369A1)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,165,233,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0EA5E9, #0284C7)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(14,165,233,0.35)';
                }}
              >
                <Calendar className="mr-3 h-5 w-5" />
                {t('bookingCta.bookCall')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-[3px] border-primary text-primary hover:bg-primary/8 font-bold text-lg px-10 py-7 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Phone className="mr-3 h-5 w-5" />
                {t('bookingCta.callNow')}
              </Button>
            </div>

            {/* Small text with icons */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Check 
                  className="h-3.5 w-3.5 text-primary" 
                  style={{ filter: 'drop-shadow(0 0 8px rgba(14,165,233,0.2))' }}
                />
                <span className="font-medium">Ingen forpligtelser</span>
              </div>
              <div className="flex items-center gap-2">
                <Check 
                  className="h-3.5 w-3.5 text-primary" 
                  style={{ filter: 'drop-shadow(0 0 8px rgba(14,165,233,0.2))' }}
                />
                <span className="font-medium">Gratis rådgivning</span>
              </div>
              <div className="flex items-center gap-2">
                <Check 
                  className="h-3.5 w-3.5 text-primary" 
                  style={{ filter: 'drop-shadow(0 0 8px rgba(14,165,233,0.2))' }}
                />
                <span className="font-medium">Få svar med det samme</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group > div:first-child {
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }
      `}</style>
    </section>
  );
};
