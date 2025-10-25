import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ModernProductCard } from "./ModernProductCard";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { id: "all", label: "Alle produkter" },
  { id: "smart", label: "Smart Lys" },
  { id: "outlets", label: "Stikkontakter" },
  { id: "security", label: "Sikkerhed" },
  { id: "outdoor", label: "Udendørs" },
  { id: "sale", label: "Tilbud" },
];

const sortOptions = [
  { id: "popular", label: "Populære" },
  { id: "price-asc", label: "Pris: Lav til høj" },
  { id: "price-desc", label: "Pris: Høj til lav" },
  { id: "newest", label: "Nyeste først" },
];

export const ModernProductGrid = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [displayCount, setDisplayCount] = useState(8);
  
  const { data, isLoading } = useQuery({
    queryKey: ['modern-products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  const sortedProducts = data ? [...data].sort((a, b) => {
    const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
    const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
    
    switch (sortBy) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      default:
        return 0;
    }
  }) : [];

  const displayedProducts = sortedProducts.slice(0, displayCount);
  const hasMore = sortedProducts.length > displayCount;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-blue-tint/30 to-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.06),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]"></div>
      
      <div className="container relative z-10 px-4 md:px-0">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            ⚡ Webshop
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Populære produkter i webshoppen
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Håndplukket smart lys til inde og ude – hurtig levering direkte til døren
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 md:mb-12">
          {/* Categories */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                    transition-all duration-300 hover:-translate-y-0.5
                    ${selectedCategory === category.id 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                      : 'bg-background border border-border hover:border-primary/50 hover:shadow-md'
                    }
                  `}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:border-primary/50 transition-colors cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {displayedProducts.map((product, index) => (
                <div
                  key={product.node.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ModernProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={() => setDisplayCount(prev => prev + 8)}
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Se flere produkter
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground text-lg mb-4">
              Ingen produkter fundet
            </p>
            <p className="text-sm text-muted-foreground">
              Fortæl os hvad du søger, så hjælper vi dig med at finde det rigtige produkt
            </p>
          </div>
        )}

        {/* Trust Elements */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>Gratis fragt over 500 kr</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>30 dages returret</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span>2 års garanti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
