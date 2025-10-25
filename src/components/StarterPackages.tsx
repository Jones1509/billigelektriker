import { useState } from "react";
import { Check, Zap, Phone, Mail, Star, Shield, Clock, Award, Info, ArrowRight, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

export const StarterPackages = () => {
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState<"privat" | "erhverv">("privat");
  const [timeType, setTimeType] = useState<"dagtimer" | "overarbejde" | "nattevagt">("dagtimer");
  const [hasSubscription, setHasSubscription] = useState(false);
  const [showSurcharges, setShowSurcharges] = useState<string | null>(null);

  // Base prices for each package (daytime prices)
  const basePrices = {
    standard: customerType === "privat" ? 550 : 510,
    premium: customerType === "privat" ? 550 : 510,
    exclusive: 1500 // VIP flat rate - 24/7 akut service
  };

  // Multipliers for time types (only for standard and premium)
  const multipliers = {
    dagtimer: 1.0,
    overarbejde: 1.27, // 650kr for base 510kr
    nattevagt: 1.96 // 1000kr for base 510kr
  };

  // Calculate price for a specific package
  const calculatePrice = (packageType: "standard" | "premium" | "exclusive") => {
    if (packageType === "exclusive") {
      return basePrices[packageType]; // VIP fixed price
    }
    const basePrice = basePrices[packageType];
    const multiplier = multipliers[timeType];
    const priceBeforeDiscount = basePrice * multiplier;
    return hasSubscription ? priceBeforeDiscount * 0.9 : priceBeforeDiscount;
  };

  const timeTypeLabels = {
    dagtimer: "Dagtimer (07–16)",
    overarbejde: "Overarbejde (16–22)",
    nattevagt: "Nattevagt (22–07)"
  };

  const services = [
    {
      name: "Standard Service",
      description: "Daglige el-opgaver og reparationer",
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
      exclusive: false,
      showPriceRange: false
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
        "2 års garanti"
      ],
      buttonText: "Vælg Premium",
      buttonIcon: "zap",
      featured: true,
      exclusive: false,
      showPriceRange: true
    },
    {
      name: "Eksklusiv Pakke",
      description: "Døgnservice og prioriteret behandling",
      packageType: "exclusive" as const,
      features: [
        "Alt fra Premium",
        "VIP-prioritering",
        "Døgndækning 24/7",
        "Ingen ventetid",
        "Dedikeret projektleder"
      ],
      buttonText: "Få Tilbud",
      buttonIcon: "mail",
      featured: false,
      exclusive: true,
      showPriceRange: false
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
        <div className="max-w-5xl mx-auto mb-6 md:mb-8">
          {/* Controls stacked on mobile, row on desktop */}
          <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-2 md:gap-3">
            {/* Customer Type Toggle */}
            <div className="inline-flex w-full md:w-auto bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setCustomerType("privat")}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  customerType === "privat"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Privat
              </button>
              <button
                onClick={() => setCustomerType("erhverv")}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  customerType === "erhverv"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Erhverv
              </button>
            </div>

            {/* Time Type Toggle */}
            <div className="inline-flex w-full md:w-auto bg-white border border-slate-200 rounded-xl p-1 shadow-sm overflow-x-auto">
              <button
                onClick={() => setTimeType("dagtimer")}
                className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                  timeType === "dagtimer"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Dagtimer
              </button>
              <button
                onClick={() => setTimeType("overarbejde")}
                className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                  timeType === "overarbejde"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Overarbejde
              </button>
              <button
                onClick={() => setTimeType("nattevagt")}
                className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-[11px] md:text-xs font-semibold transition-all whitespace-nowrap ${
                  timeType === "nattevagt"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Nattevagt
              </button>
            </div>

            {/* Subscription Switch */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-3 w-full md:w-auto bg-white border border-slate-200 rounded-xl px-4 py-2 md:py-2.5 shadow-sm">
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
              {/* Featured Badge - ABOVE CARD */}
              {service.featured && (
                <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full shadow-[0_6px_16px_rgba(255,215,0,0.4),0_0_0_4px_white,0_0_0_5px_rgba(0,102,255,0.2)] z-10 whitespace-nowrap">
                  <Star className="w-[13px] h-[13px] md:w-[15px] md:h-[15px] fill-slate-900" />
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.12em] text-slate-900">Mest Valgt</span>
                </div>
              )}
              
              {/* Exclusive Badge - ABOVE CARD */}
              {service.exclusive && (
                <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 rounded-full shadow-[0_6px_16px_rgba(251,191,36,0.5),0_0_0_4px_rgb(15,23,42),0_0_0_5px_rgba(251,191,36,0.3)] z-10 whitespace-nowrap">
                  <Zap className="w-[13px] h-[13px] md:w-[15px] md:h-[15px] fill-slate-900" />
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.12em] text-slate-900">⚡ VIP Service</span>
                </div>
              )}

              {/* Card Header */}
              <div className={`text-center ${service.featured || service.exclusive ? 'pt-2' : ''}`}>
                <h3 className={`text-xl md:text-2xl font-extrabold mb-1 tracking-tight ${service.featured || service.exclusive ? 'text-white' : 'text-slate-900'}`}>
                  {service.name}
                </h3>
                <p className={`text-[13px] md:text-[14px] leading-relaxed ${service.featured || service.exclusive ? 'text-white/95' : 'text-slate-600'}`}>
                  {service.description}
                </p>
              </div>

              {/* Price Section */}
              <div className={`text-center py-3 border-t border-b ${service.featured || service.exclusive ? 'border-white/20' : 'border-slate-200'}`}>
                <>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    {service.showPriceRange && service.packageType !== "exclusive" ? (
                      <span className={`text-3xl md:text-4xl font-black tracking-tight ${service.featured || service.exclusive ? 'text-white' : 'text-slate-900'}`}>
                        Fra {customerType === "privat" ? "550" : "510"}
                      </span>
                    ) : (
                      <span className={`text-4xl md:text-5xl font-black tracking-tight ${service.featured || service.exclusive ? 'text-white' : 'text-slate-900'}`}>
                        {service.packageType === "exclusive" ? "1500" : Math.round(calculatePrice(service.packageType))}
                      </span>
                    )}
                    <span className={`text-lg md:text-xl font-bold ${service.featured || service.exclusive ? 'text-white/90' : 'text-slate-600'}`}>
                      kr
                    </span>
                  </div>
                  <p className={`text-xs md:text-[13px] font-medium mb-2 ${service.featured || service.exclusive ? 'text-white/80' : 'text-slate-500'}`}>
                    per time
                  </p>
                  
                  {/* Price Labels */}
                  <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 text-[10px] md:text-[11px]">
                    {service.packageType === "exclusive" ? (
                      <span className={`px-2 py-1 rounded ${service.exclusive ? 'bg-white/20 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                        24/7 akut service
                      </span>
                    ) : (
                      <>
                        <span className={`px-2 py-1 rounded ${service.featured || service.exclusive ? 'bg-white/20 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                          {customerType === "privat" ? "Privat" : "Erhverv"} | Dagtid 07-16
                        </span>
                        {!service.showPriceRange && (
                          <span className={`px-2 py-1 rounded ${service.featured || service.exclusive ? 'bg-white/20 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                            {customerType === "privat" ? "Privat: 550 kr" : "Erhverv: 510 kr"}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {service.packageType === "premium" && (
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded text-[10px] md:text-[11px] ${service.featured ? 'bg-white/20 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                        Inkl. 2 års garanti
                      </span>
                    </div>
                  )}

                  {/* Subscription Badge */}
                  {hasSubscription && service.packageType !== "exclusive" && (
                    <div className="mt-1.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] md:text-[11px] font-semibold ${
                        service.exclusive ? 'bg-amber-400/20 text-amber-300' : 'bg-primary/10 text-primary'
                      }`}>
                        Spar 10 % med abonnement
                      </span>
                    </div>
                  )}
                </>
              </div>

              {/* Features List */}
              <ul className="flex-grow space-y-2 mb-2">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5">
                    <Check className={`w-[16px] h-[16px] md:w-[18px] md:h-[18px] flex-shrink-0 ${service.featured || service.exclusive ? 'text-white/90' : 'text-emerald-500'}`} strokeWidth={3} />
                    <span className={`text-[14px] md:text-[15px] font-medium ${service.featured || service.exclusive ? 'text-white/95' : 'text-slate-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Collapsible Surcharges */}
              {service.packageType !== "exclusive" && (
                <details 
                  open={showSurcharges === service.packageType}
                  onToggle={(e) => setShowSurcharges((e.target as HTMLDetailsElement).open ? service.packageType : null)}
                  className={`mb-3 border-t pt-3 ${service.featured ? 'border-white/20' : 'border-slate-200'}`}
                >
                  <summary className={`cursor-pointer text-[12px] md:text-[13px] font-semibold flex items-center gap-2 list-none ${service.featured ? 'text-white/90' : 'text-primary'}`}>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSurcharges === service.packageType ? 'rotate-180' : ''}`} />
                    {service.packageType === "standard" ? "Se priser for aften/nat" : "Se alle priser"}
                  </summary>
                  <div className={`mt-2 p-3 rounded-lg text-[11px] md:text-[12px] space-y-1 ${service.featured ? 'bg-white/10 text-white/90' : 'bg-slate-50 text-slate-700'}`}>
                    <div>Dag (07-16): {customerType === "privat" ? "550" : "510"} kr</div>
                    <div>Aften (16-22): 650 kr</div>
                    <div>Nat (22-07): 1000 kr</div>
                    <div className="text-[10px] opacity-70 mt-2">+ Materialer + Transport</div>
                  </div>
                </details>
              )}

              {/* Transport Info */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center gap-1.5 text-[10px] md:text-[11px] mb-2 ${service.featured || service.exclusive ? 'text-white/70' : 'text-slate-500'}`}>
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
                className={`flex items-center justify-center gap-2 px-6 py-3.5 md:py-4 rounded-xl text-[14px] md:text-[15px] font-bold transition-all duration-300 ${
                  service.featured
                    ? 'bg-white text-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5'
                    : service.exclusive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-[0_4px_12px_rgba(251,191,36,0.3)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.4)] hover:-translate-y-0.5'
                    : 'bg-primary text-white shadow-[0_4px_12px_rgba(0,102,255,0.2)] hover:bg-primary/90 hover:shadow-[0_6px_20px_rgba(0,102,255,0.3)] hover:-translate-y-0.5'
                }`}
              >
                {service.buttonIcon === 'phone' && <Phone className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />}
                {service.buttonIcon === 'zap' && <Zap className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />}
                {service.buttonIcon === 'mail' && <Mail className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />}
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Subscription CTA */}
        <div className="max-w-[900px] mx-auto mt-8 md:mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 p-5 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-primary/30 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 md:gap-5 text-center md:text-left">
              <Star className="w-9 h-9 md:w-10 md:h-10 text-primary flex-shrink-0" fill="currentColor" />
              <div>
                <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1">Spar med Abonnement</h4>
                <p className="text-sm md:text-base text-slate-600">Få fast lav pris, gratis transport og prioriteret service</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/abonnement')}
              className="flex items-center gap-2 px-6 md:px-7 py-3 md:py-3.5 bg-primary text-white font-bold text-sm md:text-base rounded-xl shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              Se Abonnement
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
