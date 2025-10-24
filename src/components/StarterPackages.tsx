import { useState } from "react";
import { Check, Zap, Phone, Mail, Star, Shield, Clock, Award, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const StarterPackages = () => {
  const [customerType, setCustomerType] = useState<"privat" | "erhverv">("privat");
  const [timeType, setTimeType] = useState<"dagtimer" | "overarbejde" | "akut" | "nattevagt">("dagtimer");
  const [hasSubscription, setHasSubscription] = useState(false);

  // Base prices for each package
  const basePrices = {
    standard: customerType === "privat" ? 650 : 510,
    premium: customerType === "privat" ? 850 : 670,
    exclusive: customerType === "privat" ? 1050 : 850
  };

  // Multipliers for time types
  const multipliers = {
    dagtimer: 1.0,
    overarbejde: 1.25,
    akut: 1.5,
    nattevagt: 1.75
  };

  // Calculate price for a specific package
  const calculatePrice = (packageType: "standard" | "premium" | "exclusive") => {
    const basePrice = basePrices[packageType];
    const multiplier = multipliers[timeType];
    const priceBeforeDiscount = basePrice * multiplier;
    return hasSubscription ? priceBeforeDiscount * 0.9 : priceBeforeDiscount;
  };

  const timeTypeLabels = {
    dagtimer: "Dagtimer (07–16)",
    overarbejde: "Overarbejde (16–21)",
    akut: "Akut (samme dag)",
    nattevagt: "Nattevagt (21–07)"
  };

  const services = [
    {
      name: "Standard Service",
      description: "Daglige el-opgaver og mindre reparationer",
      packageType: "standard" as const,
      features: [
        "Fejlfinding og reparation",
        "Installation af stikkontakter",
        "Udskiftning af lamper",
        "El-tjek og eftersyn"
      ],
      buttonText: "Book Nu",
      buttonIcon: "phone",
      featured: false,
      exclusive: false
    },
    {
      name: "Premium Pakke",
      description: "Komplette installationer med garanti",
      packageType: "premium" as const,
      features: [
        "Alt fra Standard Service",
        "Smart home installation",
        "Nye elinstallationer",
        "El-tavle opgradering",
        "2 års garanti inkluderet"
      ],
      buttonText: "Vælg Premium",
      buttonIcon: "zap",
      featured: true,
      exclusive: false
    },
    {
      name: "Eksklusiv Pakke",
      description: "Avancerede løsninger og 24/7-service",
      packageType: "exclusive" as const,
      features: [
        "Alt fra Premium Pakke",
        "VIP-prioritering",
        "Døgndækning 24/7",
        "Teknisk specialdesign",
        "Dedikeret projektleder",
        "Skræddersyet serviceaftale"
      ],
      buttonText: "Få Tilbud",
      buttonIcon: "mail",
      featured: false,
      exclusive: true
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1300px] mx-auto px-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/8 border border-primary/15 rounded-full text-primary text-[11px] font-bold uppercase tracking-wider mb-5">
            <Zap className="w-3.5 h-3.5" />
            TRANSPARENTE PRISER
          </div>
          <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Vores Services & Priser
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Professionel el-service med klare, fair priser. Ingen skjulte omkostninger.
          </p>
        </div>

        {/* Price Controls */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Customer Type Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setCustomerType("privat")}
                className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                  customerType === "privat"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Privat
              </button>
              <button
                onClick={() => setCustomerType("erhverv")}
                className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                  customerType === "erhverv"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Erhverv
              </button>
            </div>
          </div>

          {/* Time Type and Subscription Row */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
            {/* Time Type Toggle */}
            <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm flex-wrap justify-center">
              <button
                onClick={() => setTimeType("dagtimer")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  timeType === "dagtimer"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Dagtimer (07–16)
              </button>
              <button
                onClick={() => setTimeType("overarbejde")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  timeType === "overarbejde"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Overarbejde (16–21)
              </button>
              <button
                onClick={() => setTimeType("akut")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  timeType === "akut"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Akut (samme dag)
              </button>
              <button
                onClick={() => setTimeType("nattevagt")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  timeType === "nattevagt"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Nattevagt (21–07)
              </button>
            </div>

            {/* Subscription Switch */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
                    <Switch
                      checked={hasSubscription}
                      onCheckedChange={setHasSubscription}
                      id="subscription"
                    />
                    <label htmlFor="subscription" className="text-sm font-semibold text-slate-700 cursor-pointer">
                      Abonnement
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Stamkunde-rabat på timepris</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pt-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col gap-7 p-10 rounded-[20px] transition-all duration-500 ${
                service.featured
                  ? 'bg-gradient-to-br from-primary to-primary/90 text-white shadow-[0_24px_48px_rgba(0,102,255,0.25)] hover:shadow-[0_32px_64px_rgba(0,102,255,0.3)] hover:-translate-y-2 border-none'
                  : service.exclusive
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-amber-500/30 shadow-[0_24px_48px_rgba(251,191,36,0.15)] hover:shadow-[0_32px_64px_rgba(251,191,36,0.25)] hover:-translate-y-2'
                  : 'bg-white border border-slate-200 hover:border-primary/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]'
              } animate-fade-in`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Featured Badge - ABOVE CARD */}
              {service.featured && (
                <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-[0_6px_16px_rgba(255,215,0,0.4),0_0_0_4px_white,0_0_0_5px_rgba(0,102,255,0.2)] z-10 whitespace-nowrap">
                  <Star className="w-[15px] h-[15px] fill-slate-900" />
                  <span className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-900">Mest Valgt</span>
                </div>
              )}
              
              {/* Exclusive Badge - ABOVE CARD */}
              {service.exclusive && (
                <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 rounded-full shadow-[0_6px_16px_rgba(251,191,36,0.5),0_0_0_4px_rgb(15,23,42),0_0_0_5px_rgba(251,191,36,0.3)] z-10 whitespace-nowrap">
                  <Zap className="w-[15px] h-[15px] fill-slate-900" />
                  <span className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-900">⚡ VIP Service</span>
                </div>
              )}

              {/* Card Header */}
              <div className={`text-center ${service.featured || service.exclusive ? 'pt-3' : ''}`}>
                <h3 className={`text-2xl font-extrabold mb-2 tracking-tight ${service.featured || service.exclusive ? 'text-white' : 'text-slate-900'}`}>
                  {service.name}
                </h3>
                <p className={`text-[15px] leading-relaxed ${service.featured || service.exclusive ? 'text-white/95' : 'text-slate-600'}`}>
                  {service.description}
                </p>
              </div>

              {/* Price Section */}
              <div className={`text-center py-6 border-t border-b ${service.featured || service.exclusive ? 'border-white/20' : 'border-slate-200'}`}>
                <>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className={`text-5xl font-black tracking-tight ${service.featured || service.exclusive ? 'text-white' : 'text-slate-900'}`}>
                      {Math.round(calculatePrice(service.packageType))}
                    </span>
                    <span className={`text-xl font-bold ${service.featured || service.exclusive ? 'text-white/90' : 'text-slate-600'}`}>
                      kr
                    </span>
                  </div>
                  <p className={`text-[13px] font-medium mb-3 ${service.featured || service.exclusive ? 'text-white/80' : 'text-slate-500'}`}>
                    per time
                  </p>
                  
                  {/* Price Labels */}
                  <div className="flex flex-wrap justify-center gap-2 text-[11px]">
                    <span className={`px-2 py-1 rounded ${service.featured || service.exclusive ? 'bg-white/20 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                      {customerType === "privat" ? "Privat (inkl. moms)" : "Erhverv (ekskl. moms)"}
                    </span>
                    <span className={`px-2 py-1 rounded ${service.featured || service.exclusive ? 'bg-white/20 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                      {timeTypeLabels[timeType]}
                    </span>
                  </div>

                  {/* Subscription Badge */}
                  {hasSubscription && (
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold ${
                        service.exclusive ? 'bg-amber-400/20 text-amber-300' : 'bg-primary/10 text-primary'
                      }`}>
                        Spar 10 % med abonnement
                      </span>
                    </div>
                  )}
                </>
              </div>

              {/* Features List */}
              <ul className="flex-grow space-y-3 mb-4">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5">
                    <Check className={`w-[18px] h-[18px] flex-shrink-0 ${service.featured || service.exclusive ? 'text-white/90' : 'text-emerald-500'}`} strokeWidth={3} />
                    <span className={`text-[15px] font-medium ${service.featured || service.exclusive ? 'text-white/95' : 'text-slate-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Transport Info */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center gap-1.5 text-[11px] mb-4 ${service.featured || service.exclusive ? 'text-white/70' : 'text-slate-500'}`}>
                      <Info className="w-3.5 h-3.5" />
                      <span className="font-medium">Transport efter afstand</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      Zone A (0–15 km): 0 kr · Zone B (15–30 km): 199 kr · Zone C (30–50 km): 399 kr · &gt;50 km: 8 kr/km
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* CTA Button */}
              <button
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[15px] font-bold transition-all duration-300 ${
                  service.featured
                    ? 'bg-white text-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5'
                    : service.exclusive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-[0_4px_12px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.4)] hover:-translate-y-0.5'
                    : 'bg-primary text-white shadow-[0_4px_12px_rgba(0,102,255,0.2)] hover:bg-primary/90 hover:shadow-[0_6px_20px_rgba(0,102,255,0.3)] hover:-translate-y-0.5'
                }`}
              >
                {service.buttonIcon === 'phone' && <Phone className="w-[18px] h-[18px]" />}
                {service.buttonIcon === 'zap' && <Zap className="w-[18px] h-[18px]" />}
                {service.buttonIcon === 'mail' && <Mail className="w-[18px] h-[18px]" />}
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
