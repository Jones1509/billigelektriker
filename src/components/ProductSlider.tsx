import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, ShoppingBag, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";

export const ProductSlider = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'recommended'>('popular');
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ['slider-products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 12 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  // Filter products based on active tab
  const displayProducts = data ? (
    activeTab === 'popular' 
      ? data.slice(0, 8)
      : activeTab === 'new'
      ? data.slice(4, 12)
      : data.slice(8, 16)
  ) : [];

  const itemsPerView = 4; // Desktop shows 4 items
  const maxIndex = Math.max(0, displayProducts.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - itemsPerView));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + itemsPerView));
  };

  // Reset index when tab changes
  const handleTabChange = (tab: 'popular' | 'new' | 'recommended') => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  return (
    <section 
      className="py-8 md:py-12 relative overflow-visible"
      style={{ 
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--blue-tint)) 50%, hsl(var(--blue-tint)) 100%)'
      }}
    >
      {/* Top smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[hsl(var(--background))] to-transparent pointer-events-none z-0"></div>
      
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-10">
        <div className="text-center mb-5 md:mb-7 animate-fade-in">
          {/* Webshop Badge with gradient */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-semibold mb-3 shadow-lg" 
                style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
            <Zap className="w-3.5 h-3.5" />
            {t('productSlider.badge')}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground leading-tight">
            {t('productSlider.title')}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('productSlider.subtitle')}
          </p>
          
          {/* Category Filter Tabs - Responsive */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 mb-5 rounded-full" style={{ background: '#F3F4F6' }}>
            <button
              onClick={() => handleTabChange('popular')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-[15px] font-medium transition-all duration-300 ${
                activeTab === 'popular' 
                  ? 'bg-white shadow-md font-semibold' 
                  : 'bg-transparent hover:text-[#2563EB]'
              }`}
              style={{ color: activeTab === 'popular' ? '#2563EB' : '#6B7280' }}
            >
              Mest Populær
            </button>
            <button
              onClick={() => handleTabChange('new')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-[15px] font-medium transition-all duration-300 ${
                activeTab === 'new' 
                  ? 'bg-white shadow-md font-semibold' 
                  : 'bg-transparent hover:text-[#2563EB]'
              }`}
              style={{ color: activeTab === 'new' ? '#2563EB' : '#6B7280' }}
            >
              Nyhed
            </button>
            <button
              onClick={() => handleTabChange('recommended')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-[15px] font-medium transition-all duration-300 ${
                activeTab === 'recommended' 
                  ? 'bg-white shadow-md font-semibold' 
                  : 'bg-transparent hover:text-[#2563EB]'
              }`}
              style={{ color: activeTab === 'recommended' ? '#2563EB' : '#6B7280' }}
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
        ) : displayProducts.length > 0 ? (
          <div className="relative">
            {/* Navigation Arrows - Desktop & Tablet */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="hidden lg:flex absolute left-[-70px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white border-2 border-slate-200 rounded-full transition-all duration-300 hover:bg-[#2563EB] hover:border-[#2563EB] hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:scale-100 shadow-lg group"
              aria-label="Forrige produkter"
            >
              <ChevronLeft className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors" />
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="hidden lg:flex absolute right-[-70px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white border-2 border-slate-200 rounded-full transition-all duration-300 hover:bg-[#2563EB] hover:border-[#2563EB] hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:scale-100 shadow-lg group"
              aria-label="Næste produkter"
            >
              <ChevronRight className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors" />
            </button>

            {/* Overflow container */}
            <div className="overflow-hidden">
              <div 
                ref={scrollContainerRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 transition-transform duration-400 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                }}
              >
                {displayProducts.map((product, index) => (
                  <div 
                    key={product.node.id} 
                    className="w-full animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
