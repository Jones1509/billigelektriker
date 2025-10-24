import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Zap, Shield, Gift, Mail } from "lucide-react";

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
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container relative max-w-5xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* Left side - Value proposition */}
            <div className="p-8 md:p-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
              {/* Subtle circuit pattern overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <Zap className="w-full h-full" strokeWidth={1} />
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-emerald-400/30">
                  <Gift className="w-4 h-4" />
                  <span>Eksklusivt Tilbud</span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                    Spar 10% på Din Næste El-service
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed">
                    Tilmeld dig vores nyhedsbrev og modtag værdifulde el-tips, 
                    sikkerhedsråd og eksklusive tilbud direkte i din indbakke.
                  </p>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-sm text-slate-300">
                      Praktiske råd fra certificerede elektrikere
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-sm text-slate-300">
                      Tidlig adgang til sæsontilbud og kampagner
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-sm text-slate-300">
                      Kun relevant indhold – max én mail om måneden
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Få din rabatkode</h4>
                    <p className="text-sm text-slate-600">Gælder både private og erhverv</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Din email adresse"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 px-4 bg-white border-2 border-slate-200 focus:border-primary rounded-lg text-base transition-all"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Få 10% Rabatkode Nu
                  </Button>
                </form>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>Ingen spam – afmeld når som helst</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Vi respekterer din privatliv og sender kun relevant information 
                    om el-services, sikkerhed og tilbud.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
