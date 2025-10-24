import { Check } from "lucide-react";

export const StarterPackages = () => {
  const packages = [
    {
      name: "Start-pakke",
      price: "2.499",
      tagline: "Perfekt til 1-2 rum – få den smarte oplevelse uden kompleksitet",
      features: [
        "1× Philips Hue Bridge (inkl. installation)",
        "2× E27 RGB smart-pærer",
        "1× Trådløs switch",
        "Gratis app-opsætning + instruktion"
      ],
      target: "Stue eller soveværelse",
      popular: false
    },
    {
      name: "Udvidelses-pakke",
      price: "3.999",
      tagline: "Dæk hele lejligheden med intelligent lys og automatisering",
      features: [
        "1× Philips Hue Bridge (inkl. installation)",
        "4× E27 RGB smart-pærer",
        "2× Trådløse switches",
        "1× Bevægelsessensor",
        "Timer-funktioner + scener",
        "Gratis app-opsætning + instruktion"
      ],
      target: "3-4 rum (hele lejlighed eller flere zoner)",
      popular: true
    },
    {
      name: "Komplet-pakke",
      price: "6.499",
      tagline: "Hele huset inklusive have – komplet smart home løsning",
      features: [
        "1× Philips Hue Bridge (inkl. installation)",
        "6× E27 RGB smart-pærer (indendørs)",
        "4× Udendørs smart spots (IP65)",
        "3× Trådløse switches",
        "2× Bevægelsessensorer",
        "Avanceret opsætning (zoner, scener, automation)",
        "Gratis app-instruktion + support i 30 dage"
      ],
      target: "Hele huset inkl. have/terrasse",
      popular: false
    }
  ];

  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Smart-Lys Pakker med Installation
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Inkluderer bridge, installation og opsætning af certificeret elektriker
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular 
                  ? 'shadow-2xl ring-2 ring-slate-900' 
                  : 'shadow-lg hover:shadow-xl ring-1 ring-slate-200'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Subtle Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                    Mest populær
                  </div>
                </div>
              )}

              <div className="p-8 lg:p-10">
                {/* Package Name */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-xl font-semibold text-slate-500">kr.</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm text-slate-600 leading-relaxed mb-8 min-h-[48px]">
                  {pkg.tagline}
                </p>

                {/* Divider */}
                <div className="h-px bg-slate-200 mb-8"></div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                    Indeholder
                  </h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-slate-700 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target */}
                <div className="mb-8 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-600 italic text-center">
                    {pkg.target}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3.5 rounded-lg font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Køb nu
                </button>
                <p className="text-xs text-slate-500 text-center mt-3">
                  Inkl. moms
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
