import { Check, Zap, Phone, Mail, Star, Shield, Clock, Award } from "lucide-react";

export const StarterPackages = () => {
  const services = [
    {
      name: "Standard Service",
      description: "Daglige el-opgaver og mindre reparationer",
      price: "650",
      priceNote: "per time",
      features: [
        "Fejlfinding og reparation",
        "Installation af stikkontakter",
        "Udskiftning af lamper",
        "El-tjek og eftersyn"
      ],
      buttonText: "Book Nu",
      buttonIcon: "phone",
      featured: false
    },
    {
      name: "Premium Pakke",
      description: "Komplette installationer med garanti",
      price: "850",
      priceNote: "per time",
      features: [
        "Alt fra Standard Service",
        "Smart home installation",
        "Nye elinstallationer",
        "El-tavle opgradering",
        "2 års garanti inkluderet"
      ],
      buttonText: "Vælg Premium",
      buttonIcon: "zap",
      featured: true
    },
    {
      name: "Erhverv",
      description: "Professionelle løsninger til virksomheder",
      price: "Kontakt",
      priceNote: "for tilbud",
      features: [
        "Skræddersyet løsning",
        "Større projekter",
        "Fast servicetekniker",
        "Fleksibel planlægning",
        "Serviceaftale"
      ],
      buttonText: "Få Tilbud",
      buttonIcon: "mail",
      featured: false
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1300px] mx-auto px-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 pt-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col gap-7 p-10 rounded-[20px] transition-all duration-500 ${
                service.featured
                  ? 'bg-gradient-to-br from-primary to-primary/90 text-white shadow-[0_24px_48px_rgba(0,102,255,0.25)] hover:shadow-[0_32px_64px_rgba(0,102,255,0.3)] hover:-translate-y-2 border-none'
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

              {/* Card Header */}
              <div className={`text-center ${service.featured ? 'pt-3' : ''}`}>
                <h3 className={`text-2xl font-extrabold mb-2 tracking-tight ${service.featured ? 'text-white' : 'text-slate-900'}`}>
                  {service.name}
                </h3>
                <p className={`text-[15px] leading-relaxed ${service.featured ? 'text-white/95' : 'text-slate-600'}`}>
                  {service.description}
                </p>
              </div>

              {/* Price Section */}
              <div className={`text-center py-6 border-t border-b ${service.featured ? 'border-white/20' : 'border-slate-200'}`}>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className={`text-5xl font-black tracking-tight ${service.featured ? 'text-white' : 'text-slate-900'}`}>
                    {service.price}
                  </span>
                  {service.price !== "Kontakt" && (
                    <span className={`text-xl font-bold ${service.featured ? 'text-white/90' : 'text-slate-600'}`}>
                      kr
                    </span>
                  )}
                </div>
                <p className={`text-[13px] font-medium ${service.featured ? 'text-white/80' : 'text-slate-500'}`}>
                  {service.priceNote}
                </p>
              </div>

              {/* Features List */}
              <ul className="flex-grow space-y-3">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5">
                    <Check className={`w-[18px] h-[18px] flex-shrink-0 ${service.featured ? 'text-white/90' : 'text-emerald-500'}`} strokeWidth={3} />
                    <span className={`text-[15px] font-medium ${service.featured ? 'text-white/95' : 'text-slate-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[15px] font-bold transition-all duration-300 ${
                  service.featured
                    ? 'bg-white text-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5'
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

        {/* Trust Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 pt-12 border-t border-slate-200 animate-fade-in">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <p className="text-sm text-slate-700 font-semibold m-0">Certificerede elektrikere</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" />
            <p className="text-sm text-slate-700 font-semibold m-0">Samme dag service</p>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            <p className="text-sm text-slate-700 font-semibold m-0">2 års garanti</p>
          </div>
        </div>
      </div>
    </section>
  );
};
