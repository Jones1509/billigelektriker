import { useState } from "react";
import { Check, Zap, Phone, Mail, Star, Crown } from "lucide-react";

export const StarterPackages = () => {
  const [customerType, setCustomerType] = useState<"privat" | "erhverv">("privat");
  const [timeType, setTimeType] = useState<"dagtimer" | "overarbejde" | "nat" | "akut">("dagtimer");

  // Base prices (daytime) - Private is ALWAYS cheaper than Business
  const basePrices = {
    standard: { privat: 510, erhverv: 550 },
    premium: { privat: 650, erhverv: 700 },
    exclusive: { privat: 850, erhverv: 900 }
  };

  // Time surcharges (same for all packages)
  const timeSurcharges = {
    dagtimer: 0,
    overarbejde: 200,
    nat: 600,
    akut: 400
  };

  // Calculate price for a package
  const calculatePrice = (packageType: "standard" | "premium" | "exclusive") => {
    const basePrice = basePrices[packageType][customerType];
    const surcharge = timeSurcharges[timeType];
    return basePrice + surcharge;
  };

  const timeTypeLabels = {
    dagtimer: "Dagtid (07-16)",
    overarbejde: "Aften (16-22)",
    nat: "Nat (22-07)",
    akut: "Akut"
  };

  const services = [
    {
      name: "Standard Service",
      badge: "Budget-venlig",
      description: "Grundlæggende professionelt arbejde",
      packageType: "standard" as const,
      features: [
        "Professionel autoriseret elektriker",
        "Vi laver ALLE typer el-arbejde",
        "Kvalitet og sikkerhed garanteret"
      ],
      notIncluded: [
        "Ingen garanti på arbejdet",
        "Normal ventetid (3-5 dage)",
        "Fuld pris på materialer",
        "Betaler transport (300 kr)"
      ],
      perfectFor: "Enkle opgaver hvor du ikke har behov for garanti",
      buttonText: "Book Nu",
      buttonIcon: "phone",
      featured: false,
      exclusive: false
    },
    {
      name: "Premium Pakke",
      badge: "Bedste værdi",
      description: "Samme arbejde + ekstra fordele",
      packageType: "premium" as const,
      features: [
        "2 års garanti på arbejdet",
        "Prioriteret booking (1-2 dage)",
        "10% rabat på materialer",
        "Gratis vedligeholdelse 1 gang om året",
        "SMS når vi er på vej",
        "Dokumentation på arbejdet"
      ],
      perfectFor: "Dig der vil have ro i sindet og ekstra sikkerhed",
      buttonText: "Vælg Premium",
      buttonIcon: "zap",
      featured: true,
      exclusive: false
    },
    {
      name: "Eksklusiv Pakke",
      badge: "VIP Service",
      description: "Samme arbejde + maksimale fordele",
      packageType: "exclusive" as const,
      features: [
        "5 års garanti på arbejdet",
        "VIP prioritering (samme/næste dag)",
        "20% rabat på materialer",
        "Gratis transport ALTID",
        "24/7 support hotline",
        "Dedikeret autoriseret elektriker",
        "Kvartalsvis gratis vedligeholdelse",
        "Gratis akut-besøg ved problemer",
        "Detaljeret foto-dokumentation"
      ],
      perfectFor: "Erhverv eller privatpersoner der vil have VIP behandling",
      buttonText: "Få VIP Status",
      buttonIcon: "mail",
      featured: false,
      exclusive: true
    }
  ];

  return (
    <section className="py-8 md:py-10 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1300px] mx-auto px-4 md:px-10">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 bg-primary/8 border border-primary/15 rounded-full text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-2 md:mb-3">
            <Zap className="w-3 h-3 md:w-3.5 md:h-3.5" />
            TRANSPARENTE PRISER
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight px-4">
            Vores Services & Priser
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
            Professionel el-service med klare, fair priser. Ingen skjulte omkostninger.
          </p>
        </div>

        {/* Price Controls */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Customer Type */}
            <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setCustomerType("privat")}
                className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  customerType === "privat"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Privat
              </button>
              <button
                onClick={() => setCustomerType("erhverv")}
                className={`px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  customerType === "erhverv"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Erhverv
              </button>
            </div>

            {/* Time Type */}
            <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setTimeType("dagtimer")}
                className={`px-2 md:px-3 py-2 rounded-lg text-[10px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                  timeType === "dagtimer"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Dag
              </button>
              <button
                onClick={() => setTimeType("overarbejde")}
                className={`px-2 md:px-3 py-2 rounded-lg text-[10px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                  timeType === "overarbejde"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Aften
              </button>
              <button
                onClick={() => setTimeType("nat")}
                className={`px-2 md:px-3 py-2 rounded-lg text-[10px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                  timeType === "nat"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Nat
              </button>
              <button
                onClick={() => setTimeType("akut")}
                className={`px-2 md:px-3 py-2 rounded-lg text-[10px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                  timeType === "akut"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Akut
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col gap-3 py-6 px-6 md:px-8 rounded-[20px] transition-all duration-500 ${
                service.featured
                  ? 'bg-gradient-to-br from-primary to-primary/90 text-white shadow-[0_24px_48px_rgba(0,102,255,0.25)] hover:shadow-[0_32px_64px_rgba(0,102,255,0.3)] hover:-translate-y-2 border-none'
                  : service.exclusive
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-amber-500/30 shadow-[0_24px_48px_rgba(251,191,36,0.15)] hover:shadow-[0_32px_64px_rgba(251,191,36,0.25)] hover:-translate-y-2'
                  : 'bg-white border border-slate-200 hover:border-primary/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]'
              } animate-fade-in`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Badge */}
              {service.featured && (
                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 md:px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-[0_4px_12px_rgba(255,215,0,0.4),0_0_0_3px_white] z-10">
                  <Star className="w-3 h-3 fill-slate-900" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-slate-900">Mest Valgt</span>
                </div>
              )}
              
              {service.exclusive && (
                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 md:px-4 py-1.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_4px_12px_rgba(251,191,36,0.5),0_0_0_3px_rgb(15,23,42)] z-10">
                  <Crown className="w-3 h-3 fill-slate-900" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-slate-900">VIP</span>
                </div>
              )}

              {/* Header */}
              <div className="text-center pt-1">
                <div className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold mb-2 ${
                  service.exclusive ? 'bg-amber-400/20 text-amber-300' : 
                  service.featured ? 'bg-white/20 text-white' : 
                  'bg-slate-100 text-slate-600'
                }`}>
                  {service.badge}
                </div>
                <h3 className={`text-lg md:text-xl font-extrabold mb-0.5 ${service.featured || service.exclusive ? 'text-white' : 'text-slate-900'}`}>
                  {service.name}
                </h3>
                <p className={`text-xs md:text-[13px] ${service.featured || service.exclusive ? 'text-white/90' : 'text-slate-600'}`}>
                  {service.description}
                </p>
              </div>

              {/* Price Section */}
              <div className={`text-center py-2.5 border-t border-b ${service.featured || service.exclusive ? 'border-white/20' : 'border-slate-200'}`}>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-3xl md:text-4xl font-black ${service.featured || service.exclusive ? 'text-white' : 'text-slate-900'}`}>
                    {calculatePrice(service.packageType)}
                  </span>
                  <span className={`text-base md:text-lg font-bold ${service.featured || service.exclusive ? 'text-white/90' : 'text-slate-600'}`}>
                    kr/time
                  </span>
                </div>
                
                <p className={`text-[10px] md:text-xs mt-0.5 ${service.featured || service.exclusive ? 'text-white/70' : 'text-slate-500'}`}>
                  {customerType === "privat" ? "Inkl. moms" : "Ekskl. moms"} · {timeTypeLabels[timeType]}
                </p>
              </div>

              {/* Features */}
              <div className="flex-grow mb-3">
                {service.packageType === "standard" ? (
                  <>
                    <ul className="space-y-1.5 mb-3">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" strokeWidth={3} />
                          <span className="text-xs md:text-[13px] text-slate-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-600 mb-1.5">Hvad du IKKE får:</p>
                      <ul className="space-y-1">
                        {service.notIncluded?.map((item, idx) => (
                          <li key={idx} className="text-xs text-slate-500 flex items-start gap-1.5">
                            <span className="text-red-500 mt-0.5">✗</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <ul className="space-y-1.5">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${service.featured || service.exclusive ? 'text-white/90' : 'text-emerald-500'}`} strokeWidth={3} />
                        <span className={`text-xs md:text-[13px] ${service.featured || service.exclusive ? 'text-white/95' : 'text-slate-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* CTA */}
              <button
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm md:text-[15px] font-bold transition-all ${
                  service.featured
                    ? 'bg-white text-primary hover:shadow-lg hover:-translate-y-0.5'
                    : service.exclusive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5'
                }`}
              >
                {service.buttonIcon === 'phone' && <Phone className="w-4 h-4" />}
                {service.buttonIcon === 'zap' && <Zap className="w-4 h-4" />}
                {service.buttonIcon === 'mail' && <Mail className="w-4 h-4" />}
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
