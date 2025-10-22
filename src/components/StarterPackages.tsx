import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Star } from "lucide-react";

const packages = [
  {
    name: "Start-pakke",
    price: "999",
    description: "Perfekt til at komme i gang med smart lys",
    features: [
      "2x E27 RGB-pærer",
      "1x trådløs switch",
      "Gratis app til iOS & Android",
      "Nem installation"
    ],
    badge: null
  },
  {
    name: "Udvidelses-pakke",
    price: "1.799",
    description: "Udvid din smarte belysning til flere rum",
    features: [
      "4x E27 RGB-pærer",
      "2x trådløse switches",
      "1x bevægelsessensor",
      "Timer-funktioner"
    ],
    badge: "Mest populære"
  },
  {
    name: "Komplet-pakke",
    price: "2.499",
    description: "Alt du behøver til indendørs og udendørs",
    features: [
      "6x E27 RGB-pærer",
      "3x trådløse switches",
      "2x bevægelsessensorer",
      "4x udendørs spots (IP65)"
    ],
    badge: "IP65"
  }
];

export const StarterPackages = () => {
  return (
    <section 
      className="py-20" 
      style={{ backgroundColor: 'hsl(var(--blue-tint))' }}
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kom i gang med smart lys – nemt og hurtigt
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vælg den pakke der passer til dit behov
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <Card 
              key={idx} 
              className={`flex flex-col relative ${pkg.badge === "Mest populære" ? "border-2 border-primary shadow-lg" : ""}`}
            >
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground px-4 py-1">
                    {pkg.badge === "Mest populære" ? (
                      <><Star className="h-3 w-3 mr-1 inline" />{pkg.badge}</>
                    ) : (
                      pkg.badge
                    )}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-muted-foreground"> kr.</span>
                </div>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button className="w-full" size="lg">
                  Køb nu
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
