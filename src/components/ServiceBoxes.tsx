import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Zap, ShoppingBag, ArrowRight, Sparkles, Shield, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ServiceBoxes = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-50/40 to-background"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="container relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-12 md:mb-20 animate-fade-in px-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 shadow-lg shadow-primary/5">
            <Sparkles className="h-4 w-4" />
            {t('serviceBoxes.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
            {t('serviceBoxes.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('serviceBoxes.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 px-4 md:px-0 max-w-6xl mx-auto">
          {/* El-arbejde Card */}
          <Card className="group relative overflow-hidden border-2 border-primary/10 shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:-translate-y-3 bg-gradient-to-br from-white via-white to-blue-50/80 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/40 hover:border-primary/30">
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Floating particles effect */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" style={{ transitionDelay: '100ms' }}></div>
            
            <CardContent className="relative p-8 md:p-12 lg:p-14 flex flex-col items-start h-full">
              {/* Icon with glow */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative p-5 md:p-6 bg-gradient-to-br from-primary via-primary to-blue-600 rounded-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Zap className="h-10 w-10 md:h-12 md:w-12 text-white drop-shadow-lg" />
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                {t('serviceBoxes.electrical.title')}
              </h3>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-8 flex-grow leading-relaxed">
                {t('serviceBoxes.electrical.description')}
              </p>
              
              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Certificeret</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/5 border border-secondary/10">
                  <Clock className="h-3.5 w-3.5 text-secondary" />
                  <span className="text-xs font-medium text-secondary">Hurtig respons</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/5 border border-green-500/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs font-medium text-green-600">2 års garanti</span>
                </div>
              </div>
              
              <Button 
                asChild 
                size="lg"
                className="group/btn relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-700 border-0 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base font-semibold px-8"
              >
                <Link to="/services" className="flex items-center gap-2">
                  <span className="relative z-10">{t('serviceBoxes.electrical.cta')}</span>
                  <ArrowRight className="relative z-10 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* El-produkter Card */}
          <Card className="group relative overflow-hidden border-2 border-secondary/10 shadow-2xl hover:shadow-secondary/20 transition-all duration-700 hover:-translate-y-3 bg-gradient-to-br from-white via-white to-green-50/80 dark:from-gray-900 dark:via-gray-900 dark:to-green-950/40 hover:border-secondary/30">
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Floating particles effect */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-green-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" style={{ transitionDelay: '100ms' }}></div>
            
            <CardContent className="relative p-8 md:p-12 lg:p-14 flex flex-col items-start h-full">
              {/* Icon with glow */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-secondary/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative p-5 md:p-6 bg-gradient-to-br from-secondary via-secondary to-green-600 rounded-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <ShoppingBag className="h-10 w-10 md:h-12 md:w-12 text-white drop-shadow-lg" />
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 group-hover:text-secondary transition-colors duration-300">
                {t('serviceBoxes.products.title')}
              </h3>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-8 flex-grow leading-relaxed">
                {t('serviceBoxes.products.description')}
              </p>
              
              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/5 border border-secondary/10">
                  <Zap className="h-3.5 w-3.5 text-secondary" />
                  <span className="text-xs font-medium text-secondary">Gratis fragt over 750kr</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">Hurtig levering</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/5 border border-green-500/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-xs font-medium text-green-600">Kvalitetsprodukter</span>
                </div>
              </div>
              
              <Button 
                asChild 
                size="lg"
                className="group/btn relative overflow-hidden bg-gradient-to-r from-secondary to-green-600 hover:from-secondary hover:to-green-700 border-0 shadow-lg hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 text-base font-semibold px-8"
              >
                <Link to="/#products" className="flex items-center gap-2">
                  <span className="relative z-10">{t('serviceBoxes.products.cta')}</span>
                  <ArrowRight className="relative z-10 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
