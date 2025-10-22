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
      className="py-12 md:py-24 relative overflow-hidden" 
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--blue-tint)) 100%)' }}
    >
      {/* Premium background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-16 animate-fade-in px-4">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-primary/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4 border border-purple-500/20">
            ✨ Smarte Pakkeløsninger
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Kom i gang med smart lys – <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-primary">nemt og hurtigt</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Vælg den pakke der passer til dit behov – alt er inkluderet
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {packages.map((pkg, idx) => (
            <Card 
              key={idx} 
              className={`group flex flex-col relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 overflow-hidden animate-fade-in ${pkg.badge === "Mest populære" ? "ring-2 ring-primary/50" : ""}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className={`${pkg.badge === "Mest populære" ? "bg-gradient-to-r from-purple-600 to-primary shadow-lg" : "bg-primary"} text-white px-4 py-1.5 text-sm font-semibold`}>
                    {pkg.badge === "Mest populære" ? (
                      <><Star className="h-3 w-3 mr-1 inline fill-white" />{pkg.badge}</>
                    ) : (
                      pkg.badge
                    )}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="relative text-center pb-6 pt-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{pkg.price}</span>
                  <span className="text-muted-foreground text-lg"> kr.</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
              </CardHeader>

              <CardContent className="relative flex-grow">
                <ul className="space-y-3">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="p-1 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="relative pt-6">
                <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg" size="lg">
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
