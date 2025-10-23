import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Gift } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const NewsletterCTA = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(t('newsletter.successTitle'), {
        description: t('newsletter.successDescription'),
        position: "top-center"
      });
      setEmail("");
    }
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-primary via-blue-600 to-primary text-primary-foreground relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.15),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
          <div className="inline-flex p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-2 md:mb-4 shadow-xl">
            <Gift className="h-8 w-8 md:h-10 md:w-10" />
          </div>
          
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {t('newsletter.title')}
            </h2>
            
            <p className="text-base md:text-xl text-primary-foreground/95 leading-relaxed">
              {t('newsletter.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-foreground h-12 md:h-14 px-4 md:px-6 text-base md:text-lg shadow-lg"
            />
            <Button type="submit" variant="secondary" size="lg" className="h-12 md:h-14 px-6 md:px-8 whitespace-nowrap shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold">
              {t('newsletter.cta')}
            </Button>
          </form>

          <div className="flex flex-wrap gap-4 md:gap-6 justify-center pt-4 text-xs md:text-sm text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t('newsletter.noSpam')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t('newsletter.maxOneMail')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{t('newsletter.unsubscribe')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
