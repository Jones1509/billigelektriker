import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, ShoppingBag, Zap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const ProductSlider = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'recommended'>('popular');
  
  const { data, isLoading } = useQuery({
    queryKey: ['slider-products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 8 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  return (
    <section 
      className="py-12 md:py-20 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--blue-tint)) 50%, hsl(var(--blue-tint)) 100%)',
        maxHeight: '800px'
      }}
    >
      {/* Top smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(var(--background))] to-transparent pointer-events-none z-0"></div>
      
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-10">
        <div className="text-center mb-10 animate-fade-in">
          {/* Webshop Badge with gradient */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold mb-4 shadow-lg" 
                style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
            <Zap className="w-4 h-4" />
            {t('productSlider.badge')}
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {t('productSlider.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('productSlider.subtitle')}
          </p>
          
          {/* Category Filter Tabs */}
          <div className="inline-flex items-center gap-1.5 bg-muted/50 rounded-full p-1.5 mb-6">
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'popular' 
                  ? 'bg-background text-primary shadow-md font-semibold' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Mest Populær
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'new' 
                  ? 'bg-background text-primary shadow-md font-semibold' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Nyhed
            </button>
            <button
              onClick={() => setActiveTab('recommended')}
              className={`px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'recommended' 
                  ? 'bg-background text-primary shadow-md font-semibold' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Anbefalet
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <div className="absolute inset-0 h-12 w-12 animate-ping text-primary/20">
                <Loader2 className="h-12 w-12" />
              </div>
            </div>
          </div>
        ) : data && data.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-6">
              {data.slice(0, 8).map((product, index) => (
                <CarouselItem 
                  key={product.node.id} 
                  className="pl-3 md:pl-6 basis-[85%] xs:basis-[75%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-full animate-fade-in">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex -left-12 h-12 w-12 bg-background border-2 border-border hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300 shadow-lg" />
            <CarouselNext className="hidden lg:flex -right-12 h-12 w-12 bg-background border-2 border-border hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300 shadow-lg" />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground text-lg">
              {t('productSlider.comingSoon')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
