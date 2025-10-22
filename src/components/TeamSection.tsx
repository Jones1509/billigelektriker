import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";

export const TeamSection = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-background via-green-50/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center px-4 md:px-0">
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold border border-secondary/20">
              Mød teamet
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Holdet bag <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Billig Elektriker</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Billig Elektriker startede med en simpel idé: At levere professionel el-service til ærlige priser – uden at gå på kompromis med kvaliteten. Vi er et ungt, dynamisk team med certificeringer i orden, og vi elsker at løse vores kunders problemer – fra den mindste fejlfinding til store installationsprojekter.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Certificeret</div>
                  <div className="text-sm text-muted-foreground">Autoriserede elektrikere</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-secondary/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Hurtig respons</div>
                  <div className="text-sm text-muted-foreground">Kontakt os i dag</div>
                </div>
              </div>
            </div>
            <Button size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
              <Phone className="mr-2 h-5 w-5" />
              Ring til os i dag
            </Button>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50"></div>
            <img 
              src={teamPhoto} 
              alt="Billig Elektriker team"
              className="relative rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
