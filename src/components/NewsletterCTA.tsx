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
    <section className="py-8 md:py-12 relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Light glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.1),transparent_60%)]"></div>
      
      {/* Decorative left icon */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
        </svg>
      </div>
      
      {/* Decorative right icon */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 2a1 1 0 0 0-.894.553L7.382 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3.382l-.724-1.447A1 1 0 0 0 15 2H9zm3 5.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"/>
        </svg>
      </div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
          <div className="space-y-2 md:space-y-3">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              {t('newsletter.title')}
            </h2>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {t('newsletter.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <Input 
              type="email" 
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-gray-900 h-12 md:h-13 px-5 text-base rounded-xl border-2 border-gray-200 focus:border-primary shadow-sm focus:shadow-lg transition-all"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="h-12 md:h-13 px-6 md:px-8 whitespace-nowrap rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {t('newsletter.cta')}
            </Button>
          </form>

          <div className="flex flex-wrap gap-4 md:gap-6 justify-center pt-2 text-xs md:text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{t('newsletter.noSpam')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{t('newsletter.maxOneMail')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{t('newsletter.unsubscribe')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
