import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Zap, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const ServiceBoxes = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-8 md:p-12 flex flex-col items-start h-full">
              <div className="mb-6 p-4 bg-primary/10 rounded-full">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">El-arbejde</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Professionelt el-arbejde – fra stikkontakter til store installationer.
              </p>
              <Button variant="outline" asChild>
                <Link to="/services">Læs mere</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-8 md:p-12 flex flex-col items-start h-full">
              <div className="mb-6 p-4 bg-accent/10 rounded-full">
                <ShoppingBag className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">El-produkter</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Køb el-dele direkte hos os. Stikkontakter, kabler, belysning m.m.
              </p>
              <Button variant="outline" asChild>
                <Link to="/#products">Se produkter</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
