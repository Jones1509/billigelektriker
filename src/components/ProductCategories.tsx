import { Card, CardContent } from "./ui/card";
import { Home, Sun, Lightbulb, Plug } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Home,
    title: "Indendørs Lys",
    description: "Skab den perfekte hygge derhjemme",
    link: "/collections/indendors-lys",
    color: "primary"
  },
  {
    icon: Sun,
    title: "Udendørs Lys",
    description: "Robust belysning til have og terrasse",
    link: "/collections/udendors-lys",
    color: "accent"
  },
  {
    icon: Lightbulb,
    title: "Smart Home",
    description: "Intelligente løsninger til hele hjemmet",
    link: "/collections/smart-home",
    color: "primary"
  },
  {
    icon: Plug,
    title: "Stikkontakter & Tilbehør",
    description: "Alt du behøver til installationen",
    link: "/collections/tilbehor",
    color: "accent"
  }
];

export const ProductCategories = () => {
  return (
    <section 
      className="py-20" 
      style={{ backgroundColor: 'hsl(var(--blue-tint))' }}
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find det rigtige lys til dit projekt
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fra indendørs hygge til robust udendørs belysning – vi har det hele.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((category, idx) => (
            <Link key={idx} to={category.link}>
              <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer border-2 hover:border-primary">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className={`p-6 bg-${category.color}/10 rounded-full`}>
                    <category.icon className={`h-10 w-10 text-${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
