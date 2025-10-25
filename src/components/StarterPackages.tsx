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
      features: t('starterPackages.starter.features', { returnObjects: true }) as string[]
    },
    {
      name: t('starterPackages.expansion.name'),
      price: t('starterPackages.expansion.price'),
      description: t('starterPackages.expansion.description'),
      features: t('starterPackages.expansion.features', { returnObjects: true }) as string[]
    },
    {
      name: t('starterPackages.complete.name'),
      price: t('starterPackages.complete.price'),
      description: t('starterPackages.complete.description'),
      features: t('starterPackages.complete.features', { returnObjects: true }) as string[]
    }
  ];

  return (
    <section 
      className="py-8 md:py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--blue-tint)) 100%)' }}
    >
      {/* Premium background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-10 animate-fade-in px-4">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-primary/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4 border border-purple-500/20">
            {t('starterPackages.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('starterPackages.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('starterPackages.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {packages.map((pkg, idx) => (
            <Card 
              key={idx} 
              className="group flex flex-col relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative text-center pb-4 md:pb-6 pt-4 md:pt-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">{pkg.name}</h3>
                <div className="mb-3 md:mb-4">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{pkg.price}</span>
                  <span className="text-muted-foreground text-base md:text-lg"> kr.</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
              </CardHeader>

              <CardContent className="relative flex-grow px-4 md:px-6">
                <ul className="space-y-2 md:space-y-3">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 md:gap-3">
                      <div className="p-1 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                      </div>
                      <span className="text-xs md:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="relative pt-4 md:pt-6 px-4 md:px-6">
                <Button className="w-full text-sm md:text-base group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg" size="lg">
                  {t('starterPackages.cta')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
