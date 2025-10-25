import { Check, Home, Building, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";

const Abonnement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <button onClick={() => navigate('/')} className="hover:text-primary">Hjem</button>
          <span>›</span>
          <span className="text-slate-900 font-semibold">Abonnement</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-bold mb-4">
            <Calculator className="w-4 h-4" />
            SPAR 20% PÅ ALLE TIMER
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-3">Spar 20% Med Abonnement</h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Fast månedspris - Aflås lavere timepriser på alle vores services
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 pb-16">
        {/* Subscription Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          
          {/* Private Subscription */}
          <Card className="p-6 md:p-8 bg-white shadow-xl border-2 border-slate-200 hover:border-primary/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900">Privat Abonnement</h3>
                <p className="text-sm text-slate-600">Billigere for private</p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl md:text-5xl font-black text-slate-900">249</span>
              <span className="text-lg md:text-xl font-bold text-slate-600">kr/måned</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-emerald-900 mb-2">Hvad du får:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-emerald-900">20% rabat på alle timepriser</p>
                    <p className="text-emerald-700">Spar 102-170 kr per time</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-emerald-900">Eksempel: Standard går fra 510 kr → 408 kr</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 text-base md:text-lg mb-3">
              Køb Privat Abonnement - 249 kr/md
            </Button>

            <p className="text-xs text-center text-slate-500">
              Ingen binding · Stop når som helst
            </p>
          </Card>

          {/* Business Subscription */}
          <Card className="p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white">Erhverv Abonnement</h3>
                <p className="text-sm text-white/70">For virksomheder</p>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl md:text-5xl font-black text-white">349</span>
              <span className="text-lg md:text-xl font-bold text-white/70">kr/måned</span>
            </div>

            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-amber-300 mb-2">Hvad du får:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-white">20% rabat på alle timepriser</p>
                    <p className="text-white/80">Spar 110-180 kr per time</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-white">Eksempel: Standard går fra 550 kr → 440 kr</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-5 text-base md:text-lg mb-3">
              Køb Erhverv Abonnement - 349 kr/md
            </Button>

            <p className="text-xs text-center text-white/60">
              Ingen binding · Stop når som helst
            </p>
          </Card>
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-slate-200 mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 text-center">
            Hvorfor vælge abonnement?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-3">
                <span className="text-2xl">❌</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Kun 2 besøg om året</h4>
              <p className="text-sm text-slate-600 mb-2">Uden: 2 × 510 kr = 1020 kr</p>
              <p className="text-sm text-slate-600">Med: 2 × 408 kr + 2988 kr = 3804 kr</p>
              <p className="text-xs font-semibold text-red-600 mt-2">Ikke værd det</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-xl mb-3">
                <span className="text-2xl">⚖️</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">8+ timer om året</h4>
              <p className="text-sm text-slate-600 mb-2">Uden: 8 × 510 kr = 4080 kr</p>
              <p className="text-sm text-slate-600">Med: 8 × 408 kr + 2988 kr = 6252 kr</p>
              <p className="text-xs font-semibold text-emerald-600 mt-2">Begynder at spare</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Større projekter</h4>
              <p className="text-sm text-slate-600 mb-2">10 timer uden: 5100 kr</p>
              <p className="text-sm text-slate-600">10 timer med: 4080 kr</p>
              <p className="text-xs font-semibold text-emerald-600 mt-2">Spar 1020 kr på ét projekt</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 border-2 border-primary/20 rounded-xl text-center">
            <p className="text-sm md:text-base font-bold text-primary">
              💡 Sweet spot: Bruger du os 8+ timer om året, tjener abonnementet sig ind
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-slate-200">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 text-center">
            Sammenligning
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-2 md:px-4 font-bold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-2 md:px-4 font-bold text-slate-600">Uden Abonnement</th>
                  <th className="text-center py-4 px-2 md:px-4 font-bold text-primary">Med Abonnement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-2 md:px-4 font-medium text-slate-900">Timepris (dag)</td>
                  <td className="text-center py-4 px-2 md:px-4 text-slate-600">510-850 kr</td>
                  <td className="text-center py-4 px-2 md:px-4 text-emerald-600 font-bold">408-680 kr</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 md:px-4 font-medium text-slate-900">Besparelse</td>
                  <td className="text-center py-4 px-2 md:px-4 text-slate-600">-</td>
                  <td className="text-center py-4 px-2 md:px-4 text-emerald-600 font-bold">20% på alt</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 md:px-4 font-medium text-slate-900">Pris forudsigelighed</td>
                  <td className="text-center py-4 px-2 md:px-4 text-slate-600">Nej</td>
                  <td className="text-center py-4 px-2 md:px-4 text-emerald-600 font-bold">Ja, fast lav pris</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
            Klar til at spare penge?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Vælg det abonnement der passer til dine behov og begynd at spare på alle dine el-opgaver
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-5 px-8 text-lg">
              Køb Privat Abonnement - 249 kr/md
            </Button>
            <Button className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-5 px-8 text-lg">
              Køb Erhverv Abonnement - 349 kr/md
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abonnement;
