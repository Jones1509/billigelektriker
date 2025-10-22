import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Zap, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const ServiceBoxes = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-background via-blue-50/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-16 animate-fade-in px-4">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Vores Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Hvad kan vi hjælpe dig med?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Fra små reparationer til store projekter – vi er klar til at hjælpe
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0">
          <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-900 dark:to-blue-950/30">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <CardContent className="relative p-6 md:p-10 lg:p-14 flex flex-col items-start h-full">
              <div className="mb-6 md:mb-8 p-4 md:p-5 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Zap className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors">
                El-arbejde
              </h3>
              <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 flex-grow leading-relaxed">
                Professionelt el-arbejde – fra stikkontakter til store installationer. Certificeret og trygt.
              </p>
              <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-md hover:shadow-lg">
                <Link to="/services">
                  Læs mere
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50/50 dark:from-gray-900 dark:to-green-950/30">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-500"></div>
            
            <CardContent className="relative p-6 md:p-10 lg:p-14 flex flex-col items-start h-full">
              <div className="mb-6 md:mb-8 p-4 md:p-5 bg-gradient-to-br from-secondary to-green-600 rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <ShoppingBag className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 group-hover:text-secondary transition-colors">
                El-produkter
              </h3>
              <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 flex-grow leading-relaxed">
                Køb el-dele direkte hos os. Stikkontakter, kabler, belysning og meget mere.
              </p>
              <Button variant="outline" asChild className="group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-300 shadow-md hover:shadow-lg">
                <Link to="/#products">
                  Se produkter
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
