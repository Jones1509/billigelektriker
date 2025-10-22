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
    <section className="py-12 md:py-24 pb-0 bg-gradient-to-b from-background to-blue-50/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-16 animate-fade-in px-4">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            💎 Vores Værdier
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Derfor vælger kunderne os
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Professionalisme, fair priser og tryghed – hver eneste gang.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
          {values.map((value, idx) => (
            <div 
              key={idx} 
              className="group text-center space-y-3 md:space-y-4 p-4 md:p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="inline-flex p-3 md:p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <value.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="font-bold text-base md:text-xl group-hover:text-primary transition-colors">{value.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
