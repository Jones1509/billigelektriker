import { 
  Check, 
  Zap, 
  Phone, 
  Mail, 
  Star, 
  Home,
  Building,
  Clock,
  Sunset,
  Moon,
  AlertCircle,
  MapPin,
  Award,
  Timer,
  AlertTriangle
} from "lucide-react";

export const StarterPackages = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1100px] mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
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

        {/* Main Pricing Grid - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Private Customers Card */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-primary/30">
            {/* Card Header */}
            <div className="text-center mb-7">
              <Home className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-[26px] font-extrabold text-slate-900 mb-2">
                Privatkunder
              </h3>
              <p className="text-[14px] text-slate-600">
                For boligejere og lejere
              </p>
            </div>

            {/* Base Price */}
            <div className="text-center py-5 mb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[56px] font-black text-slate-900 tracking-tight leading-none">550</span>
                <span className="text-[18px] font-semibold text-slate-600">kr/time</span>
              </div>
              <p className="text-[13px] text-slate-400 font-medium mt-2">Inkl. moms</p>
            </div>

            {/* Price Breakdown */}
            <div className="flex flex-col gap-4 mb-7 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:translate-x-1">
                <Clock className="w-[22px] h-[22px] text-primary flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">Dagtid (8-17)</div>
                  </div>
                  <span className="text-[16px] font-extrabold text-primary">550 kr/time</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:translate-x-1">
                <Sunset className="w-[22px] h-[22px] text-primary flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">Aften (17-22)</div>
                  </div>
                  <span className="text-[16px] font-extrabold text-primary">750 kr/time</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl transition-all duration-200 hover:bg-blue-50 hover:translate-x-1">
                <Moon className="w-[22px] h-[22px] text-primary flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">Nat/Weekend</div>
                  </div>
                  <span className="text-[16px] font-extrabold text-primary">950 kr/time</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl">
                <AlertCircle className="w-[22px] h-[22px] text-red-500 flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">Akut udkald 24/7</div>
                  </div>
                  <span className="text-[16px] font-extrabold text-red-600">1.200 kr/time</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-primary text-primary rounded-xl text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,102,255,0.25)]">
              <Phone className="w-[18px] h-[18px]" />
              Book Nu
            </button>
          </div>

          {/* Business Customers Card */}
          <div className="relative bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-3xl p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,102,255,0.15)]">
            {/* Popular Badge */}
            <div className="absolute -top-[14px] right-6 flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full shadow-[0_4px_12px_rgba(0,102,255,0.3)]">
              <Star className="w-3.5 h-3.5 fill-white" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider">Erhverv</span>
            </div>

            {/* Card Header */}
            <div className="text-center mb-7">
              <Building className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-[26px] font-extrabold text-slate-900 mb-2">
                Erhvervskunder
              </h3>
              <p className="text-[14px] text-slate-600">
                For virksomheder og større projekter
              </p>
            </div>

            {/* Base Price */}
            <div className="text-center py-5 mb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[56px] font-black text-slate-900 tracking-tight leading-none">510</span>
                <span className="text-[18px] font-semibold text-slate-600">kr/time</span>
              </div>
              <p className="text-[13px] text-slate-400 font-medium mt-2">Ekskl. moms</p>
            </div>

            {/* Price Breakdown */}
            <div className="flex flex-col gap-4 mb-7 pt-6 border-t border-primary/20">
              <div className="flex items-center gap-3.5 p-3.5 bg-white/80 rounded-xl transition-all duration-200 hover:bg-white hover:translate-x-1">
                <Clock className="w-[22px] h-[22px] text-primary flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">Dagtid (8-17)</div>
                  </div>
                  <span className="text-[16px] font-extrabold text-primary">510 kr/time</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-white/80 rounded-xl transition-all duration-200 hover:bg-white hover:translate-x-1">
                <Sunset className="w-[22px] h-[22px] text-primary flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">Aften (17-22)</div>
                  </div>
                  <span className="text-[16px] font-extrabold text-primary">680 kr/time</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-white/80 rounded-xl transition-all duration-200 hover:bg-white hover:translate-x-1">
                <Moon className="w-[22px] h-[22px] text-primary flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">Nat/Weekend</div>
                  </div>
                  <span className="text-[16px] font-extrabold text-primary">850 kr/time</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl">
                <AlertCircle className="w-[22px] h-[22px] text-red-500 flex-shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <div className="text-[14px] font-semibold text-slate-800">Akut udkald 24/7</div>
                  </div>
                  <span className="text-[16px] font-extrabold text-red-600">1.100 kr/time</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,102,255,0.25)] hover:bg-primary/90">
              <Mail className="w-[18px] h-[18px]" />
              Få Erhvervstilbud
            </button>
          </div>
        </div>

        {/* Additional Info - 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Travel Fees */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7">
            <MapPin className="w-9 h-9 text-primary mb-4" />
            <h4 className="text-[18px] font-bold text-slate-900 mb-4">
              Kørselstillæg
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span><strong>0-10 km:</strong> Gratis kørsel</span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span><strong>10-25 km:</strong> +150 kr</span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span><strong>25-50 km:</strong> +300 kr</span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span><strong>50+ km:</strong> Efter aftale</span>
              </li>
            </ul>
          </div>

          {/* Service Subscription */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-7">
            <Award className="w-9 h-9 text-amber-600 mb-4" />
            <h4 className="text-[18px] font-bold text-slate-900 mb-2">
              Serviceabonnement
            </h4>
            <p className="text-[13px] text-slate-600 mb-4">
              Spar penge som stamkunde
            </p>
            <ul className="space-y-2.5 mb-5">
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Star className="w-4 h-4 text-amber-600 flex-shrink-0 fill-amber-600" />
                <span><strong>10% rabat</strong> på alle timer</span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Star className="w-4 h-4 text-amber-600 flex-shrink-0 fill-amber-600" />
                <span><strong>Gratis kørsel</strong> inden for 25 km</span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Star className="w-4 h-4 text-amber-600 flex-shrink-0 fill-amber-600" />
                <span><strong>Prioriteret booking</strong></span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Star className="w-4 h-4 text-amber-600 flex-shrink-0 fill-amber-600" />
                <span><strong>Årligt eftersyn</strong> inkluderet</span>
              </li>
            </ul>
            <p className="text-center text-[20px] font-extrabold text-slate-900 mb-4">
              Fra 299 kr/måned
            </p>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl text-[13px] font-bold transition-all duration-200 hover:bg-primary/90">
              <Zap className="w-4 h-4" />
              Læs Mere Om Abonnement
            </button>
          </div>

          {/* Response Times */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7">
            <Timer className="w-9 h-9 text-primary mb-4" />
            <h4 className="text-[18px] font-bold text-slate-900 mb-4">
              Responstid
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span><strong>Standard:</strong> 2-5 hverdage</span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span><strong>Hurtig:</strong> Næste dag (+20%)</span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span><strong>Samme dag:</strong> Inden 4 timer (+40%)</span>
              </li>
              <li className="flex items-center gap-2.5 text-[14px] text-slate-700">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span><strong>Akut:</strong> Inden 1 time (+120%)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
