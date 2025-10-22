import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return response.data.productByHandle;
    },
  });

  const handleAddToCart = () => {
    if (!data) return;

    const selectedVariant = data.variants.edges[selectedVariantIndex]?.node;
    
    if (!selectedVariant) {
      toast.error("Produktet er ikke tilgængeligt");
      return;
    }

    const cartItem = {
      product: { node: data },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Tilføjet til kurv", {
      description: data.title,
      position: "top-center"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Produkt ikke fundet</h1>
        </div>
      </div>
    );
  }

  const selectedVariant = data.variants.edges[selectedVariantIndex]?.node;
  const price = parseFloat(selectedVariant?.price.amount || data.priceRange.minVariantPrice.amount);
  const currency = selectedVariant?.price.currencyCode || data.priceRange.minVariantPrice.currencyCode;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary/10">
              {data.images.edges[0]?.node.url ? (
                <img
                  src={data.images.edges[0].node.url}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Intet billede
                </div>
              )}
            </div>
            
            {data.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {data.images.edges.slice(1, 5).map((image, idx) => (
                  <div key={idx} className="aspect-square overflow-hidden rounded-md bg-secondary/10">
                    <img
                      src={image.node.url}
                      alt={`${data.title} ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
              <p className="text-3xl font-bold text-accent">
                {currency} {price.toFixed(2)}
              </p>
            </div>

            {data.description && (
              <div>
                <h2 className="font-semibold mb-2">Beskrivelse</h2>
                <p className="text-muted-foreground">{data.description}</p>
              </div>
            )}

            {data.options && data.options.length > 0 && data.options[0].values.length > 1 && (
              <div>
                <h2 className="font-semibold mb-2">{data.options[0].name}</h2>
                <div className="flex flex-wrap gap-2">
                  {data.variants.edges.map((variant, idx) => (
                    <Button
                      key={variant.node.id}
                      variant={selectedVariantIndex === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariantIndex(idx)}
                    >
                      {variant.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleAddToCart}
              size="lg"
              className="w-full"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Læg i kurv
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
