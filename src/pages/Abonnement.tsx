import { Check, Home, Building, Star, Truck, Clock, Shield, Phone, ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";

const Abonnement = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="text-sm text-white/80 mb-6">
            <Link to="/" className="hover:text-white">Hjem</Link>
            <span className="mx-2">&gt;</span>
            <Link to="/#priser" className="hover:text-white">Priser</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-white">Abonnement</span>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-bold mb-4">
              <Star className="w-4 h-4" />
              SPAR PENGE
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Abonnement - Fast Lav Pris</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Få 10% rabat på alle timer, gratis transport og prioriteret service
            </p>
          </div>
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
              <span className="text-5xl font-black text-slate-900">299</span>
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
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl border-2 border-primary/30 hover:border-primary/50 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-primary" />
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
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">10% rabat på alle timer</p>
                  <p className="text-sm text-white/70">Samme rabat som privat</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">Gratis transport under 30 km</p>
                  <p className="text-sm text-white/70">Større zone pga. længere distance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">Prioriteret booking</p>
                  <p className="text-sm text-white/70">Kom foran i køen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                <div>
                  <p className="font-semibold text-white">Kvartalsvis gratis el-tjek</p>
                  <p className="text-sm text-white/70">Mere hyppigt pga. større udstyr</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6">
              <p className="text-sm font-bold text-primary mb-2">Eksempel besparelse:</p>
              <div className="space-y-1 text-sm text-white/90">
                <div className="flex justify-between">
                  <span>8 timer service/md:</span>
                  <span className="font-semibold">4080 kr → 3672 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport (2x):</span>
                  <span className="font-semibold">600 kr → 0 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Kvartalstjek:</span>
                  <span className="font-semibold">267 kr → 0 kr</span>
                </div>
                <div className="border-t border-primary/30 pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>Du sparer:</span>
                  <span className="text-primary">1275 kr/md</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg">
              Få Erhverv Abonnement
            </Button>

            <p className="text-xs text-center text-white/60 mt-4">
              Ingen binding · Stop når som helst
            </p>
          </Card>
        </div>

        {/* Simple Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-200 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 text-center">
            Med abonnement får du
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-emerald-600" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">10% rabat på alle timer</h4>
                <p className="text-sm text-slate-600">Gælder alle tidspunkter og pakker</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-emerald-600" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Gratis transport</h4>
                <p className="text-sm text-slate-600">Privat: 20 km | Erhverv: 30 km</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-emerald-600" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Prioriteret booking</h4>
                <p className="text-sm text-slate-600">Kom foran i køen</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Gratis el-tjek</h4>
                <p className="text-sm text-slate-600">Årlig (privat) | Kvartalsvis (erhverv)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Calculator */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-xl p-8 border-2 border-emerald-200 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 text-center">
            Tjener det sig ind?
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            Se hvor meget du kan spare med et abonnement
          </p>
          
          <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Eksempel beregning:</h3>
            
            <div className="space-y-3 text-slate-700">
              <div className="flex justify-between pb-2">
                <span>1 besøg uden abonnement:</span>
                <span className="font-semibold">550 kr + 300 kr transport = 850 kr</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>1 besøg med abonnement:</span>
                <span className="font-semibold text-emerald-600">495 kr + 0 kr transport = 495 kr</span>
              </div>
              <div className="flex justify-between pb-2 border-t pt-2">
                <span className="font-bold">Du sparer per besøg:</span>
                <span className="font-bold text-emerald-600">355 kr</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="font-bold text-slate-900 mb-2">Med 3 besøg om året:</p>
              <div className="space-y-1 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Besparelse på timer og transport:</span>
                  <span className="font-semibold">355 kr × 3 = 1.065 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Gratis årlig el-tjek (værdi):</span>
                  <span className="font-semibold">800 kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Abonnement koster:</span>
                  <span className="font-semibold">299 kr × 12 = -3.588 kr</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-emerald-300 text-base">
                  <span className="font-bold">Total værdi:</span>
                  <span className="font-bold text-emerald-600">1.865 kr værdi for 3.588 kr</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Med 6+ besøg om året begynder det at give stor økonomisk mening
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-200 mb-16">
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

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-200 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 text-center">
            Ofte stillede spørgsmål
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Kan jeg opsige når som helst?",
                a: "Ja, der er ingen binding. Du kan opsige dit abonnement når som helst med 1 måneds varsel."
              },
              {
                q: "Hvad dækker garantien i de forskellige pakker?",
                a: "Garantien dækker arbejdstimer og arbejdskvalitet. Materialer har producentens garanti. Standard pakke har ingen garanti, Premium har 2 års garanti, og Eksklusiv har 5 års garanti (7 år med abonnement)."
              },
              {
                q: "Hvor langt ud kører I gratis med abonnement?",
                a: "Privat abonnement: 20 km fra vores lokation. Erhverv abonnement: 30 km fra vores lokation. Dette er for at dække erhvervs typisk længere afstande."
              },
              {
                q: "Kan jeg kombinere abonnement med alle pakker?",
                a: "Ja! Abonnementet giver 10% rabat på timepris og gratis transport uanset hvilken pakke du vælger - Standard, Premium eller Eksklusiv."
              },
              {
                q: "Hvad er forskellen på Privat og Erhverv abonnement?",
                a: "Begge koster 299 kr/md og giver 10% rabat. Erhverv får 30 km gratis transport (vs 20 km) og kvartalsvis el-tjek (vs årlig), fordi erhverv typisk har større behov."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-slate-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact/Order Form */}
        <div className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl shadow-xl p-8 text-white mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Bestil Dit Abonnement
            </h2>
            <p className="text-white/90 mb-8">
              Kontakt os for at komme i gang med dit abonnement
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold"
                asChild
              >
                <a href="tel:+4570000000" className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Ring Nu
                </a>
              </Button>
              
              <Button 
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20 font-bold border-2 border-white"
                asChild
              >
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Kontakt Os
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-white/70 mt-6">
              Ingen binding · Stop når som helst · Fair priser
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abonnement;
