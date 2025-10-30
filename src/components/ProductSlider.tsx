import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, COLLECTION_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│  COLLECTION CONFIGURATION GUIDE                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Dette objekt styrer hvilke Shopify Collections der vises under hver tab.  │
│                                                                             │
│  HVORDAN MAN ÆNDRER COLLECTIONS:                                            │
│  ───────────────────────────────                                            │
│                                                                             │
│  1. Gå til Shopify Admin → Products → Collections                          │
│  2. Find din collection og noter "handle" fra URL                          │
│     (f.eks. URL: /collections/summer-sale → handle: "summer-sale")         │
│  3. Ændr 'shopifyHandle' nedenfor til din collection handle                │
│  4. Ændr 'label' til det ønskede tab navn (valgfrit)                       │
│  5. Gem filen - færdig!                                                     │
│                                                                             │
│  EKSEMPEL 1: Ændre "Mest Populær" til "Tilbud" collection                  │
│  ──────────────────────────────────────────────────────────                 │
│  Fra:                                                                       │
│    popular: {                                                               │
│      label: 'Mest Populær',                                                 │
│      shopifyHandle: 'mest-populaer'                                         │
│    }                                                                        │
│                                                                             │
│  Til:                                                                       │
│    popular: {                                                               │
│      label: 'Tilbud',                                                       │
│      shopifyHandle: 'summer-tilbud'                                         │
│    }                                                                        │
│                                                                             │
│  EKSEMPEL 2: Ændre "Nyhed" til "Bestsellers" collection                    │
│  ────────────────────────────────────────────────────────                   │
│  Fra:                                                                       │
│    new: {                                                                   │
│      label: 'Nyhed',                                                        │
│      shopifyHandle: 'nyheder'                                               │
│    }                                                                        │
│                                                                             │
│  Til:                                                                       │
│    new: {                                                                   │
│      label: 'Bestsellers',                                                  │
│      shopifyHandle: 'bestsellers'                                           │
│    }                                                                        │
│                                                                             │
│  VIGTIGT:                                                                   │
│  ────────                                                                   │
│  • Brug ALTID collection handle fra Shopify (ikke collection titel)        │
│  • Collection handle er altid lowercase og bruger bindestreger             │
│  • Design og funktionalitet påvirkes IKKE af denne ændring                 │
│  • Hvis collection er tom, vises fallback produkter automatisk             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// ============================================================================
// COLLECTION CONFIGURATION
// Rediger kun dette objekt for at ændre collections
// ============================================================================

const COLLECTION_CONFIG = {
  popular: {
    label: 'Mest Populær',
    shopifyHandle: 'mest-populaer',
    key: 'popular' as const
  },
  new: {
    label: 'Nyhed',
    shopifyHandle: 'nyheder',
    key: 'new' as const
  },
  recommended: {
    label: 'Anbefalet',
    shopifyHandle: 'anbefalet',
    key: 'recommended' as const
  }
} as const;

// Validation function - tjekker at configuration er korrekt
const validateCollectionConfig = () => {
  const tabs = Object.keys(COLLECTION_CONFIG) as Array<keyof typeof COLLECTION_CONFIG>;
  
  tabs.forEach(tabKey => {
    const config = COLLECTION_CONFIG[tabKey];
    
    if (!config.shopifyHandle) {
      console.error(`❌ Tab "${tabKey}" mangler shopifyHandle i COLLECTION_CONFIG!`);
    }
    
    if (!config.label) {
      console.error(`❌ Tab "${tabKey}" mangler label i COLLECTION_CONFIG!`);
    }
    
    if (config.shopifyHandle && config.shopifyHandle.includes(' ')) {
      console.warn(`⚠️ Collection handle "${config.shopifyHandle}" indeholder mellemrum - det er sandsynligvis forkert. Shopify handles bruger bindestreger (-) i stedet.`);
    }
  });
  
  console.log('✅ Collection configuration valideret:', {
    popular: COLLECTION_CONFIG.popular.shopifyHandle,
    new: COLLECTION_CONFIG.new.shopifyHandle,
    recommended: COLLECTION_CONFIG.recommended.shopifyHandle
  });
};

export const ProductSlider = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<keyof typeof COLLECTION_CONFIG>('popular');
  
  // Validate configuration on component mount
  useEffect(() => {
    validateCollectionConfig();
  }, []);
  
  // Embla Carousel setup with responsive slides
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: true,
    skipSnaps: false,
    slidesToScroll: 1,
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Update scroll buttons
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Fetch products from Shopify Collection based on active tab
  const { data: collectionData, isLoading } = useQuery({
    queryKey: ['collection-products', activeTab],
    queryFn: async () => {
      const collectionHandle = COLLECTION_CONFIG[activeTab].shopifyHandle;
      console.log('🔵 FETCHING COLLECTION:', collectionHandle, 'for tab:', activeTab);
      
      const response = await storefrontApiRequest(COLLECTION_QUERY, { 
        handle: collectionHandle, 
        first: 12 
      });
      
      console.log('📦 COLLECTION RESPONSE:', response.data.collection);
      
      // If collection is empty or doesn't exist, fallback to all products
      if (!response.data.collection || response.data.collection.products.edges.length === 0) {
        console.warn(`⚠️ Collection "${collectionHandle}" er tom eller findes ikke. Bruger alle produkter som fallback.`);
        const fallbackResponse = await storefrontApiRequest(STOREFRONT_QUERY, { first: 12 });
        console.log('📦 FALLBACK PRODUCTS:', fallbackResponse.data.products.edges.length, 'produkter');
        return fallbackResponse.data.products.edges as ShopifyProduct[];
      }
      
      console.log('✅ COLLECTION PRODUKTER:', response.data.collection.products.edges.length, 'produkter fra', collectionHandle);
      return response.data.collection.products.edges as ShopifyProduct[];
    },
  });

  // Base products from collection
  const baseProducts = collectionData || [];
  
  console.log('📊 CURRENT STATE:', {
    activeTab,
    collectionHandle: COLLECTION_CONFIG[activeTab].shopifyHandle,
    productsCount: baseProducts.length,
    isLoading
  });

  // Reinitialize Embla when products change
  useEffect(() => {
    if (emblaApi && baseProducts.length > 0) {
      emblaApi.reInit();
    }
  }, [emblaApi, baseProducts]);

  const handleTabChange = (tab: keyof typeof COLLECTION_CONFIG) => {
    // Ignore if same tab is already active
    if (activeTab === tab || isLoading) {
      console.log('⚠️ Same tab or loading, ignoring click');
      return;
    }
    
    console.log('🎯 TAB CLICKED:', tab);
    
    // Change tab (will trigger new data fetch)
    setActiveTab(tab);
  };

  return (
    <section className="product-carousel-wrapper relative z-[1]" aria-label="Populære produkter i webshoppen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]" aria-hidden="true"></div>
      
      <div className="carousel-inner-wrapper">
        {/* Header section */}
        <div className="text-center mb-8 md:mb-10 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-semibold mb-3 shadow-lg" 
                style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            {t('productSlider.badge')}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground leading-tight">
            {t('productSlider.title')}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('productSlider.subtitle')}
          </p>
          
          {/* Tab buttons - Labels come from COLLECTION_CONFIG */}
          <nav aria-label="Produktfiltre">
            <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 mb-10 md:mb-8 rounded-full relative z-[1]" style={{ background: '#F3F4F6' }} role="tablist">
              <button
                onClick={() => handleTabChange('popular')}
                disabled={isLoading}
                role="tab"
                aria-selected={activeTab === 'popular'}
                style={{ 
                  color: activeTab === 'popular' ? '#2563EB' : '#6B7280', 
                  transitionDuration: '300ms',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  pointerEvents: isLoading ? 'none' : 'auto'
                }}
                className={`px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-[15px] font-medium transition-all relative ${
                  activeTab === 'popular' 
                    ? 'bg-white shadow-md font-semibold' 
                    : 'bg-transparent hover:text-[#2563EB] hover:bg-white/50'
                }`}
              >
                {COLLECTION_CONFIG.popular.label}
              </button>
              <button
                onClick={() => handleTabChange('new')}
                disabled={isLoading}
                role="tab"
                aria-selected={activeTab === 'new'}
                style={{ 
                  color: activeTab === 'new' ? '#2563EB' : '#6B7280', 
                  transitionDuration: '300ms',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  pointerEvents: isLoading ? 'none' : 'auto'
                }}
                className={`px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-[15px] font-medium transition-all relative ${
                  activeTab === 'new' 
                    ? 'bg-white shadow-md font-semibold' 
                    : 'bg-transparent hover:text-[#2563EB] hover:bg-white/50'
                }`}
              >
                {COLLECTION_CONFIG.new.label}
              </button>
              <button
                onClick={() => handleTabChange('recommended')}
                disabled={isLoading}
                role="tab"
                aria-selected={activeTab === 'recommended'}
                style={{ 
                  color: activeTab === 'recommended' ? '#2563EB' : '#6B7280', 
                  transitionDuration: '300ms',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  pointerEvents: isLoading ? 'none' : 'auto'
                }}
                className={`px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-[15px] font-medium transition-all relative ${
                  activeTab === 'recommended' 
                    ? 'bg-white shadow-md font-semibold' 
                    : 'bg-transparent hover:text-[#2563EB] hover:bg-white/50'
                }`}
              >
                {COLLECTION_CONFIG.recommended.label}
              </button>
            </div>
          </nav>
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
        ) : baseProducts.length > 0 ? (
          <div className="carousel-container relative">
            {/* Navigation arrows */}
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="carousel-arrow prev-arrow disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ zIndex: 10 }}
              aria-label="Forrige produkter"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="carousel-arrow next-arrow disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ zIndex: 10 }}
              aria-label="Næste produkter"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Embla Viewport */}
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex gap-4 md:gap-6 lg:gap-7">
                {baseProducts.map((product, index) => (
                  <div 
                    key={`${product.node.id}-${index}`}
                    className="embla__slide flex-[0_0_calc(50%-8px)] min-w-0 md:flex-[0_0_calc(33.333%-16px)] lg:flex-[0_0_calc(25%-21px)]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Ingen produkter tilgængelige</p>
          </div>
        )}
      </div>
    </section>
  );
};
