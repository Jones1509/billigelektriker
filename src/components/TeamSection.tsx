import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";

export const TeamSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Mød holdet bag Billig Elektriker
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Billig Elektriker startede med en simpel idé: At levere professionel el-service til ærlige priser – uden at gå på kompromis med kvaliteten. Vi er et ungt, dynamisk team med certificeringer i orden, og vi elsker at løse vores kunders problemer – fra den mindste fejlfinding til store installationsprojekter.
            </p>
            <Button size="lg" className="group">
              <Phone className="mr-2 h-4 w-4" />
              Ring til os i dag
            </Button>
          </div>

          <div className="relative">
            <img 
              src={teamPhoto} 
              alt="Billig Elektriker team"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
