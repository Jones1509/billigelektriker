import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, ShoppingBag, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useCallback } from "react";

// Auto-scroll constants
const AUTO_SCROLL_INTERVAL = 2500;
const AUTO_SCROLL_RESUME_DELAY = 3000;

export const ProductSlider = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'recommended'>('popular');
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const viewportRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrollingRef = useRef(false);
  
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
      ? data.slice(0, 12)
      : activeTab === 'new'
      ? data.slice(4, 16)
      : data.slice(8, 20)
  ) : [];

  const totalProducts = displayProducts.length;

  // Get visible products count based on screen size
  const getVisibleProductsCount = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1024) return 4; // Desktop
    if (window.innerWidth >= 768) return 3;  // Tablet
    return 2; // Mobile
  }, []);

  // Update current page based on scroll position
  const updateCurrentPage = useCallback(() => {
    if (!viewportRef.current) return;
    
    const viewport = viewportRef.current;
    const scrollPosition = viewport.scrollLeft;
    const viewportWidth = viewport.offsetWidth;
    const visibleProducts = getVisibleProductsCount();
    const totalPages = Math.ceil(totalProducts / visibleProducts);
    
    // Calculate current page (0-indexed)
    const calculatedPage = Math.round(scrollPosition / viewportWidth);
    const clampedPage = Math.max(0, Math.min(calculatedPage, totalPages - 1));
    
    setCurrentPage(clampedPage);
  }, [totalProducts, getVisibleProductsCount]);

  // Handle native scroll events
  const handleScroll = useCallback(() => {
    if (!viewportRef.current) return;
    
    // User is scrolling manually
    isUserScrollingRef.current = true;
    setIsAutoScrollActive(false);
    
    // Update current page
    updateCurrentPage();
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Resume auto-scroll after user stops scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
      // Only resume if not stopped by arrow click
      if (isPaused === false) {
        setIsAutoScrollActive(true);
      }
    }, AUTO_SCROLL_RESUME_DELAY);
  }, [updateCurrentPage, isPaused]);

  // Auto-scroll functionality using native scroll
  useEffect(() => {
    if (!isAutoScrollActive || isPaused || totalProducts === 0 || !viewportRef.current) return;

    autoScrollTimerRef.current = setInterval(() => {
      if (!viewportRef.current || isUserScrollingRef.current) return;
      
      const viewport = viewportRef.current;
      const viewportWidth = viewport.offsetWidth;
      const maxScroll = viewport.scrollWidth - viewport.offsetWidth;
      const currentScroll = viewport.scrollLeft;
      
      // Check if at the end
      if (currentScroll >= maxScroll - 10) {
        // Scroll back to start
        viewport.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Scroll to next page
        viewport.scrollBy({
          left: viewportWidth,
          behavior: 'smooth'
        });
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrollActive, isPaused, totalProducts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle arrow navigation
  const handlePrevious = () => {
    if (!viewportRef.current) return;
    
    setIsAutoScrollActive(false); // Stop auto-scroll permanently
    
    const viewport = viewportRef.current;
    const viewportWidth = viewport.offsetWidth;
    
    viewport.scrollBy({
      left: -viewportWidth,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (!viewportRef.current) return;
    
    setIsAutoScrollActive(false); // Stop auto-scroll permanently
    
    const viewport = viewportRef.current;
    const viewportWidth = viewport.offsetWidth;
    const maxScroll = viewport.scrollWidth - viewport.offsetWidth;
    
    // If at end, scroll to start
    if (viewport.scrollLeft >= maxScroll - 10) {
      viewport.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      viewport.scrollBy({
        left: viewportWidth,
        behavior: 'smooth'
      });
    }
  };

  // Reset when tab changes
  const handleTabChange = (tab: 'popular' | 'new' | 'recommended') => {
    setActiveTab(tab);
    setCurrentPage(0);
    setIsAutoScrollActive(true);
    
    // Reset scroll position
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  };

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Calculate total pages for dots
  const getTotalPages = () => {
    const visibleProducts = getVisibleProductsCount();
    return Math.ceil(totalProducts / visibleProducts);
  };

  // Handle dot click
  const handleDotClick = (pageIndex: number) => {
    if (!viewportRef.current) return;
    
    setIsAutoScrollActive(false);
    
    const viewport = viewportRef.current;
    const viewportWidth = viewport.offsetWidth;
    const targetScroll = pageIndex * viewportWidth;
    
    viewport.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Check if at start/end for arrow disabled states
  const isAtStart = currentPage === 0;
  const isAtEnd = currentPage >= getTotalPages() - 1;

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
      
      <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-6 lg:px-0">
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
          <div 
            className="relative px-4 md:px-10 lg:px-20"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Carousel viewport with native scroll */}
            <div 
              ref={viewportRef}
              onScroll={handleScroll}
              className="carousel-viewport overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE/Edge
                WebkitOverflowScrolling: 'touch' // iOS momentum scrolling
              }}
            >
              <style>{`
                .carousel-viewport::-webkit-scrollbar {
                  display: none; /* Chrome, Safari, Opera */
                }
              `}</style>
              
              {/* Carousel track with precise column widths */}
              <div className="carousel-track flex flex-nowrap gap-3 md:gap-5 lg:gap-6">
                {displayProducts.map((product, index) => (
                  <div 
                    key={`${product.node.id}-${index}`}
                    className="product-card-wrapper flex-shrink-0 flex-grow-0 snap-start snap-always w-[calc((100%-12px)/2)] min-w-[calc((100%-12px)/2)] max-w-[calc((100%-12px)/2)] md:w-[calc((100%-40px)/3)] md:min-w-[calc((100%-40px)/3)] md:max-w-[calc((100%-40px)/3)] lg:w-[calc((100%-72px)/4)] lg:min-w-[calc((100%-72px)/4)] lg:max-w-[calc((100%-72px)/4)]"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow container - separate overlay */}
            <div className="arrow-container absolute top-0 left-0 w-full h-[200px] md:h-[250px] lg:h-[300px] flex justify-between items-center pointer-events-none z-[100] px-2 md:px-4 lg:px-5">
              <button
                onClick={handlePrevious}
                disabled={isAtStart}
                className={`carousel-arrow carousel-arrow-left pointer-events-auto ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`}
                style={{ touchAction: 'manipulation' }}
                aria-label="Forrige produkter"
                aria-disabled={isAtStart}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={isAtEnd}
                className={`carousel-arrow carousel-arrow-right pointer-events-auto ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`}
                style={{ touchAction: 'manipulation' }}
                aria-label="Næste produkter"
                aria-disabled={isAtEnd}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {Array.from({ length: getTotalPages() }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handleDotClick(pageIndex)}
                  className={`transition-all duration-300 rounded-full ${
                    pageIndex === currentPage
                      ? 'w-6 h-2 bg-[#2563EB]'
                      : 'w-2 h-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                  }`}
                  aria-label={`Gå til side ${pageIndex + 1}`}
                />
              ))}
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
