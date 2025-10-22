import { Shield, DollarSign, Clock, FileCheck } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Tryghed via sikkerhed",
    description: "Autoriserede elektrikere med alle certificeringer i orden"
  },
  {
    icon: DollarSign,
    title: "Lav pris, høj kvalitet",
    description: "Fair priser uden skjulte omkostninger"
  },
  {
    icon: Clock,
    title: "Punktlighed til tiden",
    description: "Vi møder op som aftalt – hver gang"
  },
  {
    icon: FileCheck,
    title: "Garanti sort på hvidt",
    description: "12 måneders garanti på arbejdet, 2 års reklamationsret"
  }
];

export const ValuesSection = () => {
  return (
    <section className="py-20 pb-0 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Derfor vælger kunderne os
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professionalisme, fair priser og tryghed – hver eneste gang.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="text-center space-y-4">
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
