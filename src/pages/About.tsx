import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock, Users, Award, Heart } from "lucide-react";
import teamPhoto from "@/assets/team-photo.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-blue-600 to-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="container relative z-10 px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Om <span className="text-secondary">Billig Elektriker</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/95">
                Professionel el-service til fair priser – siden starten har vi sat kvalitet og kundetilfredshed i højsædet.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Vores historie</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Billig Elektriker startede med en simpel idé: At levere professionel el-service til ærlige priser – uden at gå på kompromis med kvaliteten. 
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Vi er et ungt, dynamisk team med alle certificeringer i orden, og vi elsker at løse vores kunders problemer – fra den mindste fejlfinding til store installationsprojekter. Vi tror på gennemsigtighed, pålidelighed og at levere arbejde, vi selv er stolte af.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="shadow-lg">
                    <Phone className="mr-2 h-5 w-5" />
                    Kontakt os
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-50"></div>
                <img 
                  src={teamPhoto} 
                  alt="Billig Elektriker team"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-blue-50/20">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Vores værdier</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Det der driver os hver dag
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Kvalitet og sikkerhed</h3>
                <p className="text-muted-foreground">
                  Autoriserede elektrikere med alle certificeringer i orden. Din sikkerhed er vores prioritet.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex p-4 bg-secondary/10 rounded-xl mb-4">
                  <Clock className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pålidelighed</h3>
                <p className="text-muted-foreground">
                  Vi møder op til tiden, holder vores aftaler og leverer som lovet – hver gang.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Kundefokus</h3>
                <p className="text-muted-foreground">
                  Din tilfredshed er vores succes. Vi lytter, rådgiver og finder den bedste løsning for dig.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex p-4 bg-secondary/10 rounded-xl mb-4">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Faglig stolthed</h3>
                <p className="text-muted-foreground">
                  Vi tager håndværket seriøst og leverer arbejde, vi selv er stolte af.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Passion</h3>
                <p className="text-muted-foreground">
                  Vi brænder for at løse problemer og skabe smarte løsninger til vores kunder.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex p-4 bg-secondary/10 rounded-xl mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Ærlighed</h3>
                <p className="text-muted-foreground">
                  Fair priser, ingen skjulte omkostninger og ærlig rådgivning om hvad du har brug for.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Klar til at arbejde sammen?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Kontakt os i dag for en uforpligtende snak om dit projekt
              </p>
              <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                <Phone className="mr-2 h-5 w-5" />
                Ring til os nu
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
