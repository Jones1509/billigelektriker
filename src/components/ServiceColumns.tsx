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
    <section className="py-10 md:py-12 bg-background relative overflow-hidden">
      {/* Top smooth fade - removed since we have clean background */}
      
      {/* Very subtle gradient only */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 to-background pointer-events-none"></div>
      
      <div className="container relative z-10">
        {/* Centered header */}
        <div className="text-center mb-8 md:mb-10 animate-fade-in px-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            {t('serviceColumns.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('serviceColumns.subtitle')}
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 px-4 md:px-0 max-w-7xl mx-auto">
          {/* Private Column */}
          <div className="space-y-5 animate-fade-in">
            {/* Column Header */}
            <div className="text-center pb-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20 shadow-sm">
                <Home className="h-4 w-4" />
                {t('serviceColumns.private.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">{t('serviceColumns.private.title')}</h3>
              <p className="text-base text-muted-foreground max-w-md mx-auto">
                {t('serviceColumns.private.subtitle')}
              </p>
            </div>

            {/* Service Cards */}
            <div className="grid gap-3">
              {privateServices.map((service, idx) => (
                <Card 
                  key={idx} 
                  className="group border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 bg-card h-full"
                >
                  <CardContent className="relative flex items-center gap-3 p-5 h-full">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
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
          <div className="hidden lg:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-border/30"></div>

          {/* Business Column */}
          <div className="space-y-5 animate-fade-in">
            {/* Column Header */}
            <div className="text-center pb-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4 border border-secondary/20 shadow-sm">
                <Building className="h-4 w-4" />
                {t('serviceColumns.business.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">{t('serviceColumns.business.title')}</h3>
              <p className="text-base text-muted-foreground max-w-md mx-auto">
                {t('serviceColumns.business.subtitle')}
              </p>
            </div>

            {/* Service Cards */}
            <div className="grid gap-3">
              {businessServices.map((service, idx) => (
                <Card 
                  key={idx} 
                  className="group border border-border/60 hover:border-secondary/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 bg-card h-full"
                >
                  <CardContent className="relative flex items-center gap-3 p-5 h-full">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-base mb-1 group-hover:text-secondary transition-colors">
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
