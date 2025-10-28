import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, ShoppingBag, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useCallback } from "react";

// Touch swipe constants
const SWIPE_MIN_DISTANCE = 50;
const SWIPE_MAX_DURATION = 300;
const SWIPE_RESUME_DELAY = 2000;

// Trackpad scroll constants
const SCROLL_THRESHOLD = 30;
const SCROLL_RESUME_DELAY = 3000;

// Smooth scroll constants
const TOUCH_SENSITIVITY = 1.0;
const TRACKPAD_SENSITIVITY = 0.5;
const SNAP_DURATION = 300;
const SNAP_THRESHOLD = 0.5;
const OVERSCROLL_MAX = 50;
const SCROLL_STOP_DELAY = 150;
const MOMENTUM_DECELERATION = 0.95;
const MOMENTUM_MIN_VELOCITY = 0.1;

export const ProductSlider = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'recommended'>('popular');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  
  const viewportRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const tabletTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartTime = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const snapTimeout = useRef<NodeJS.Timeout | null>(null);
  const dragStartOffset = useRef(0);
  const lastDragX = useRef(0);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  
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

  // Get gap size based on screen size
  const getGapSize = useCallback(() => {
    if (typeof window === 'undefined') return 20;
    if (window.innerWidth >= 1024) return 20; // Desktop
    if (window.innerWidth >= 768) return 18;  // Tablet
    return 16; // Mobile
  }, []);

  // Apply scroll transform with bounds checking
  const applyScrollTransform = useCallback((offset: number) => {
    const visibleProducts = getVisibleProductsCount();
    const maxIndex = Math.max(0, totalProducts - visibleProducts);
    const gap = getGapSize();
    
    if (!viewportRef.current) return;
    
    const viewportWidth = viewportRef.current.offsetWidth;
    const totalGapWidth = gap * (visibleProducts - 1);
    const productWidth = (viewportWidth - totalGapWidth) / visibleProducts;
    const scrollDistance = productWidth + gap;
    const maxOffset = maxIndex * scrollDistance;
    
    // Apply overscroll bounds with elastic effect
    let boundedOffset = offset;
    const minBound = -OVERSCROLL_MAX;
    const maxBound = maxOffset + OVERSCROLL_MAX;
    
    if (minBound > offset) {
      boundedOffset = minBound;
    } else if (offset > maxBound) {
      boundedOffset = maxBound;
    }
    
    // Get the appropriate track ref
    let trackRef: React.RefObject<HTMLDivElement> | null = null;
    if (window.innerWidth >= 1024) {
      trackRef = desktopTrackRef;
    } else if (window.innerWidth >= 768) {
      trackRef = tabletTrackRef;
    } else {
      trackRef = mobileTrackRef;
    }
    
    if (trackRef?.current) {
      trackRef.current.style.transform = `translateX(${-boundedOffset}px)`;
    }
    
    setScrollOffset(boundedOffset);
  }, [totalProducts, getVisibleProductsCount, getGapSize]);

  // Calculate and apply scroll position
  const scrollToIndex = useCallback((index: number) => {
    const visibleProducts = getVisibleProductsCount();
    const maxIndex = Math.max(0, totalProducts - visibleProducts);
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    
    setCurrentIndex(clampedIndex);

    if (!viewportRef.current) return;

    const viewportWidth = viewportRef.current.offsetWidth;
    const gap = getGapSize();
    const totalGapWidth = gap * (visibleProducts - 1);
    const productWidth = (viewportWidth - totalGapWidth) / visibleProducts;
    const scrollDistance = productWidth + gap;
    const targetOffset = clampedIndex * scrollDistance;
    
    applyScrollTransform(targetOffset);
  }, [totalProducts, getVisibleProductsCount, getGapSize, applyScrollTransform]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrollActive || isPaused || totalProducts === 0) return;

    autoScrollTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const visibleProducts = getVisibleProductsCount();
        const next = prev + 1;
        const maxIndex = Math.max(0, totalProducts - visibleProducts);
        
        // Loop back to start if we reach the end
        if (next > maxIndex) {
          return 0;
        }
        return next;
      });
    }, 2500);

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrollActive, isPaused, totalProducts, getVisibleProductsCount]);

  // Update scroll position when index changes
  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex, scrollToIndex]);

  // Handle window resize
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const visibleProducts = getVisibleProductsCount();
        const maxIndex = Math.max(0, totalProducts - visibleProducts);
        
        if (currentIndex > maxIndex) {
          setCurrentIndex(maxIndex);
        } else {
          scrollToIndex(currentIndex);
        }
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [currentIndex, totalProducts, getVisibleProductsCount, scrollToIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (snapTimeout.current) {
        clearTimeout(snapTimeout.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handlePrevious = () => {
    setIsAutoScrollActive(false);
    const visibleProducts = getVisibleProductsCount();
    setCurrentIndex(prev => {
      if (prev === 0) {
        return Math.max(0, totalProducts - visibleProducts);
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setIsAutoScrollActive(false);
    const visibleProducts = getVisibleProductsCount();
    const maxIndex = Math.max(0, totalProducts - visibleProducts);
    setCurrentIndex(prev => {
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
  };

  // Reset index and auto-scroll when tab changes
  const handleTabChange = (tab: 'popular' | 'new' | 'recommended') => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setIsAutoScrollActive(true);
  };

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Snap to nearest product
  const snapToNearest = useCallback(() => {
    const visibleProducts = getVisibleProductsCount();
    const gap = getGapSize();
    
    if (!viewportRef.current) return;
    
    const viewportWidth = viewportRef.current.offsetWidth;
    const totalGapWidth = gap * (visibleProducts - 1);
    const productWidth = (viewportWidth - totalGapWidth) / visibleProducts;
    const scrollDistance = productWidth + gap;
    
    // Calculate nearest index
    const nearestIndex = Math.round(scrollOffset / scrollDistance);
    const maxIndex = Math.max(0, totalProducts - visibleProducts);
    const clampedIndex = Math.max(0, Math.min(nearestIndex, maxIndex));
    
    setCurrentIndex(clampedIndex);
    setIsSnapping(true);
    
    // Smooth snap animation
    const targetOffset = clampedIndex * scrollDistance;
    applyScrollTransform(targetOffset);
    
    setTimeout(() => {
      setIsSnapping(false);
      setIsScrolling(false);
    }, SNAP_DURATION);
  }, [scrollOffset, totalProducts, getVisibleProductsCount, getGapSize, applyScrollTransform]);

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSnapping) return;
    
    touchStartX.current = e.touches[0].clientX;
    lastDragX.current = e.touches[0].clientX;
    dragStartOffset.current = scrollOffset;
    touchStartTime.current = Date.now();
    
    setIsScrolling(true);
    setIsPaused(true);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isSnapping) return;
    
    const currentX = e.touches[0].clientX;
    const dragDiff = lastDragX.current - currentX;
    const newOffset = dragStartOffset.current + (dragDiff * TOUCH_SENSITIVITY);
    
    velocityRef.current = dragDiff;
    lastDragX.current = currentX;
    touchEndX.current = currentX;
    
    applyScrollTransform(newOffset);
  };

  const handleTouchEnd = () => {
    if (isSnapping) return;
    
    if (snapTimeout.current) {
      clearTimeout(snapTimeout.current);
    }
    
    // Apply momentum if velocity is high enough
    const absVelocity = Math.abs(velocityRef.current);
    const hasHighVelocity = absVelocity > MOMENTUM_MIN_VELOCITY;
    
    if (hasHighVelocity) {
      // Start momentum scroll
      const momentumScroll = () => {
        velocityRef.current *= MOMENTUM_DECELERATION;
        const newOffset = scrollOffset + velocityRef.current;
        
        applyScrollTransform(newOffset);
        
        const stillScrolling = Math.abs(velocityRef.current) > MOMENTUM_MIN_VELOCITY;
        if (stillScrolling && !isSnapping) {
          animationFrameRef.current = requestAnimationFrame(momentumScroll);
        } else {
          snapToNearest();
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(momentumScroll);
    } else {
      snapToNearest();
    }
    
    setTimeout(() => {
      if (isAutoScrollActive) {
        setIsPaused(false);
      }
    }, SWIPE_RESUME_DELAY);
  };

  // Trackpad scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    
    if (isHorizontalScroll) {
      e.preventDefault();
      
      if (isSnapping) return;
      
      setIsScrolling(true);
      setIsPaused(true);
      
      const scrollDelta = e.deltaX * TRACKPAD_SENSITIVITY;
      const newOffset = scrollOffset + scrollDelta;
      
      applyScrollTransform(newOffset);
      
      // Clear existing snap timeout
      if (snapTimeout.current) {
        clearTimeout(snapTimeout.current);
      }
      
      // Set new snap timeout
      snapTimeout.current = setTimeout(() => {
        snapToNearest();
        
        setTimeout(() => {
          if (isAutoScrollActive) {
            setIsPaused(false);
          }
        }, SCROLL_RESUME_DELAY);
      }, SCROLL_STOP_DELAY);
    }
  };

  // Calculate total pages for dots
  const getTotalPages = () => {
    const visibleProducts = getVisibleProductsCount();
    return Math.ceil(totalProducts / visibleProducts);
  };

  const getCurrentPage = () => {
    const visibleProducts = getVisibleProductsCount();
    return Math.floor(currentIndex / visibleProducts);
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
      
      <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-6 lg:px-20">
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
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Navigation Arrows - Desktop (outside viewport) */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[60px] z-20 w-[50px] h-[50px] items-center justify-center bg-white border-2 border-slate-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] group ${
                currentIndex === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'transition-all duration-300 hover:bg-[#2563EB] hover:border-[#2563EB] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]'
              }`}
              aria-label="Forrige produkter"
              aria-disabled={currentIndex === 0}
            >
              <ChevronLeft className={`w-[22px] h-[22px] transition-colors ${
                currentIndex === 0 ? 'text-[#2563EB]' : 'text-[#2563EB] group-hover:text-white'
              }`} />
            </button>
            
            {/* Navigation Arrows - Tablet (inside viewport) */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`hidden md:flex lg:hidden absolute left-4 top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] items-center justify-center bg-white/95 backdrop-blur-[4px] border-2 border-slate-200 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] group ${
                currentIndex === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'transition-all duration-300 hover:bg-[#2563EB] hover:border-[#2563EB] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]'
              }`}
              aria-label="Forrige produkter"
              aria-disabled={currentIndex === 0}
            >
              <ChevronLeft className={`w-5 h-5 transition-colors ${
                currentIndex === 0 ? 'text-[#2563EB]' : 'text-[#2563EB] group-hover:text-white'
              }`} />
            </button>
            
            {/* Navigation Arrows - Mobile (inside viewport) */}
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`flex md:hidden absolute left-3 top-1/2 -translate-y-1/2 z-20 w-[40px] h-[40px] min-w-[48px] min-h-[48px] items-center justify-center bg-white/90 backdrop-blur-[8px] border-2 border-slate-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:scale-95 ${
                currentIndex === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'active:opacity-80 transition-all duration-100'
              }`}
              aria-label="Forrige produkter"
              aria-disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-[18px] h-[18px] text-[#2563EB]" />
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())}
              className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[60px] z-20 w-[50px] h-[50px] items-center justify-center bg-white border-2 border-slate-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] group ${
                currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'transition-all duration-300 hover:bg-[#2563EB] hover:border-[#2563EB] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]'
              }`}
              aria-label="Næste produkter"
              aria-disabled={currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())}
            >
              <ChevronRight className={`w-[22px] h-[22px] transition-colors ${
                currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount()) ? 'text-[#2563EB]' : 'text-[#2563EB] group-hover:text-white'
              }`} />
            </button>

            {/* Navigation Arrows - Tablet (inside viewport) */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())}
              className={`hidden md:flex lg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] items-center justify-center bg-white/95 backdrop-blur-[4px] border-2 border-slate-200 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] group ${
                currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'transition-all duration-300 hover:bg-[#2563EB] hover:border-[#2563EB] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]'
              }`}
              aria-label="Næste produkter"
              aria-disabled={currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())}
            >
              <ChevronRight className={`w-5 h-5 transition-colors ${
                currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount()) ? 'text-[#2563EB]' : 'text-[#2563EB] group-hover:text-white'
              }`} />
            </button>
            
            {/* Navigation Arrows - Mobile (inside viewport) */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())}
              className={`flex md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-20 w-[40px] h-[40px] min-w-[48px] min-h-[48px] items-center justify-center bg-white/90 backdrop-blur-[8px] border-2 border-slate-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:scale-95 ${
                currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'active:opacity-80 transition-all duration-100'
              }`}
              aria-label="Næste produkter"
              aria-disabled={currentIndex >= Math.max(0, totalProducts - getVisibleProductsCount())}
            >
              <ChevronRight className="w-[18px] h-[18px] text-[#2563EB]" />
            </button>

            {/* Carousel viewport */}
            <div 
              ref={viewportRef}
              className="overflow-hidden w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              {/* Desktop - 4 produkter synlige */}
              <div 
                ref={desktopTrackRef}
                className={`hidden lg:flex flex-nowrap gap-5 ${
                  isScrolling && !isSnapping ? '' : 'transition-transform duration-500 ease-out'
                }`}
              >
                {displayProducts.map((product, index) => (
                  <div 
                    key={`${product.node.id}-desktop-${index}`}
                    className="flex-shrink-0 flex-grow-0"
                    style={{ 
                      flexBasis: 'calc((100% - 60px) / 4)',
                      width: 'calc((100% - 60px) / 4)',
                      minWidth: 'calc((100% - 60px) / 4)',
                      maxWidth: 'calc((100% - 60px) / 4)'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Tablet - 3 produkter synlige */}
              <div 
                ref={tabletTrackRef}
                className={`hidden md:flex lg:hidden flex-nowrap gap-[18px] ${
                  isScrolling && !isSnapping ? '' : 'transition-transform duration-500 ease-out'
                }`}
              >
                {displayProducts.map((product, index) => (
                  <div 
                    key={`${product.node.id}-tablet-${index}`}
                    className="flex-shrink-0 flex-grow-0"
                    style={{ 
                      flexBasis: 'calc((100% - 36px) / 3)',
                      width: 'calc((100% - 36px) / 3)',
                      minWidth: 'calc((100% - 36px) / 3)',
                      maxWidth: 'calc((100% - 36px) / 3)'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Mobile - 2 produkter synlige */}
              <div 
                ref={mobileTrackRef}
                className={`flex md:hidden flex-nowrap gap-4 ${
                  isScrolling && !isSnapping ? '' : 'transition-transform duration-500 ease-out'
                }`}
              >
                {displayProducts.map((product, index) => (
                  <div 
                    key={`${product.node.id}-mobile-${index}`}
                    className="flex-shrink-0 flex-grow-0"
                    style={{ 
                      flexBasis: 'calc((100% - 16px) / 2)',
                      width: 'calc((100% - 16px) / 2)',
                      minWidth: 'calc((100% - 16px) / 2)',
                      maxWidth: 'calc((100% - 16px) / 2)'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots - now showing pages instead of individual products */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {Array.from({ length: getTotalPages() }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => {
                    const visibleProducts = getVisibleProductsCount();
                    setCurrentIndex(pageIndex * visibleProducts);
                    setIsAutoScrollActive(false);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    pageIndex === getCurrentPage()
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
