import { Check, Home, Building, X, Scale, TrendingUp, Shield, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";

const Abonnement = () => {
  const navigate = useNavigate();
  const { addItem, createCheckout, isLoading } = useCartStore();
  const [purchasingType, setPurchasingType] = useState<'private' | 'business' | null>(null);

  const handleBuySubscription = async (type: 'private' | 'business') => {
    setPurchasingType(type);
    
    try {
      // Create a mock product for subscription (in real implementation, this would be a Shopify subscription product)
      const subscriptionProduct = {
        node: {
          id: type === 'private' ? 'gid://shopify/Product/private-sub' : 'gid://shopify/Product/business-sub',
          title: type === 'private' ? 'Privat Abonnement' : 'Erhverv Abonnement',
          description: type === 'private' 
            ? 'Spar 20% på alle timepriser med vores private abonnement'
            : 'Spar 20% på alle timepriser med vores erhverv abonnement',
          handle: type === 'private' ? 'privat-abonnement' : 'erhverv-abonnement',
          priceRange: {
            minVariantPrice: {
              amount: type === 'private' ? '249' : '349',
              currencyCode: 'DKK',
            }
          },
          images: { edges: [] },
          variants: {
            edges: [{
              node: {
                id: type === 'private' ? 'gid://shopify/ProductVariant/private-sub-variant' : 'gid://shopify/ProductVariant/business-sub-variant',
                title: 'Default',
                price: {
                  amount: type === 'private' ? '249' : '349',
                  currencyCode: 'DKK',
                },
                availableForSale: true,
                selectedOptions: [{
                  name: 'Type',
                  value: type === 'private' ? 'Privat' : 'Erhverv'
                }]
              }
            }]
          },
          options: []
        }
      };

      const cartItem = {
        product: subscriptionProduct,
        variantId: subscriptionProduct.node.variants.edges[0].node.id,
        variantTitle: subscriptionProduct.node.variants.edges[0].node.title,
        price: subscriptionProduct.node.variants.edges[0].node.price,
        quantity: 1,
        selectedOptions: subscriptionProduct.node.variants.edges[0].node.selectedOptions
      };

      addItem(cartItem);
      
      toast.success('Tilføjet til kurv', {
        description: `${type === 'private' ? 'Privat' : 'Erhverv'} Abonnement er tilføjet. Går til checkout...`,
      });

      // Create checkout and redirect
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      console.error('Failed to purchase subscription:', error);
      toast.error('Kunne ikke oprette køb', {
        description: 'Prøv venligst igen eller kontakt os for hjælp.',
      });
    } finally {
      setPurchasingType(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Hjem</button>
          <span>›</span>
          <span className="text-foreground font-medium">Abonnement</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/25">
            <TrendingUp className="w-4 h-4 mr-2" />
            SPAR 20% PÅ ALLE TIMER
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-4">Spar 20% På Alle Timer</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Fast lav månedspris - Perfekt til regelmæssigt vedligehold
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 pb-24">
        {/* Subscription Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* Private Subscription */}
          <Card className="relative overflow-hidden bg-card border-2 hover:border-primary/50 transition-all shadow-lg">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Home className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Privat Abonnement</h3>
                  <p className="text-muted-foreground">For boligejere</p>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-foreground">249</span>
                <span className="text-xl font-semibold text-muted-foreground">kr/måned</span>
              </div>

              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Billigere for private
              </Badge>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-foreground">20% rabat på alle timepriser</p>
                    <p className="text-sm text-muted-foreground">Spar 102 kr per time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-foreground">Eksempel besparelse</p>
                    <p className="text-sm text-muted-foreground">Standard: 510 kr → 408 kr</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-foreground">Ingen binding</p>
                    <p className="text-sm text-muted-foreground">Stop når som helst</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6"
                size="lg"
                onClick={() => handleBuySubscription('private')}
                disabled={isLoading || purchasingType !== null}
              >
                {purchasingType === 'private' ? 'Opretter køb...' : 'Køb Privat Abonnement - 249 kr/md'}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Ingen binding · Stop når som helst
              </p>
            </div>
          </Card>

          {/* Business Subscription */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-amber-500/30 hover:border-amber-500/50 transition-all shadow-xl">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-amber-400/20 rounded-2xl flex items-center justify-center">
                  <Building className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Erhverv Abonnement</h3>
                  <p className="text-white/70">For virksomheder</p>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-white">349</span>
                <span className="text-xl font-semibold text-white/70">kr/måned</span>
              </div>

              <Badge className="mb-6 bg-amber-400/20 text-amber-300 border-amber-400/30">
                For erhverv
              </Badge>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-white">20% rabat på alle timepriser</p>
                    <p className="text-sm text-white/80">Spar 110 kr per time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-white">Eksempel besparelse</p>
                    <p className="text-sm text-white/80">Standard: 550 kr → 440 kr</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <div>
                    <p className="font-semibold text-white">Perfekt til vedligehold</p>
                    <p className="text-sm text-white/80">Regelmæssig service til bedste pris</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-6"
                size="lg"
                onClick={() => handleBuySubscription('business')}
                disabled={isLoading || purchasingType !== null}
              >
                {purchasingType === 'business' ? 'Opretter køb...' : 'Køb Erhverv Abonnement - 349 kr/md'}
              </Button>

              <p className="text-xs text-center text-white/60 mt-4">
                Ingen binding · Stop når som helst
              </p>
            </div>
          </Card>
        </div>

        {/* Value Proposition - When does it pay off? */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            Tjener det sig ind?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Vi viser dig præcis hvornår abonnementet begynder at give værdi
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Not worth it */}
            <Card className="border-2 border-destructive/20 bg-destructive/5">
              <div className="p-6">
                <div className="w-14 h-14 bg-destructive/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <X className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Kun 2 besøg om året</h3>
                
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uden abonnement:</span>
                    <span className="font-semibold">1.020 kr</span>
                  </div>
                  <div className="text-xs text-muted-foreground">2 × 510 kr</div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Med abonnement:</span>
                    <span className="font-semibold">3.804 kr</span>
                  </div>
                  <div className="text-xs text-muted-foreground">2 × 408 kr + (249 × 12 md)</div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-destructive font-bold">
                      <span>Forskel:</span>
                      <span>-2.784 kr</span>
                    </div>
                  </div>
                </div>

                <Badge className="w-full justify-center bg-destructive/10 text-destructive border-destructive/20">
                  Ikke værd det ved få besøg
                </Badge>
              </div>
            </Card>

            {/* Break-even */}
            <Card className="border-2 border-amber-500/30 bg-amber-500/5">
              <div className="p-6">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Scale className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">8+ timer om året</h3>
                
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uden abonnement:</span>
                    <span className="font-semibold">4.080 kr</span>
                  </div>
                  <div className="text-xs text-muted-foreground">8 × 510 kr</div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Med abonnement:</span>
                    <span className="font-semibold">6.252 kr</span>
                  </div>
                  <div className="text-xs text-muted-foreground">8 × 408 kr + (249 × 12 md)</div>
                  
                  <div className="pt-3 border-t">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Spart på timer:</span>
                        <span className="text-primary font-semibold">816 kr</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Abonnement/år:</span>
                        <span>2.988 kr</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Badge className="w-full justify-center bg-amber-500/10 text-amber-700 border-amber-500/20">
                  Begynder at tjene sig ind
                </Badge>
              </div>
            </Card>

            {/* Worth it */}
            <Card className="border-2 border-primary/30 bg-primary/5">
              <div className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Større projekter</h3>
                
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">10 timer uden:</span>
                    <span className="font-semibold">5.100 kr</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">10 timer med:</span>
                    <span className="font-semibold">4.080 kr</span>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-primary font-bold">
                      <span>Du sparer:</span>
                      <span>1.020 kr</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground mt-2">
                    På ét projekt + abonnement tjener du penge
                  </div>
                </div>

                <Badge className="w-full justify-center bg-primary/10 text-primary border-primary/20">
                  Spar 1.000+ kr årligt
                </Badge>
              </div>
            </Card>
          </div>

          {/* Sweet spot callout */}
          <Card className="mt-8 bg-primary/5 border-2 border-primary/20">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 text-primary">
                <TrendingUp className="w-6 h-6" />
                <p className="text-lg font-bold">
                  Sweet spot: Bruger du os 8+ timer om året, eller har ét større projekt, tjener abonnementet sig ind.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Sammenligning
          </h2>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 bg-muted/30">
                    <th className="text-left py-4 px-6 font-bold text-foreground">Feature</th>
                    <th className="text-center py-4 px-6 font-bold text-muted-foreground">Uden Abonnement</th>
                    <th className="text-center py-4 px-6 font-bold text-primary">Med Abonnement</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 font-medium">Timepris (dagtid)</td>
                    <td className="text-center py-4 px-6 text-muted-foreground">510-850 kr</td>
                    <td className="text-center py-4 px-6 text-primary font-bold">408-680 kr</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 font-medium">Besparelse per time</td>
                    <td className="text-center py-4 px-6 text-muted-foreground">-</td>
                    <td className="text-center py-4 px-6 text-primary font-bold">102-170 kr</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 font-medium">Pris forudsigelighed</td>
                    <td className="text-center py-4 px-6 text-muted-foreground">Nej</td>
                    <td className="text-center py-4 px-6 text-primary font-bold">Ja, fast lav pris</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 font-medium">Månedlig omkostning</td>
                    <td className="text-center py-4 px-6 text-muted-foreground">Variabel</td>
                    <td className="text-center py-4 px-6 text-primary font-bold">Fast 249/349 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Trust & Security Section */}
        <div className="mb-24">
          <Card className="border-2">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-8">Tryghed & Sikkerhed</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Ingen binding</h3>
                  <p className="text-sm text-muted-foreground">Stop når som helst - ingen opsigelsesgebyr</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Ingen skjulte gebyrer</h3>
                  <p className="text-sm text-muted-foreground">Kun den faste månedlige pris</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Start i dag</h3>
                  <p className="text-sm text-muted-foreground">Betal første gang næste måned</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-black mb-4">
            Klar til at spare penge?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vælg det abonnement der passer til dine behov og begynd at spare på alle dine el-opgaver
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 px-8"
              size="lg"
              onClick={() => handleBuySubscription('private')}
              disabled={isLoading || purchasingType !== null}
            >
              {purchasingType === 'private' ? 'Opretter køb...' : 'Køb Privat - 249 kr/md'}
            </Button>
            <Button 
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-6 px-8"
              size="lg"
              onClick={() => handleBuySubscription('business')}
              disabled={isLoading || purchasingType !== null}
            >
              {purchasingType === 'business' ? 'Opretter køb...' : 'Køb Erhverv - 349 kr/md'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abonnement;
