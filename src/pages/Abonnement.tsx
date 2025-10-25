import { Check, Home, Building, Star, Truck, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Abonnement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-bold mb-4">
            <Star className="w-4 h-4" />
            SPAR PENGE
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Abonnement - Fast Lav Pris</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Få rabat på alle timer, gratis transport og prioriteret service
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 pb-16">
        {/* Subscription Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          
          {/* Private Subscription */}
          <Card className="p-8 bg-white shadow-xl border-2 border-slate-200 hover:border-primary/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Privat</h3>
                <p className="text-sm text-slate-600">For boligejere</p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-slate-900">349</span>
              <span className="text-xl font-bold text-slate-600">kr/måned</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-slate-900">10-15% rabat på timer</p>
                  <p className="text-sm text-slate-600">Spar op til 127 kr per time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-slate-900">Gratis transport under 20 km</p>
                  <p className="text-sm text-slate-600">Spar 300 kr per besøg</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-slate-900">Prioriteret booking</p>
                  <p className="text-sm text-slate-600">Kom foran i køen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-slate-900">Årlig gratis el-tjek</p>
                  <p className="text-sm text-slate-600">Værdi 800 kr</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-emerald-900 mb-2">Eksempel besparelse:</p>
              <div className="space-y-1 text-sm text-emerald-800">
                <div className="flex justify-between">
                  <span>4 timer service:</span>
                  <span className="font-semibold">2200 kr → 1980 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport:</span>
                  <span className="font-semibold">300 kr → 0 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Årlig tjek:</span>
                  <span className="font-semibold">800 kr → 0 kr</span>
                </div>
                <div className="border-t border-emerald-300 pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>Du sparer:</span>
                  <span className="text-emerald-600">1320 kr</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg">
              Få Privat Abonnement
            </Button>

            <p className="text-xs text-center text-slate-500 mt-4">
              Ingen binding · Stop når som helst
            </p>
          </Card>

          {/* Business Subscription */}
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Erhverv</h3>
                <p className="text-sm text-white/70">For virksomheder</p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white">299</span>
              <span className="text-xl font-bold text-white/70">kr/måned</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">13-15% rabat på timer</p>
                  <p className="text-sm text-white/70">Spar op til 127 kr per time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">Gratis transport under 30 km</p>
                  <p className="text-sm text-white/70">Udvidet gratis zone</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">VIP prioritering</p>
                  <p className="text-sm text-white/70">Hurtigste responstid</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">Kvartalsvis gratis el-tjek</p>
                  <p className="text-sm text-white/70">Værdi 3200 kr/år</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">Dedikeret kontaktperson</p>
                  <p className="text-sm text-white/70">Personlig service</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-amber-300 mb-2">Eksempel besparelse:</p>
              <div className="space-y-1 text-sm text-white/90">
                <div className="flex justify-between">
                  <span>8 timer service/md:</span>
                  <span className="font-semibold">4080 kr → 3468 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport (2x):</span>
                  <span className="font-semibold">600 kr → 0 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Kvartalstjek:</span>
                  <span className="font-semibold">267 kr → 0 kr</span>
                </div>
                <div className="border-t border-amber-400/30 pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>Du sparer:</span>
                  <span className="text-amber-400">1479 kr/md</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-6 text-lg">
              Få Erhverv Abonnement
            </Button>

            <p className="text-xs text-center text-white/60 mt-4">
              Ingen binding · Stop når som helst
            </p>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-200">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 text-center">
            Sammenligning
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-600">Uden Abonnement</th>
                  <th className="text-center py-4 px-4 font-bold text-primary">Med Abonnement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-4 font-medium text-slate-900">Timepris (dag)</td>
                  <td className="text-center py-4 px-4 text-slate-600">550-850 kr</td>
                  <td className="text-center py-4 px-4 text-emerald-600 font-bold">495-723 kr</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-slate-900">Transport</td>
                  <td className="text-center py-4 px-4 text-slate-600">300 kr</td>
                  <td className="text-center py-4 px-4 text-emerald-600 font-bold">Gratis</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-slate-900">Ventetid</td>
                  <td className="text-center py-4 px-4 text-slate-600">3-5 dage</td>
                  <td className="text-center py-4 px-4 text-emerald-600 font-bold">1-2 dage</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-slate-900">Årlig tjek</td>
                  <td className="text-center py-4 px-4 text-slate-600">800 kr</td>
                  <td className="text-center py-4 px-4 text-emerald-600 font-bold">Inkluderet</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-slate-900">Materialer</td>
                  <td className="text-center py-4 px-4 text-slate-600">Fuld pris</td>
                  <td className="text-center py-4 px-4 text-emerald-600 font-bold">-10-15% rabat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abonnement;
