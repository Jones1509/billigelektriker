import { useState } from "react";
import { Check, Zap, Phone, Mail, Star, Clock, Info, Sun, Moon, Truck, AlertCircle, Home, Building, TrendingDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const StarterPackages = () => {
  const [customerType, setCustomerType] = useState<"privat" | "erhverv">("privat");
  const [timeType, setTimeType] = useState<"dagtimer" | "overarbejde" | "nattevagt">("dagtimer");
  const [hasSubscription, setHasSubscription] = useState(false);

  // Real hourly rates (excluding materials & transport)
  const hourlyRates = {
    dagtimer: 500,
    overarbejde: 650,
    nattevagt: 1000
  };

  // Transport costs based on time
  const transportCosts = {
    dagtimer: 300,
    overarbejde: 400,
    nattevagt: 500
  };

  // Calculate price for standard package
  const calculateStandardPrice = () => {
    const baseRate = hourlyRates[timeType];
    return hasSubscription ? Math.round(baseRate * 0.9) : baseRate;
  };

  // Calculate price for premium package (varies by time)
  const calculatePremiumPrice = () => {
    const baseRate = hourlyRates[timeType];
    return hasSubscription ? Math.round(baseRate * 0.9) : baseRate;
  };

  // Calculate price for exclusive package (always premium night rate + emergency)
  const calculateExclusivePrice = () => {
    const vipRate = 1500; // 1000 (night) + 500 (emergency)
    return hasSubscription ? Math.round(vipRate * 0.9) : vipRate;
  };

  const timeTypeLabels = {
    dagtimer: "Dagtimer (07-16)",
    overarbejde: "Overarbejde (16-22)",
    nattevagt: "Nat (22-07)"
  };

  const services = [
    {
      name: "Standard Service",
      description: "Daglige el-opgaver og mindre reparationer",
      price: calculateStandardPrice(),
      features: [
        "Fejlfinding og reparation",
        "Installation af stikkontakter",
        "Udskiftning af lamper",
        "El-tjek og eftersyn"
      ],
      surcharges: [
        { icon: Clock, text: `Overarbejde (16-22): 650 kr/time` },
        { icon: Moon, text: `Nat (22-07): 1000 kr/time` },
        { icon: Truck, text: `Transport: fra ${transportCosts.dagtimer} kr` }
      ],
      buttonText: "Book Nu",
      buttonIcon: "phone",
      featured: false,
      exclusive: false
    },
    {
      name: "Premium Pakke",
      description: "Komplette installationer med garanti",
      price: calculatePremiumPrice(),
      priceRange: "500-1000",
      features: [
        "Alt fra Standard Service",
        "Smart home installation",
        "Nye elinstallationer",
        "El-tavle opgradering",
        "2 års garanti inkluderet"
      ],
      dynamicPricing: [
        { icon: Sun, text: "Dag (07-16): 500 kr/time" },
        { icon: Clock, text: "Aften (16-22): 650 kr/time" },
        { icon: Moon, text: "Nat (22-07): 1000 kr/time" }
      ],
      buttonText: "Vælg Premium",
      buttonIcon: "zap",
      featured: true,
      exclusive: false
    },
    {
      name: "Eksklusiv Pakke",
      description: "Avancerede løsninger og 24/7-service",
      price: calculateExclusivePrice(),
      features: [
        "Alt fra Premium Pakke",
        "VIP-prioritering",
        "Døgndækning 24/7",
        "Teknisk specialdesign",
        "Dedikeret projektleder",
        "Skræddersyet serviceaftale"
      ],
      vipNote: "VIP-pris inkluderer premium timepris (1000 kr) + akut tillæg (500 kr)",
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
                className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  timeType === "dagtimer"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Dagtimer
              </button>
              <button
                onClick={() => setTimeType("overarbejde")}
                className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  timeType === "overarbejde"
                    ? "bg-primary text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Overarbejde
              </button>
              <button
                onClick={() => setTimeType("nattevagt")}
                className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
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
                    <span className={`text-4xl md:text-5xl font-black tracking-tight ${service.featured || service.exclusive ? 'text-white' : 'text-slate-900'}`}>
                      {service.priceRange || service.price}
                    </span>
                    <span className={`text-lg md:text-xl font-bold ${service.featured || service.exclusive ? 'text-white/90' : 'text-slate-600'}`}>
                      kr
                    </span>
                  </div>
                  <p className={`text-xs md:text-[13px] font-medium mb-2 ${service.featured || service.exclusive ? 'text-white/80' : 'text-slate-500'}`}>
                    per time
                  </p>
                  
                  {/* Price Labels */}
                  <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 text-[10px] md:text-[11px]">
                    <span className={`px-2 py-1 rounded ${service.featured || service.exclusive ? 'bg-white/20 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                      {customerType === "privat" ? "Privat (inkl. moms)" : "Erhverv (ekskl. moms)"}
                    </span>
                    {!service.exclusive && (
                      <span className={`px-2 py-1 rounded ${service.featured || service.exclusive ? 'bg-white/20 text-white/90' : 'bg-slate-100 text-slate-600'}`}>
                        {timeTypeLabels[timeType]}
                      </span>
                    )}
                    {service.exclusive && (
                      <span className={`px-2 py-1 rounded bg-white/20 text-white/90`}>
                        Døgnservice 24/7
                      </span>
                    )}
                  </div>

                  {/* Subscription Badge */}
                  {hasSubscription && (
                    <div className="mt-1.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] md:text-[11px] font-semibold ${
                        service.exclusive ? 'bg-amber-400/20 text-amber-300' : service.featured ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                      }`}>
                        <TrendingDown className="w-3 h-3" /> Spar 10% med abonnement
                      </span>
                    </div>
                  )}
                </>
              </div>

              {/* Surcharges/Dynamic Pricing Info */}
              {service.surcharges && !service.featured && (
                <div className="space-y-1.5 mb-3">
                  {service.surcharges.map((surcharge, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-600">
                      <surcharge.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{surcharge.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {service.dynamicPricing && service.featured && (
                <div className="mb-3 p-3 bg-white/10 rounded-lg">
                  <h4 className="text-xs font-bold text-white mb-2">Priser efter tidspunkt:</h4>
                  <div className="space-y-1">
                    {service.dynamicPricing.map((pricing, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-white/90">
                        <pricing.icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{pricing.text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="flex items-center gap-1.5 mt-2 text-[11px] text-amber-300 font-medium">
                    <AlertCircle className="w-3 h-3" /> Akut tillæg: +500 kr
                  </p>
                </div>
              )}

              {service.vipNote && service.exclusive && (
                <div className="mb-3 p-3 bg-white/10 rounded-lg">
                  <p className="text-xs text-white/90 leading-relaxed">
                    {service.vipNote}
                  </p>
                </div>
              )}

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

              {/* Transport Info */}
              <div className={`flex items-center gap-1.5 text-[10px] md:text-[11px] mb-3 ${service.featured || service.exclusive ? 'text-white/70' : 'text-slate-500'}`}>
                {service.exclusive ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span className="font-medium">Transport inkluderet</span>
                  </>
                ) : (
                  <>
                    <Truck className="w-3.5 h-3.5" />
                    <span className="font-medium">Transport: {transportCosts.dagtimer}-{transportCosts.nattevagt} kr efter tid</span>
                  </>
                )}
              </div>

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

        {/* Subscription Section */}
        <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-4 h-4 fill-current" />
              ABONNEMENT
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
              Få Abonnement & Spar
            </h3>
            <p className="text-base md:text-lg text-slate-600">
              Fast månedlig pris med store besparelser på alle services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Privat Abonnement */}
            <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Privat Abonnement</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Perfekt til private husstande
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900">550</span>
                  <span className="text-xl font-bold text-slate-600">kr</span>
                  <span className="text-sm text-slate-500">/måned</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">Spar op til 10% på alle timer</span>
                </div>

                <ul className="space-y-2.5 my-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">10% rabat på alle timepriser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">Gratis transport inden for 20 km</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">Prioriteret booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">Ingen akut-tillæg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">Årlig gratis el-tjek</span>
                  </li>
                </ul>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Eksempel besparelse:</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Normal pris (4 timer):</span>
                      <span>2000 kr</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Med abonnement:</span>
                      <span>1800 kr + 0 kr transport</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-300 flex justify-between font-bold text-slate-900">
                      <span>Du sparer:</span>
                      <span className="text-emerald-600">500 kr</span>
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <Check className="w-5 h-5" />
                  Få Privat Abonnement
                </button>
              </CardContent>
            </Card>

            {/* Erhverv Abonnement */}
            <Card className="relative overflow-hidden border-2 border-slate-900/20 hover:border-slate-900/40 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-lg">
                BEDSTE VÆRDI
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-slate-900/10 rounded-lg">
                    <Building className="w-6 h-6 text-slate-900" />
                  </div>
                  <CardTitle className="text-2xl">Erhverv Abonnement</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Optimal løsning for virksomheder
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900">510</span>
                  <span className="text-xl font-bold text-slate-600">kr</span>
                  <span className="text-sm text-slate-500">/måned</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">Spar op til 15% på alle timer</span>
                </div>

                <ul className="space-y-2.5 my-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">10-15% rabat på alle timepriser</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">Gratis transport inden for 30 km</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">VIP-prioritering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">Ingen akut-tillæg i dagtid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">Kvartalsvis serviceaftale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span className="text-sm font-medium text-slate-700">Dedikeret kontaktperson</span>
                  </li>
                </ul>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Eksempel besparelse:</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Normal pris (8 timer):</span>
                      <span>4000 kr</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Med abonnement:</span>
                      <span>3400 kr + 0 kr transport</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-300 flex justify-between font-bold text-slate-900">
                      <span>Du sparer:</span>
                      <span className="text-emerald-600">1000 kr/måned</span>
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <Check className="w-5 h-5" />
                  Få Erhverv Abonnement
                </button>
              </CardContent>
            </Card>
          </div>

          <p className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-600">
            <Info className="w-4 h-4" />
            <span>Ingen binding - opsiges med 1 måneds varsel</span>
          </p>
        </div>

      </div>
    </section>
  );
};
