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
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Deep electrician blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3D] via-[#0D2847] to-[#1a365d]" />
      
      {/* Subtle circuit pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-white" />
              <circle cx="90" cy="90" r="1.5" fill="currentColor" className="text-white" />
              <line x1="10" y1="10" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-white" />
              <line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-white" />
              <line x1="50" y1="50" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" className="text-white" />
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
              {t('newsletter.title')}
            </h2>
            
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
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
              className="bg-white/95 backdrop-blur-sm text-foreground h-12 md:h-14 px-5 md:px-6 text-base md:text-lg border-white/20 focus:border-white/40 shadow-lg rounded-xl transition-all duration-300 focus:shadow-xl"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="h-12 md:h-14 px-6 md:px-8 whitespace-nowrap shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold text-base rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 hover:scale-105"
            >
              {t('newsletter.cta')}
            </Button>
          </form>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 justify-center pt-2 text-sm text-white/60">
            <div className="flex items-center gap-2 group">
              <svg className="h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="font-light">{t('newsletter.noSpam')}</span>
            </div>
            <div className="flex items-center gap-2 group">
              <svg className="h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="font-light">{t('newsletter.maxOneMail')}</span>
            </div>
            <div className="flex items-center gap-2 group">
              <svg className="h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span className="font-light">{t('newsletter.unsubscribe')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
