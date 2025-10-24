import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Zap, Lightbulb, Award, Users, Shield } from "lucide-react";

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
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Light electric blue gradient background with glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC]" />
      
      {/* Radiant glow effects - light and energetic */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-400/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />
      
      {/* Subtle circuit pattern overlay - very light */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="light-circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="2" fill="currentColor" className="text-blue-600" />
              <circle cx="105" cy="105" r="2" fill="currentColor" className="text-blue-600" />
              <line x1="15" y1="15" x2="60" y2="15" stroke="currentColor" strokeWidth="0.8" className="text-blue-500" />
              <line x1="60" y1="15" x2="60" y2="60" stroke="currentColor" strokeWidth="0.8" className="text-blue-500" />
              <line x1="60" y1="60" x2="105" y2="105" stroke="currentColor" strokeWidth="0.8" className="text-blue-500" />
              <circle cx="60" cy="60" r="3" fill="currentColor" className="text-cyan-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#light-circuit)" />
        </svg>
      </div>

      {/* Decorative icons on the sides */}
      <div className="absolute top-1/4 left-[5%] opacity-10 text-blue-600 hidden lg:block">
        <Lightbulb className="w-24 h-24" strokeWidth={1.5} />
      </div>
      <div className="absolute top-1/3 right-[8%] opacity-10 text-cyan-600 hidden lg:block">
        <Zap className="w-20 h-20" strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-1/4 left-[8%] opacity-10 text-blue-500 hidden lg:block">
        <Zap className="w-16 h-16" strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-1/3 right-[6%] opacity-10 text-cyan-500 hidden lg:block">
        <Lightbulb className="w-20 h-20" strokeWidth={1.5} />
      </div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with more breathing room */}
          <div className="text-center space-y-5 mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight px-4">
              {t('newsletter.title')}
            </h2>
            
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-normal px-4">
              {t('newsletter.subtitle')}
            </p>
          </div>

          {/* Form - wider and more prominent */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10 px-4">
            <Input 
              type="email" 
              placeholder="Indtast din e-mail – få rabatten med det samme"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-slate-900 h-14 md:h-16 px-6 text-base md:text-lg border-2 border-slate-200 focus:border-cyan-500 shadow-md rounded-2xl transition-all duration-300 focus:shadow-xl focus:ring-4 focus:ring-cyan-200/50 placeholder:text-slate-400"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="h-14 md:h-16 px-8 md:px-10 whitespace-nowrap shadow-lg hover:shadow-2xl transition-all duration-300 font-semibold text-base md:text-lg rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white border-0 hover:scale-105 flex items-center gap-2 group"
            >
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t('newsletter.cta')}
            </Button>
          </form>

          {/* Trust badges - more prominent and professional */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto px-4">
            <div className="flex flex-col items-center gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <Award className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-slate-800 text-center">Certificeret elektriker</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-slate-800 text-center">Over 500 glade kunder</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold text-slate-800 text-center">Ingen spam – kun tips</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
