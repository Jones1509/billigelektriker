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
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]"></div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 animate-fade-in px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            {t('serviceColumns.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('serviceColumns.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0 max-w-6xl mx-auto">
          {/* Private Column */}
          <div className="space-y-5 animate-fade-in">
            {/* Column Header */}
            <div className="text-center md:text-left mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 border border-primary/20">
                <Home className="h-4 w-4" />
                {t('serviceColumns.private.badge')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('serviceColumns.private.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('serviceColumns.private.subtitle')}
              </p>
            </div>

            {/* Service Cards */}
            <div className="space-y-3">
              {privateServices.map((service, idx) => (
                <Card 
                  key={idx} 
                  className="group border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 bg-card overflow-hidden"
                >
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-base mb-0.5 group-hover:text-primary transition-colors">{service.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Business Column */}
          <div className="space-y-5 animate-fade-in">
            {/* Column Header */}
            <div className="text-center md:text-left mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-3 border border-secondary/20">
                <Building className="h-4 w-4" />
                {t('serviceColumns.business.badge')}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('serviceColumns.business.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('serviceColumns.business.subtitle')}
              </p>
            </div>

            {/* Service Cards */}
            <div className="space-y-3">
              {businessServices.map((service, idx) => (
                <Card 
                  key={idx} 
                  className="group border border-border/50 hover:border-secondary/30 shadow-sm hover:shadow-md transition-all duration-300 bg-card overflow-hidden"
                >
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-green-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-base mb-0.5 group-hover:text-secondary transition-colors">{service.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
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
