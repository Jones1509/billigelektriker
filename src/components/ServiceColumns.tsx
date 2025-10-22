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
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Private */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-3">El-service til private</h2>
              <p className="text-muted-foreground">
                Fra fejlfinding til smarte løsninger i dit hjem.
              </p>
            </div>

            <div className="grid gap-4">
              {privateServices.map((service, idx) => (
                <Card key={idx} className="border-l-4 border-l-primary">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Business */}
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-3">El-service til erhverv</h2>
              <p className="text-muted-foreground">
                Stabile installationer til butik, kontor og produktion.
              </p>
            </div>

            <div className="grid gap-4">
              {businessServices.map((service, idx) => (
                <Card key={idx} className="border-l-4 border-l-accent">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
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
