import { Check, Home, Building, ChevronDown, Lightbulb, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

      {/* Hero Section - Modern & Clean */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
              SPAR PENGE
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-foreground">
              Spar 20% Med Abonnement
            </h1>
            <p className="text-xl text-muted-foreground">
              Fast lav månedspris på alle el-opgaver
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Subscription Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* Private Subscription - Modern Card */}
          <Card className="relative overflow-hidden bg-white border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">Privat</h3>
              <p className="text-muted-foreground mb-8">For boligejere</p>

              <div className="mb-8">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-6xl font-black text-foreground">249</span>
                  <span className="text-2xl font-semibold text-muted-foreground">kr</span>
                </div>
                <p className="text-muted-foreground">/måned</p>
              </div>

              <div className="space-y-4 mb-10 text-left">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-foreground">20% rabat på alle timer</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-foreground">Standard: 510 kr → 408 kr</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-foreground">Spar 102 kr per time</p>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                size="lg"
                onClick={() => handleBuySubscription('private')}
                disabled={isLoading || purchasingType !== null}
              >
                {purchasingType === 'private' ? 'Opretter køb...' : 'Køb Privat Abonnement'}
              </Button>

              <p className="text-sm text-muted-foreground mt-6">
                Ingen binding · Stop når som helst
              </p>
            </div>
          </Card>

          {/* Business Subscription - Modern Dark Card */}
          <Card className="relative overflow-hidden bg-slate-900 border-2 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-orange-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-orange-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Erhverv</h3>
              <p className="text-white/70 mb-8">For virksomheder</p>

              <div className="mb-8">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-6xl font-black text-white">349</span>
                  <span className="text-2xl font-semibold text-white/70">kr</span>
                </div>
                <p className="text-white/70">/måned</p>
              </div>

              <div className="space-y-4 mb-10 text-left">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-white">20% rabat på alle timer</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-white">Standard: 550 kr → 440 kr</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <p className="text-white">Spar 110 kr per time</p>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-slate-900 font-bold py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                size="lg"
                onClick={() => handleBuySubscription('business')}
                disabled={isLoading || purchasingType !== null}
              >
                {purchasingType === 'business' ? 'Opretter køb...' : 'Køb Erhverv Abonnement'}
              </Button>

              <p className="text-sm text-white/60 mt-6">
                Ingen binding · Stop når som helst
              </p>
            </div>
          </Card>
        </div>

        {/* Value Proposition - Accordion Style */}
        <div className="mb-32 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Hvornår giver det mening?
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Vi viser dig præcist hvornår abonnementet tjener sig ind
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-xl px-6 bg-white hover:bg-muted/30 transition-colors">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">❌</span>
                  <span className="font-bold text-lg">Du bruger os 1-2 gange om året</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-2">
                <div className="space-y-4 text-muted-foreground">
                  <p className="font-medium text-foreground">Eksempel: 2 timers arbejde (skifte stikkontakter)</p>
                  
                  <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span>Uden abonnement:</span>
                      <span className="font-semibold text-foreground">1.020 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Med abonnement:</span>
                      <span className="font-semibold text-foreground">3.804 kr</span>
                    </div>
                    <div className="h-px bg-border my-2"></div>
                    <div className="flex justify-between text-destructive font-bold">
                      <span>Du taber:</span>
                      <span>2.784 kr</span>
                    </div>
                  </div>
                  
                  <p className="font-medium text-destructive">→ Abonnement giver ikke mening</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-xl px-6 bg-white hover:bg-muted/30 transition-colors">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">⚖️</span>
                  <span className="font-bold text-lg">Du bruger os 3-4 gange om året</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-2">
                <div className="space-y-4 text-muted-foreground">
                  <p className="font-medium text-foreground">Eksempel: 8 timers arbejde årligt (vedligehold, små reparationer)</p>
                  
                  <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span>Uden abonnement:</span>
                      <span className="font-semibold text-foreground">4.080 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Med abonnement:</span>
                      <span className="font-semibold text-foreground">6.252 kr</span>
                    </div>
                  </div>
                  
                  <p>Men du får fast lav pris hele året</p>
                  <p className="font-medium text-amber-600">→ Kan give mening hvis du vil have forudsigelighed</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-xl px-6 bg-white hover:bg-muted/30 transition-colors">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">✅</span>
                  <span className="font-bold text-lg">Større projekt eller regelmæssig brug</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-2">
                <div className="space-y-4 text-muted-foreground">
                  <p className="font-medium text-foreground">Eksempel: Nyt badeværelse (10 timer)</p>
                  
                  <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <span>Uden abonnement:</span>
                      <span className="font-semibold text-foreground">5.100 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Med abonnement:</span>
                      <span className="font-semibold text-foreground">4.080 kr</span>
                    </div>
                    <div className="h-px bg-border my-2"></div>
                    <div className="flex justify-between text-primary font-bold">
                      <span>Du sparer:</span>
                      <span>1.020 kr</span>
                    </div>
                  </div>
                  
                  <p className="text-sm">Du sparer bare på projektet</p>
                  <p className="font-medium text-primary">→ Abonnement giver god mening</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Simple Rule of Thumb Box */}
          <Card className="mt-12 bg-blue-50 border-2 border-primary/20">
            <div className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Tommelfingerregel</h3>
              </div>
              <p className="text-lg text-foreground mb-2">
                Bruger du os til <span className="font-bold text-primary">8+ timer om året</span>,
              </p>
              <p className="text-lg text-foreground mb-4">
                eller har du <span className="font-bold text-primary">ét større projekt</span>?
              </p>
              <p className="text-xl font-bold text-primary">
                → Så giver abonnement mening
              </p>
            </div>
          </Card>
        </div>

        {/* Comparison Table - Modern */}
        <div className="mb-32 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
            Sammenligning
          </h2>

          <Card className="overflow-hidden border-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left py-5 px-6 font-bold"></th>
                    <th className="text-center py-5 px-6 font-bold">Uden Abonnement</th>
                    <th className="text-center py-5 px-6 font-bold">Med Abonnement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-5 px-6 font-semibold">Timepris (dag)</td>
                    <td className="text-center py-5 px-6 text-muted-foreground">510-850 kr</td>
                    <td className="text-center py-5 px-6 text-primary font-bold">408-680 kr</td>
                  </tr>
                  <tr className="border-b bg-muted/10 hover:bg-muted/30 transition-colors">
                    <td className="py-5 px-6 font-semibold">Besparelse per time</td>
                    <td className="text-center py-5 px-6 text-muted-foreground">-</td>
                    <td className="text-center py-5 px-6 text-primary font-bold">102-170 kr</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-5 px-6 font-semibold">Fast månedspris</td>
                    <td className="text-center py-5 px-6 text-muted-foreground">Nej</td>
                    <td className="text-center py-5 px-6 text-primary font-bold">249/349 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Trust Section - Discreet */}
        <div className="mb-32">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-secondary" strokeWidth={2.5} />
              <span className="text-muted-foreground">Ingen binding</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-secondary" strokeWidth={2.5} />
              <span className="text-muted-foreground">Ingen skjulte gebyrer</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-secondary" strokeWidth={2.5} />
              <span className="text-muted-foreground">Stop når som helst</span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black mb-6">
            Ikke sikker på hvad der passer bedst?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Kontakt os så hjælper vi dig med at finde den rigtige løsning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              className="font-semibold py-6 px-8 border-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
              size="lg"
              onClick={() => window.location.href = 'tel:71997171'}
            >
              <Phone className="w-5 h-5 mr-2" />
              Ring os på 71 99 71 71
            </Button>
            <Button 
              variant="outline"
              className="font-semibold py-6 px-8 border-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Send besked
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abonnement;
