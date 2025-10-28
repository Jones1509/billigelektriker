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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  
  // Touch tracking
  const touchStartXRef = useRef(0);
  const touchScrollLeftRef = useRef(0);
  const touchLastXRef = useRef(0);
  const touchLastTimeRef = useRef(0);
  const touchVelocityRef = useRef(0);
  
  // Mouse drag tracking
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragLastTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  
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
  const updateButtonStates = () => {
    const container = scrollContainerRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;
    
    if (!container || !prevBtn || !nextBtn) return;
    
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Left button
    if (scrollLeft <= 5) {
      prevBtn.style.opacity = '0.3';
      prevBtn.style.pointerEvents = 'none';
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.style.pointerEvents = 'auto';
    }
    
    // Right button
    if (scrollLeft >= maxScroll - 5) {
      nextBtn.style.opacity = '0.3';
      nextBtn.style.pointerEvents = 'none';
    } else {
      nextBtn.style.opacity = '1';
      nextBtn.style.pointerEvents = 'auto';
    }
  };

  // Apply momentum scroll animation
  const applyMomentum = (initialVelocity: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    let velocity = initialVelocity;
    const friction = 0.94; // Less friction for longer, smoother scroll
    const minVelocity = 0.2; // Lower threshold for longer animation
    
    const animate = () => {
      if (Math.abs(velocity) < minVelocity || !scrollContainerRef.current) return;
      
      scrollContainerRef.current.scrollLeft += velocity;
      velocity *= friction;
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Button click handlers
    const handlePrevClick = () => {
      const scrollAmount = container.clientWidth * 0.85;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    const handleNextClick = () => {
      const scrollAmount = container.clientWidth * 0.85;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    // Scroll event for button states
    const handleScroll = () => {
      requestAnimationFrame(updateButtonStates);
    };

    // Touch events for mobile/tablet
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].pageX;
      touchScrollLeftRef.current = container.scrollLeft;
      touchLastXRef.current = e.touches[0].pageX;
      touchLastTimeRef.current = Date.now();
      touchVelocityRef.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].pageX;
      const diff = touchStartXRef.current - touchX;
      
      // 2.5x multiplier for ultra responsiveness
      container.scrollLeft = touchScrollLeftRef.current + (diff * 2.5);
      
      // Calculate velocity
      const now = Date.now();
      const dt = now - touchLastTimeRef.current;
      const dx = touchX - touchLastXRef.current;
      touchVelocityRef.current = dt > 0 ? dx / dt : 0;
      
      touchLastXRef.current = touchX;
      touchLastTimeRef.current = now;
    };

    const handleTouchEnd = () => {
      // Apply momentum if velocity is high - lower threshold for more sensitivity
      if (Math.abs(touchVelocityRef.current) > 0.2) {
        applyMomentum(-touchVelocityRef.current * 80);
      }
    };

    // Mouse drag events
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragStartXRef.current = e.pageX - container.offsetLeft;
      dragScrollLeftRef.current = container.scrollLeft;
      container.style.cursor = 'grabbing';
      dragLastXRef.current = e.pageX;
      dragLastTimeRef.current = Date.now();
      dragVelocityRef.current = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      
      const x = e.pageX - container.offsetLeft;
      const walk = (x - dragStartXRef.current) * 2; // 2x multiplier
      container.scrollLeft = dragScrollLeftRef.current - walk;
      
      // Calculate velocity
      const now = Date.now();
      const dt = now - dragLastTimeRef.current;
      const dx = e.pageX - dragLastXRef.current;
      dragVelocityRef.current = dx / dt;
      
      dragLastXRef.current = e.pageX;
      dragLastTimeRef.current = now;
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current && Math.abs(dragVelocityRef.current) > 0.3) {
        applyMomentum(-dragVelocityRef.current * 50);
      }
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
    };

    // Trackpad wheel event - optimeret til MacBook
    let wheelTimeout: NodeJS.Timeout;
    let lastWheelTime = Date.now();
    let wheelVelocity = 0;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Brug både deltaX og deltaY for bedre trackpad support
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;
      
      // Hvis der er horizontal scroll, brug den
      // Ellers brug vertikal scroll som horizontal (for bedre trackpad support)
      const scrollAmount = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
      
      // 2.5x multiplier for ultra responsiveness
      container.scrollLeft += scrollAmount * 2.5;
      
      // Beregn velocity for momentum
      const now = Date.now();
      const dt = now - lastWheelTime;
      wheelVelocity = dt > 0 ? scrollAmount / dt : 0;
      lastWheelTime = now;
      
      // Apply momentum efter scroll stopper
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (Math.abs(wheelVelocity) > 0.1) {
          applyMomentum(wheelVelocity * 50);
        }
      }, 80);
    };

    // Attach event listeners
    if (prevBtnRef.current) prevBtnRef.current.addEventListener('click', handlePrevClick);
    if (nextBtnRef.current) nextBtnRef.current.addEventListener('click', handleNextClick);
    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Initial button state
    updateButtonStates();

    return () => {
      if (prevBtnRef.current) prevBtnRef.current.removeEventListener('click', handlePrevClick);
      if (nextBtnRef.current) nextBtnRef.current.removeEventListener('click', handleNextClick);
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [displayProducts]);

  const handleTabChange = (tab: 'popular' | 'new' | 'recommended') => {
    setActiveTab(tab);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  return (
    <section className="luxury-carousel-section">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      
      <div className="luxury-carousel-inner">
        {/* Header section */}
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
          
          {/* Tab buttons */}
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
            <div ref={scrollContainerRef} className="luxury-scroll-container">
              {/* Products track */}
              <div className="luxury-products-track">
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
