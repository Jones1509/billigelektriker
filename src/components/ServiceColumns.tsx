import { Home, Building, Lightbulb, Plug, FileCheck, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";

export const ServiceColumns = () => {
  const { t } = useTranslation();
  
  const privateServices = [
    {
      icon: Lightbulb,
      title: t('serviceColumns.private.smartHome.title'),
      description: t('serviceColumns.private.smartHome.description')
    },
    {
      icon: Plug,
      title: t('serviceColumns.private.charging.title'),
      description: t('serviceColumns.private.charging.description')
    },
    {
      icon: Home,
      title: t('serviceColumns.private.installation.title'),
      description: t('serviceColumns.private.installation.description')
    }
  ];

  const businessServices = [
    {
      icon: Building,
      title: t('serviceColumns.business.panelWork.title'),
      description: t('serviceColumns.business.panelWork.description')
    },
    {
      icon: FileCheck,
      title: t('serviceColumns.business.serviceAgreements.title'),
      description: t('serviceColumns.business.serviceAgreements.description')
    },
    {
      icon: Users,
      title: t('serviceColumns.business.rental.title'),
      description: t('serviceColumns.business.rental.description')
    }
  ];
  
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-blue-tint via-muted/30 to-background">
      {/* Smooth fade-in at top - matches TeamSection fade-out */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-tint to-transparent pointer-events-none z-[5]"></div>
      
      {/* Smooth fade-out at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background pointer-events-none z-[5]"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.08),transparent_50%)]"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }}></div>
      
      <div className="container relative z-10">
        {/* Centered header with improved typography */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in px-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            {t('serviceColumns.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('serviceColumns.subtitle')}
          </p>
        </div>

        {/* Two column layout with visual separator */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 px-4 md:px-0 max-w-7xl mx-auto">
          {/* Private Column */}
          <div className="space-y-6 animate-fade-in">
            {/* Column Header - Centered */}
            <div className="text-center pb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20 shadow-sm">
                <Home className="h-4 w-4" />
                {t('serviceColumns.private.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">{t('serviceColumns.private.title')}</h3>
              <p className="text-base text-muted-foreground max-w-md mx-auto">
                {t('serviceColumns.private.subtitle')}
              </p>
            </div>

            {/* Service Cards - Equal height */}
            <div className="grid gap-4">
              {privateServices.map((service, idx) => (
                <Card 
                  key={idx} 
                  className="group border border-border/60 hover:border-primary/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <CardContent className="relative flex items-center gap-4 p-6 h-full">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Visual Divider for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>

          {/* Business Column */}
          <div className="space-y-6 animate-fade-in">
            {/* Column Header - Centered */}
            <div className="text-center pb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4 border border-secondary/20 shadow-sm">
                <Building className="h-4 w-4" />
                {t('serviceColumns.business.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">{t('serviceColumns.business.title')}</h3>
              <p className="text-base text-muted-foreground max-w-md mx-auto">
                {t('serviceColumns.business.subtitle')}
              </p>
            </div>

            {/* Service Cards - Equal height */}
            <div className="grid gap-4">
              {businessServices.map((service, idx) => (
                <Card 
                  key={idx} 
                  className="group border border-border/60 hover:border-secondary/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <CardContent className="relative flex items-center gap-4 p-6 h-full">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1.5 group-hover:text-secondary transition-colors duration-300">
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
