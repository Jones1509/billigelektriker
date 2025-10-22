import { ArrowRight } from "lucide-react";
import iconSecurity from "@/assets/icon-security.webp";
import iconQuality from "@/assets/icon-quality.webp";
import iconPunctuality from "@/assets/icon-punctuality.webp";
import iconGuarantee from "@/assets/icon-guarantee.webp";

const WhyChooseUs = () => {
  const features = [
    {
      icon: iconSecurity,
      title: "Tryghed via sikkerhed.",
      description: "Installationer udføres efter reglerne, gennemgås sammen med dig og dokumenteres."
    },
    {
      icon: iconQuality,
      title: "Lav pris. Høj kvalitet.",
      description: "Materialer vi stoler på, pænt håndværk og ordentlig finish – løsninger der holder længe."
    },
    {
      icon: iconPunctuality,
      title: "Punktlighed. Til tiden.",
      description: "Vi kommer til tiden, giver besked ved ændringer – effektivt, så din plan holder."
    },
    {
      icon: iconGuarantee,
      title: "Garanti sort på hvidt.",
      description: "Klare aftaler og garanti på arbejdet – du får det på skrift og kan regne med resultatet."
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      {/* Subtle electrical circuit background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h20v20h20v20h-20v20h-20v-20h-20v-20h20z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="30" cy="30" r="2" fill="currentColor" />
              <circle cx="70" cy="70" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Derfor Vælger Kunderne Os
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-xl p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl border border-border/50"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  className="w-16 h-16 lg:w-20 lg:h-20 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Arrow Button */}
              <div className="flex justify-center">
                <button className="group/btn relative w-12 h-12 rounded-full bg-primary flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-primary/50">
                  <ArrowRight className="w-5 h-5 text-primary-foreground transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
