import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

export const ProductSlider = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'popular' | 'new' | 'recommended'>('popular');
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  
  const { data, isLoading } = useQuery({
    queryKey: ['slider-products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 12 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  const displayProducts = data ? (
    activeTab === 'popular' 
      ? data.slice(0, 12)
      : activeTab === 'new'
      ? data.slice(4, 16)
      : data.slice(8, 20)
  ) : [];

  // Update button states based on scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateButtonStates = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      const prevBtn = container.parentElement?.querySelector('.nav-arrow-prev') as HTMLButtonElement;
      const nextBtn = container.parentElement?.querySelector('.nav-arrow-next') as HTMLButtonElement;
      
      if (prevBtn) {
        if (scrollLeft <= 10) {
          prevBtn.style.opacity = '0.3';
          prevBtn.style.pointerEvents = 'none';
        } else {
          prevBtn.style.opacity = '1';
          prevBtn.style.pointerEvents = 'auto';
        }
      }
      
      if (nextBtn) {
        if (scrollLeft >= maxScroll - 10) {
          nextBtn.style.opacity = '0.3';
          nextBtn.style.pointerEvents = 'none';
        } else {
          nextBtn.style.opacity = '1';
          nextBtn.style.pointerEvents = 'auto';
        }
      }
    };

    container.addEventListener('scroll', updateButtonStates);
    updateButtonStates();

    return () => container.removeEventListener('scroll', updateButtonStates);
  }, [displayProducts]);

  const handlePrevious = () => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.offsetWidth * 0.85;
    containerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.offsetWidth * 0.85;
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleTabChange = (tab: 'popular' | 'new' | 'recommended') => {
    setActiveTab(tab);
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  };

  // Touch momentum scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    lastXRef.current = e.touches[0].pageX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTimeRef.current;
    const distDiff = e.touches[0].pageX - lastXRef.current;
    velocityRef.current = distDiff / timeDiff;
    
    lastXRef.current = e.touches[0].pageX;
    lastTimeRef.current = currentTime;
  };

  const handleTouchEnd = () => {
    if (Math.abs(velocityRef.current) > 0.5) {
      applyMomentum(velocityRef.current);
    }
  };

  const applyMomentum = (initialVelocity: number) => {
    if (!containerRef.current) return;
    
    let velocity = initialVelocity * 40;
    const deceleration = 0.95;
    
    const animate = () => {
      if (Math.abs(velocity) < 0.5 || !containerRef.current) return;
      
      containerRef.current.scrollLeft -= velocity;
      velocity *= deceleration;
      
      requestAnimationFrame(animate);
    };
    
    animate();
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (containerRef.current) {
        containerRef.current.scrollLeft += e.deltaX;
      }
    }
  };

  return (
    <section className="carousel-wrapper">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10 px-5 md:px-[60px] lg:px-[120px] py-[60px]">
        <div className="text-center mb-8 md:mb-10 animate-fade-in">
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
          
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 mb-5 rounded-full" style={{ background: '#F3F4F6' }}>
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
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="nav-arrow nav-arrow-prev"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNext}
              className="nav-arrow nav-arrow-next"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Container */}
            <div 
              ref={containerRef}
              className="carousel-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
            >
              <div className="carousel-track">
                {displayProducts.map((product, index) => (
                  <article 
                    key={`${product.node.id}-${index}`}
                    className="product-card"
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
