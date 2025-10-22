import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

export const BookingCTA = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Brug for hjælp til at vælge det rigtige lys?
          </h2>
          <p className="text-lg text-muted-foreground">
            Book en gratis 10-minutters samtale – vi hjælper dig med at finde den bedste løsning.
          </p>
          <Button size="lg" className="group">
            <Calendar className="mr-2 h-5 w-5" />
            Book gratis samtale
          </Button>
        </div>
      </div>
    </section>
  );
};
