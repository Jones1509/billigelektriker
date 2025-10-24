import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
    <section className="py-16 md:py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-t border-slate-200/50">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              {t('newsletter.title')}
            </h3>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              {t('newsletter.subtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <Input 
              type="email" 
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 px-4 bg-white border-2 border-slate-200 focus:border-primary rounded-lg text-base"
            />
            <Button 
              type="submit" 
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 whitespace-nowrap"
            >
              {t('newsletter.cta')}
            </Button>
          </form>

          {/* Trust line */}
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>{t('newsletter.noSpam')} — {t('newsletter.unsubscribe')}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
