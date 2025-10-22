import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const ProductSlider = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['slider-products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 8 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  return (
    <section 
      className="py-20" 
      style={{ backgroundColor: 'hsl(var(--blue-tint))' }}
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Populære produkter i webshoppen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Håndplukket smart lys til inde og ude – hurtig levering.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : data && data.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {data.map((product) => (
                <CarouselItem key={product.node.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Produkter kommer snart!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
