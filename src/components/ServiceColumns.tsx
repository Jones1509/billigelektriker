import { Home, Building, Lightbulb, Plug, FileCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const privateServices = [
  {
    icon: Lightbulb,
    title: "Smart Home",
    description: "Intelligente løsninger til dit hjem"
  },
  {
    icon: Plug,
    title: "Ladestander",
    description: "El-bil opladning installeret professionelt"
  },
  {
    icon: Home,
    title: "Boliginstallationer",
    description: "Komplette el-installationer"
  }
];

const businessServices = [
  {
    icon: Building,
    title: "Tavlearbejde",
    description: "Professionelle tavleinstallationer"
  },
  {
    icon: FileCheck,
    title: "Serviceaftaler",
    description: "Kontinuerlig vedligeholdelse"
  },
  {
    icon: Users,
    title: "Udlejning",
    description: "Elektrikere til erhverv"
  }
];

export const ServiceColumns = () => {
  return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden">
      {/* Premium background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.05),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-16 animate-fade-in px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            El-service til alle
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Uanset om du er privat eller erhverv – vi har løsningen
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-0">
          {/* Private */}
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
                <Home className="h-4 w-4" />
                Private
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">El-service til private</h3>
              <p className="text-muted-foreground">
                Fra fejlfinding til smarte løsninger i dit hjem.
              </p>
            </div>

            <div className="grid gap-4">
              {privateServices.map((service, idx) => (
                <Card key={idx} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="relative flex items-start gap-4 p-6">
                    <div className="p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{service.title}</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Business */}
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4 border border-secondary/20">
                <Building className="h-4 w-4" />
                Erhverv
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">El-service til erhverv</h3>
              <p className="text-muted-foreground">
                Stabile installationer til butik, kontor og produktion.
              </p>
            </div>

            <div className="grid gap-4">
              {businessServices.map((service, idx) => (
                <Card key={idx} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-900 dark:to-green-950/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="relative flex items-start gap-4 p-6">
                    <div className="p-3 bg-gradient-to-br from-secondary to-green-600 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 group-hover:text-secondary transition-colors">{service.title}</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{service.description}</p>
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
