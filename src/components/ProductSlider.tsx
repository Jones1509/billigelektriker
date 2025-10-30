import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useCallback } from "react";

export const ProductSlider = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'recommended'>('popular');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  
  const { data, isLoading } = useQuery({
    queryKey: ['slider-products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 12 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  // Get base products based on active tab
  const baseProducts = data ? (
    activeTab === 'popular' 
      ? data.slice(0, 12)
      : activeTab === 'new'
      ? data.slice(4, 16)
      : data.slice(8, 20)
  ) : [];

  // Helper: Get number of visible products based on screen width
  const getVisibleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1200) return 4; // Desktop
    if (width >= 768) return 3;  // Tablet
    return 2; // Mobile
  }, []);

  // Helper: Get gap size based on screen width
  const getGap = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1200) return 28;
    if (width >= 768) return 24;
    return 16;
  }, []);

  // Create looped products array (add clones at start and end for infinite scroll)
  const displayProducts = baseProducts.length > 0 ? [
    ...baseProducts.slice(-getVisibleCount()), // Clone last N products at start
    ...baseProducts,
    ...baseProducts.slice(0, getVisibleCount()), // Clone first N products at end
  ] : [];

  // Calculate and apply dynamic product sizes
  const calculateProductSizes = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const visibleCount = getVisibleCount();
    const gap = getGap();
    const containerWidth = container.offsetWidth;
    const totalGaps = (visibleCount - 1) * gap;
    const productWidth = (containerWidth - totalGaps) / visibleCount;

    // Apply width to all product cards
    const productCards = container.querySelectorAll('.luxury-product-card');
    productCards.forEach((card) => {
      (card as HTMLElement).style.width = `${productWidth}px`;
      (card as HTMLElement).style.minWidth = `${productWidth}px`;
      (card as HTMLElement).style.maxWidth = `${productWidth}px`;
    });
  }, [getVisibleCount, getGap]);

  // Snap to nearest full product after manual scroll stops
  const snapToNearest = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const productCard = container.querySelector('.luxury-product-card') as HTMLElement;
    if (!productCard) return;

    const productWidth = productCard.offsetWidth;
    const gap = getGap();
    const scrollUnit = productWidth + gap;
    const currentScroll = container.scrollLeft;
    
    // Find nearest snap point
    const nearestIndex = Math.round(currentScroll / scrollUnit);
    const targetScroll = nearestIndex * scrollUnit;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }, [getGap]);

  // Check if we need to loop (seamless infinite scroll)
  const checkLoop = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || baseProducts.length === 0) return;

    const productCard = container.querySelector('.luxury-product-card') as HTMLElement;
    if (!productCard) return;

    const productWidth = productCard.offsetWidth;
    const gap = getGap();
    const scrollUnit = productWidth + gap;
    const visibleCount = getVisibleCount();
    const cloneCount = visibleCount;
    
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // If scrolled into start clones, jump to original end
    if (currentScroll < scrollUnit * cloneCount * 0.5) {
      const jumpTo = scrollUnit * (baseProducts.length + cloneCount);
      container.scrollLeft = jumpTo - (scrollUnit * cloneCount - currentScroll);
    }
    
    // If scrolled into end clones, jump to original start
    if (currentScroll > maxScroll - scrollUnit * cloneCount * 0.5) {
      const jumpTo = scrollUnit * cloneCount;
      container.scrollLeft = jumpTo + (currentScroll - (maxScroll - scrollUnit * cloneCount));
    }
  }, [baseProducts.length, getGap, getVisibleCount]);

  // Scroll one product to the left
  const scrollPrev = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const productCard = container.querySelector('.luxury-product-card') as HTMLElement;
    if (!productCard) return;

    const productWidth = productCard.offsetWidth;
    const gap = getGap();
    const scrollAmount = productWidth + gap;

    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }, [getGap]);

  // Scroll one product to the right
  const scrollNext = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const productCard = container.querySelector('.luxury-product-card') as HTMLElement;
    if (!productCard) return;

    const productWidth = productCard.offsetWidth;
    const gap = getGap();
    const scrollAmount = productWidth + gap;

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, [getGap]);

  // Main effect: Setup all event listeners and calculations
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || displayProducts.length === 0) return;

    // Calculate initial product sizes
    calculateProductSizes();

    // Set initial scroll position to skip start clones
    const visibleCount = getVisibleCount();
    const productCard = container.querySelector('.luxury-product-card') as HTMLElement;
    if (productCard) {
      const productWidth = productCard.offsetWidth;
      const gap = getGap();
      const scrollUnit = productWidth + gap;
      container.scrollLeft = scrollUnit * visibleCount;
    }

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
        setTimeout(checkLoop, 300);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
        setTimeout(checkLoop, 300);
      }
    };

    // Scroll event handler
    const handleScroll = () => {
      isScrollingRef.current = true;

      // Clear existing snap timeout
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }

      // Set new snap timeout (5 seconds after scroll stops)
      snapTimeoutRef.current = setTimeout(() => {
        snapToNearest();
        isScrollingRef.current = false;
      }, 5000);

      // Check for loop boundary
      checkLoop();
    };

    // Trackpad/wheel scroll
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaX;
      }
    };

    // Window resize handler
    const handleResize = () => {
      calculateProductSizes();
      snapToNearest();
    };

    // Attach event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    if (prevBtnRef.current) prevBtnRef.current.addEventListener('click', () => {
      scrollPrev();
      setTimeout(checkLoop, 300);
    });
    if (nextBtnRef.current) nextBtnRef.current.addEventListener('click', () => {
      scrollNext();
      setTimeout(checkLoop, 300);
    });
    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (prevBtnRef.current) prevBtnRef.current.removeEventListener('click', scrollPrev);
      if (nextBtnRef.current) nextBtnRef.current.removeEventListener('click', scrollNext);
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [displayProducts, calculateProductSizes, scrollPrev, scrollNext, snapToNearest, checkLoop, getVisibleCount, getGap]);

  const handleTabChange = (tab: 'popular' | 'new' | 'recommended') => {
    setActiveTab(tab);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  return (
    <section className="luxury-carousel-section" aria-label="Populære produkter i webshoppen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]" aria-hidden="true"></div>
      
      <div className="luxury-carousel-inner">
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
          
          {/* Tab buttons */}
          <nav aria-label="Produktfiltre">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 mb-5 rounded-full" style={{ background: '#F3F4F6' }} role="tablist">
            <button
              onClick={() => handleTabChange('popular')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-[15px] font-medium transition-all ${
                activeTab === 'popular' 
                  ? 'bg-white shadow-md font-semibold' 
                  : 'bg-transparent hover:text-[#2563EB]'
              }`}
              style={{ color: activeTab === 'popular' ? '#2563EB' : '#6B7280', transitionDuration: '300ms' }}
            >
              Mest Populær
            </button>
            <button
              onClick={() => handleTabChange('new')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-[15px] font-medium transition-all ${
                activeTab === 'new' 
                  ? 'bg-white shadow-md font-semibold' 
                  : 'bg-transparent hover:text-[#2563EB]'
              }`}
              style={{ color: activeTab === 'new' ? '#2563EB' : '#6B7280', transitionDuration: '300ms' }}
            >
              Nyhed
            </button>
            <button
              onClick={() => handleTabChange('recommended')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-[15px] font-medium transition-all ${
                activeTab === 'recommended' 
                  ? 'bg-white shadow-md font-semibold' 
                  : 'bg-transparent hover:text-[#2563EB]'
              }`}
              style={{ color: activeTab === 'recommended' ? '#2563EB' : '#6B7280', transitionDuration: '300ms' }}
            >
              Anbefalet
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
        ) : displayProducts.length > 0 ? (
          <div className="luxury-carousel-wrapper">
            {/* Navigation arrows */}
            <button
              ref={prevBtnRef}
              className="luxury-nav-arrow luxury-nav-prev"
              aria-label="Previous products"
            >
              <ChevronLeft className="luxury-nav-icon" />
            </button>
            
            <button
              ref={nextBtnRef}
              className="luxury-nav-arrow luxury-nav-next"
              aria-label="Next products"
            >
              <ChevronRight className="luxury-nav-icon" />
            </button>

            {/* Scroll container */}
            <div ref={scrollContainerRef} className="luxury-scroll-container" data-active-tab={activeTab}>
              {/* Products track */}
              <div className="luxury-products-track" data-active-tab={activeTab}>
                {displayProducts.map((product, index) => (
                  <article 
                    key={`${product.node.id}-${index}`}
                    className="luxury-product-card"
                  >
                    <ProductCard product={product} />
                  </article>
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
