import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export const StarterPackages = () => {
  const { t } = useTranslation();
  
  const packages = [
    {
      name: t('starterPackages.starter.name'),
      price: t('starterPackages.starter.price'),
      description: t('starterPackages.starter.description'),
      features: t('starterPackages.starter.features', { returnObjects: true }) as string[],
      perfectFor: t('starterPackages.starter.perfectFor'),
      popular: false
    },
    {
      name: t('starterPackages.expansion.name'),
      price: t('starterPackages.expansion.price'),
      description: t('starterPackages.expansion.description'),
      features: t('starterPackages.expansion.features', { returnObjects: true }) as string[],
      perfectFor: t('starterPackages.expansion.perfectFor'),
      popular: true
    },
    {
      name: t('starterPackages.complete.name'),
      price: t('starterPackages.complete.price'),
      description: t('starterPackages.complete.description'),
      features: t('starterPackages.complete.features', { returnObjects: true }) as string[],
      perfectFor: t('starterPackages.complete.perfectFor'),
      popular: false
    }
  ];

  return (
    <section 
      className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-b from-background via-gray-50/30 to-background dark:via-gray-900/30"
    >
      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in px-4">
          <span className="inline-block px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium mb-6 border border-blue-500/30">
            {t('starterPackages.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">
            {t('starterPackages.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {t('starterPackages.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {packages.map((pkg, idx) => (
            <Card 
              key={idx} 
              className="group flex flex-col relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in rounded-[20px]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-block px-5 py-2 rounded-full bg-[#FFB800] text-[#1E293B] text-xs font-bold shadow-lg">
                    {t('starterPackages.mostPopular')}
                  </span>
                </div>
              )}
              
              <CardHeader className="relative text-center pb-6 pt-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{pkg.name}</h3>
                <div className="mb-3">
                  <span className="text-5xl md:text-6xl font-extrabold text-[#0EA5E9]">{pkg.price}</span>
                  <span className="text-muted-foreground text-xl font-normal"> kr.</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">{pkg.description}</p>
              </CardHeader>

              <CardContent className="relative flex-grow px-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
                  {t('starterPackages.includes')}
                </p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="p-1 bg-[#0EA5E9]/10 rounded-full flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-[#0EA5E9]" />
                      </div>
                      <span className="text-sm text-foreground/80 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-5 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">
                    {pkg.perfectFor}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="relative pt-6 px-6 pb-6 flex flex-col items-center">
                <Button 
                  className={`w-full text-base font-bold rounded-xl py-6 shadow-[0_2px_8px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_12px_rgba(14,165,233,0.4)] transition-all duration-200 hover:-translate-y-0.5 ${
                    pkg.popular 
                      ? 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white' 
                      : 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white'
                  }`}
                  size="lg"
                >
                  {t('starterPackages.cta')}
                </Button>
                <p className="text-xs text-muted-foreground/60 mt-3 text-center">
                  {t('starterPackages.vatIncluded')}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
