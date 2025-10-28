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
  const viewportRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  
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

  // Update button states
  const updateButtonStates = () => {
    if (!viewportRef.current || !prevBtnRef.current || !nextBtnRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    if (scrollLeft <= 5) {
      prevBtnRef.current.style.opacity = '0.3';
      prevBtnRef.current.style.pointerEvents = 'none';
    } else {
      prevBtnRef.current.style.opacity = '1';
      prevBtnRef.current.style.pointerEvents = 'auto';
    }
    
    if (scrollLeft >= maxScroll - 5) {
      nextBtnRef.current.style.opacity = '0.3';
      nextBtnRef.current.style.pointerEvents = 'none';
    } else {
      nextBtnRef.current.style.opacity = '1';
      nextBtnRef.current.style.pointerEvents = 'auto';
    }
  };

  // Apply momentum scroll
  const applyMomentumScroll = (initialVelocity: number) => {
    if (!viewportRef.current) return;
    
    let vel = initialVelocity;
    const friction = 0.92;
    const minVelocity = 0.3;
    
    const animate = () => {
      if (Math.abs(vel) < minVelocity || !viewportRef.current) return;
      
      viewportRef.current.scrollLeft += vel;
      vel *= friction;
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // Button click handlers
    const handlePrevClick = () => {
      const scrollAmount = viewport.clientWidth * 0.9;
      viewport.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    const handleNextClick = () => {
      const scrollAmount = viewport.clientWidth * 0.9;
      viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    // Scroll event
    const handleScroll = () => {
      requestAnimationFrame(updateButtonStates);
    };

    // Touch events
    let touchStartX = 0;
    let touchScrollLeft = 0;
    let touchVelocity = 0;
    let touchLastX = 0;
    let touchLastTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = viewport.scrollLeft;
      touchLastX = e.touches[0].pageX;
      touchLastTime = Date.now();
      touchVelocity = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].pageX;
      const diff = touchStartX - touchX;
      viewport.scrollLeft = touchScrollLeft + (diff * 2);
      
      const now = Date.now();
      const dt = now - touchLastTime;
      const dx = touchX - touchLastX;
      touchVelocity = dx / dt;
      
      touchLastX = touchX;
      touchLastTime = now;
    };

    const handleTouchEnd = () => {
      if (Math.abs(touchVelocity) > 0.3) {
        applyMomentumScroll(-touchVelocity * 50);
      }
    };

    // Mouse drag events
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - viewport.offsetLeft;
      scrollLeft.current = viewport.scrollLeft;
      viewport.style.cursor = 'grabbing';
      lastX.current = e.pageX;
      lastTime.current = Date.now();
      velocity.current = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX.current) * 2;
      viewport.scrollLeft = scrollLeft.current - walk;
      
      const now = Date.now();
      const dt = now - lastTime.current;
      const dx = e.pageX - lastX.current;
      velocity.current = dx / dt;
      
      lastX.current = e.pageX;
      lastTime.current = now;
    };

    const handleMouseUp = () => {
      if (isDragging.current && Math.abs(velocity.current) > 0.3) {
        applyMomentumScroll(-velocity.current * 50);
      }
      isDragging.current = false;
      viewport.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      viewport.style.cursor = 'grab';
    };

    // Trackpad wheel event
    let momentumTimer: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        viewport.scrollLeft += e.deltaX * 2;
        
        clearTimeout(momentumTimer);
        momentumTimer = setTimeout(() => {
          if (Math.abs(e.deltaX) > 1) {
            applyMomentumScroll(e.deltaX * 30);
          }
        }, 50);
      }
    };

    // Add event listeners
    if (prevBtnRef.current) prevBtnRef.current.addEventListener('click', handlePrevClick);
    if (nextBtnRef.current) nextBtnRef.current.addEventListener('click', handleNextClick);
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd, { passive: true });
    viewport.addEventListener('mousedown', handleMouseDown);
    viewport.addEventListener('mousemove', handleMouseMove);
    viewport.addEventListener('mouseup', handleMouseUp);
    viewport.addEventListener('mouseleave', handleMouseLeave);
    viewport.addEventListener('wheel', handleWheel, { passive: false });

    updateButtonStates();

    return () => {
      if (prevBtnRef.current) prevBtnRef.current.removeEventListener('click', handlePrevClick);
      if (nextBtnRef.current) nextBtnRef.current.removeEventListener('click', handleNextClick);
      viewport.removeEventListener('scroll', handleScroll);
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchmove', handleTouchMove);
      viewport.removeEventListener('touchend', handleTouchEnd);
      viewport.removeEventListener('mousedown', handleMouseDown);
      viewport.removeEventListener('mousemove', handleMouseMove);
      viewport.removeEventListener('mouseup', handleMouseUp);
      viewport.removeEventListener('mouseleave', handleMouseLeave);
      viewport.removeEventListener('wheel', handleWheel);
      clearTimeout(momentumTimer);
    };
  }, [displayProducts]);

  const handleTabChange = (tab: 'popular' | 'new' | 'recommended') => {
    setActiveTab(tab);
    if (viewportRef.current) {
      viewportRef.current.scrollLeft = 0;
    }
  };

  return (
    <section className="product-carousel-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      
      <div className="carousel-inner-wrapper">
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
            <button
              ref={prevBtnRef}
              className="carousel-nav-btn carousel-prev"
              aria-label="Previous"
            >
              <ChevronLeft className="carousel-nav-icon" />
            </button>
            
            <button
              ref={nextBtnRef}
              className="carousel-nav-btn carousel-next"
              aria-label="Next"
            >
              <ChevronRight className="carousel-nav-icon" />
            </button>

            <div ref={viewportRef} className="carousel-viewport">
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
