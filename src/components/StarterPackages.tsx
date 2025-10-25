import { useState } from "react";
import { Check, Zap, Phone, Mail, Star, Crown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StarterPackages = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState<"privat" | "erhverv">("privat");
  const [timeType, setTimeType] = useState<"dagtimer" | "overarbejde" | "nat" | "akut">("dagtimer");
  const [hasSubscription, setHasSubscription] = useState(false);

  // Base prices (daytime)
  const basePrices = {
    standard: { privat: 550, erhverv: 510 },
    premium: { privat: 650, erhverv: 600 },
    exclusive: { privat: 850, erhverv: 800 }
  };

  // Time surcharges (added to base)
  const timeSurcharges = {
    dagtimer: { standard: 0, premium: 0, exclusive: 0 },
    overarbejde: { standard: 200, premium: 150, exclusive: 100 },
    nat: { standard: 650, premium: 450, exclusive: 150 },
    akut: { standard: 500, premium: 300, exclusive: 0 }
  };

  // Subscription discounts
  const subscriptionDiscounts = {
    standard: 0.10,
    premium: 0.13,
    exclusive: 0.15
  };

  // Calculate price for a package
  const calculatePrice = (packageType: "standard" | "premium" | "exclusive") => {
    const basePrice = basePrices[packageType][customerType];
    const surcharge = timeSurcharges[timeType][packageType];
    const fullPrice = basePrice + surcharge;
    
    if (hasSubscription) {
      const discount = subscriptionDiscounts[packageType];
      return Math.round(fullPrice * (1 - discount));
    }
    return fullPrice;
  };

  // Calculate savings with subscription
  const calculateSavings = (packageType: "standard" | "premium" | "exclusive") => {
    const basePrice = basePrices[packageType][customerType];
    const surcharge = timeSurcharges[timeType][packageType];
    const fullPrice = basePrice + surcharge;
    const discountedPrice = calculatePrice(packageType);
    const transport = hasSubscription ? (packageType === "standard" ? 300 : packageType === "premium" ? 300 : 0) : 0;
    return Math.round(fullPrice - discountedPrice + transport);
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
      description: "Professionel grundservice",
      packageType: "standard" as const,
      features: [
        "Professionel service",
        "Autoriseret elektriker",
        "Fejlfinding og reparation",
        "Installation af stikkontakter"
      ],
      notIncluded: [
        "Ingen garanti",
        "Standard ventetid (3-5 dage)",
        "Fuld pris for materialer"
      ],
      buttonText: "Book Nu",
      buttonIcon: "phone",
      featured: false,
      exclusive: false
    },
    {
      name: "Premium Pakke",
      badge: "Bedste værdi",
      description: "Mere værdi + sikkerhed",
      packageType: "premium" as const,
      features: [
        "Alt fra Standard Service",
        "2 års garanti på arbejde",
        "Prioriteret booking (1-2 dage)",
        "10% rabat på materialer",
        "Gratis opfølgning første måned",
        "SMS når elektriker er på vej"
      ],
      buttonText: "Vælg Premium",
      buttonIcon: "zap",
      featured: true,
      exclusive: false
    },
    {
      name: "Eksklusiv Pakke",
      badge: "VIP Service",
      description: "Maksimal værdi + tryghed",
      packageType: "exclusive" as const,
      features: [
        "Alt fra Premium Pakke",
        "5 års garanti på arbejde",
        "VIP prioritering (samme/næste dag)",
        "20% rabat på materialer",
        "Dedikeret projektleder",
        "24/7 support hotline",
        "Gratis årlig eftersyn"
      ],
      buttonText: "Få Tilbud",
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

            {/* Subscription Toggle */}
            <button
              onClick={() => setHasSubscription(!hasSubscription)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all shadow-sm ${
                hasSubscription
                  ? "bg-emerald-500 text-white border-2 border-emerald-600"
                  : "bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                hasSubscription ? "bg-white border-white" : "bg-white border-slate-300"
              }`}>
                {hasSubscription && <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />}
              </div>
              Abonnement
            </button>
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
                {hasSubscription && (
                  <div className="mb-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                      <Check className="w-3 h-3" strokeWidth={3} />
                      SPAR {calculateSavings(service.packageType)} KR
                    </span>
                  </div>
                )}
                
                <div className="flex items-baseline justify-center gap-1">
                  {hasSubscription && (
                    <span className={`text-lg md:text-xl font-bold line-through ${service.featured || service.exclusive ? 'text-white/50' : 'text-slate-400'}`}>
                      {Math.round(basePrices[service.packageType][customerType] + timeSurcharges[timeType][service.packageType])}
                    </span>
                  )}
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

                {hasSubscription && (
                  <p className={`text-[9px] md:text-[10px] mt-1 font-medium ${service.featured || service.exclusive ? 'text-white/80' : 'text-emerald-600'}`}>
                    Med abonnement
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="flex-grow space-y-1.5 mb-3">
                {service.features.slice(0, 5).map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${service.featured || service.exclusive ? 'text-white/90' : 'text-emerald-500'}`} strokeWidth={3} />
                    <span className={`text-xs md:text-[13px] ${service.featured || service.exclusive ? 'text-white/95' : 'text-slate-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

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

        {/* Subscription CTA Banner */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-primary/30 rounded-2xl">
            <div className="flex items-center gap-4">
              <Star className="w-8 h-8 md:w-10 md:h-10 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-base md:text-lg font-bold text-slate-900 mb-0.5">Spar med Abonnement</h4>
                <p className="text-xs md:text-sm text-slate-600">Fast lav pris + gratis transport + prioriteret service</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/abonnement')}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5 whitespace-nowrap shadow-lg"
            >
              Se Abonnement
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
