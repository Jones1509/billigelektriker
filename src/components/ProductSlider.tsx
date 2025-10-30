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
  
  // DOM refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // State refs
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const autoSnapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  
  // Dimension refs
  const cardWidthRef = useRef(0);
  const gapRef = useRef(0);
  const itemsVisibleRef = useRef(4);
  
  // Touch/drag refs
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
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

  // Get base products based on active tab
  const baseProducts = data ? (
    activeTab === 'popular' 
      ? data.slice(0, 12)
      : activeTab === 'new'
      ? data.slice(4, 16)
      : data.slice(8, 20)
  ) : [];

  // Calculate dimensions based on screen width
  const calculateDimensions = useCallback(() => {
    const width = window.innerWidth;
    
    // Determine number of visible items
    if (width >= 1200) {
      itemsVisibleRef.current = 4;
    } else if (width >= 768) {
      itemsVisibleRef.current = 3;
    } else {
      itemsVisibleRef.current = 2;
    }
    
    if (!viewportRef.current || !trackRef.current) return;
    
    // Get ACTUAL available space in viewport
    const viewportRect = viewportRef.current.getBoundingClientRect();
    const viewportWidth = viewportRect.width;
    
    // Calculate gap from CSS
    const trackStyle = window.getComputedStyle(trackRef.current);
    let gapValue = parseFloat(trackStyle.gap);
    
    // Fallback if gap not set
    if (isNaN(gapValue) || gapValue === 0) {
      if (width >= 1200) gapValue = 28;
      else if (width >= 768) gapValue = 24;
      else gapValue = 16;
    }
    
    gapRef.current = Math.round(gapValue);
    
    // MOBILE SPECIAL BEREGNING
    if (width < 768) {
      console.log('=== MOBILE DIMENSION CALC ===');
      console.log('Viewport width:', viewportWidth);
      console.log('Gap:', gapRef.current);
      
      // 2 kort skal passe i viewport med gap imellem
      // cardWidth × 2 + gap = viewport
      // cardWidth = (viewport - gap) / 2
      const calculatedWidth = (viewportWidth - gapRef.current) / 2;
      
      // Afrund ned og træk lidt fra for sikkerhed
      cardWidthRef.current = Math.floor(calculatedWidth) - 1;
      
      console.log('Calculated card width:', calculatedWidth);
      console.log('Final card width:', cardWidthRef.current);
      console.log('Verification: 2 cards + gap =', (cardWidthRef.current * 2 + gapRef.current));
      console.log('============================');
    } else {
      // Desktop/Tablet: Calculate precise product width
      const totalGaps = (itemsVisibleRef.current - 1) * gapRef.current;
      const safetyMargin = 4;
      const availableWidth = viewportWidth - totalGaps - safetyMargin;
      cardWidthRef.current = Math.floor(availableWidth / itemsVisibleRef.current);
    }
    
    // Anvend bredde på alle kort
    const cards = viewportRef.current.querySelectorAll('.product-card');
    cards.forEach(card => {
      const cardEl = card as HTMLElement;
      cardEl.style.width = `${cardWidthRef.current}px`;
      cardEl.style.minWidth = `${cardWidthRef.current}px`;
      cardEl.style.maxWidth = `${cardWidthRef.current}px`;
    });
    
    // Verificer faktisk bredde
    if (cards.length > 0) {
      const firstCard = cards[0] as HTMLElement;
      const actualWidth = Math.round(firstCard.getBoundingClientRect().width);
      
      if (Math.abs(actualWidth - cardWidthRef.current) > 2) {
        console.log('Adjusting card width from', cardWidthRef.current, 'to', actualWidth);
        cardWidthRef.current = actualWidth;
      }
    }
    
    // Log final dimensions
    console.log('Final dimensions:', {
      screenWidth: width,
      itemsVisible: itemsVisibleRef.current,
      cardWidth: cardWidthRef.current,
      gap: gapRef.current,
      totalCards: cards.length
    });
  }, []);

  // Get current scroll position
  const getCurrentScroll = useCallback(() => {
    if (!trackRef.current) {
      console.log('getCurrentScroll: No track ref, returning 0');
      return 0;
    }
    
    const transform = trackRef.current.style.transform;
    
    if (!transform || transform === 'none') {
      console.log('getCurrentScroll: No transform, returning 0');
      return 0;
    }
    
    const match = transform.match(/translateX\((-?\d+\.?\d*)px\)/);
    
    if (!match) {
      console.log('getCurrentScroll: No match found, returning 0');
      return 0;
    }
    
    const value = Math.abs(parseFloat(match[1]));
    const rounded = Math.round(value);
    
    console.log('getCurrentScroll:', rounded);
    
    return rounded;
  }, []);

  // Update position
  const updatePosition = useCallback((animate = true) => {
    if (!trackRef.current) return;
    
    const moveDistance = currentIndexRef.current * (cardWidthRef.current + gapRef.current);
    // Round to whole pixels for crisp positioning
    const exactDistance = Math.round(moveDistance);
    
    if (animate) {
      isTransitioningRef.current = true;
      trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 500);
    } else {
      trackRef.current.style.transition = 'none';
    }
    
    trackRef.current.style.transform = `translateX(-${exactDistance}px)`;
  }, []);

  // Clear auto-snap timer
  const clearAutoSnap = useCallback(() => {
    if (autoSnapTimerRef.current) {
      clearTimeout(autoSnapTimerRef.current);
      autoSnapTimerRef.current = null;
    }
  }, []);

  // Start auto-snap timer
  const startAutoSnap = useCallback(() => {
    clearAutoSnap();
    const snapDelay = window.innerWidth < 768 ? 3000 : 5000;
    console.log('Starting auto-snap timer:', snapDelay, 'ms');
    autoSnapTimerRef.current = setTimeout(() => {
      console.log('Auto-snap timer triggered');
      snapToNearest();
    }, snapDelay);
  }, [clearAutoSnap]);

  // Sync currentIndex with actual scroll position
  const syncCurrentIndexWithScroll = useCallback(() => {
    const currentScroll = getCurrentScroll();
    const cardPlusGap = cardWidthRef.current + gapRef.current;
    
    // Avoid division by zero
    if (cardPlusGap === 0) return;
    
    // Calculate which index this corresponds to
    const calculatedIndex = Math.round(currentScroll / cardPlusGap);
    
    // Constrain to valid range based on mobile or desktop
    const isMobile = window.innerWidth < 768;
    const maxIndex = isMobile 
      ? Math.max(0, baseProducts.length - 2)
      : Math.max(0, baseProducts.length - itemsVisibleRef.current);
    
    currentIndexRef.current = Math.max(0, Math.min(calculatedIndex, maxIndex));
    console.log('Synced index to:', currentIndexRef.current);
  }, [getCurrentScroll, baseProducts.length]);

  // Snap to nearest - Mobile version
  const snapToNearestMobile = useCallback(() => {
    console.log('--- Mobile Snap ---');
    
    calculateDimensions();
    
    const currentScroll = getCurrentScroll();
    const cardPlusGap = cardWidthRef.current + gapRef.current;
    
    console.log('Current scroll:', currentScroll);
    console.log('Card width:', cardWidthRef.current);
    console.log('Gap:', gapRef.current);
    console.log('Card + gap:', cardPlusGap);
    
    if (cardPlusGap === 0 || !trackRef.current) {
      console.error('Card width or gap is 0');
      return;
    }
    
    // Beregn hvor mange produkter vi har scrollet
    const scrolledProducts = currentScroll / cardPlusGap;
    
    console.log('Scrolled products:', scrolledProducts);
    
    // Rund til nærmeste helt tal
    let nearestIndex = Math.round(scrolledProducts);
    
    console.log('Nearest index (raw):', nearestIndex);
    
    // KRITISK: På mobil skal vi altid kunne se 2 produkter
    // Max index = total produkter - 2
    const maxMobileIndex = Math.max(0, baseProducts.length - 2);
    
    console.log('Max mobile index:', maxMobileIndex, '(total cards:', baseProducts.length, ')');
    
    // Begræns
    nearestIndex = Math.max(0, Math.min(nearestIndex, maxMobileIndex));
    
    console.log('Final index:', nearestIndex);
    console.log('Will show products:', nearestIndex, 'and', nearestIndex + 1);
    
    // Opdater state
    currentIndexRef.current = nearestIndex;
    
    // Beregn præcis position
    const targetPosition = Math.round(nearestIndex * cardPlusGap);
    
    console.log('Target position:', targetPosition, 'px');
    
    // Anvend snap
    trackRef.current.style.transition = 'transform 0.4s ease-out';
    trackRef.current.style.transform = `translateX(-${targetPosition}px)`;
    
    isTransitioningRef.current = true;
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
  }, [getCurrentScroll, calculateDimensions, baseProducts.length]);

  // Snap to nearest - Desktop version
  const snapToNearestDesktop = useCallback(() => {
    console.log('--- Desktop/Tablet Snap ---');
    
    calculateDimensions();
    
    const currentScroll = getCurrentScroll();
    const cardPlusGap = cardWidthRef.current + gapRef.current;
    
    console.log('Current scroll:', currentScroll);
    console.log('Card + gap:', cardPlusGap);
    
    if (cardPlusGap === 0 || !trackRef.current) {
      console.error('Card width or gap is 0');
      return;
    }
    
    const rawIndex = currentScroll / cardPlusGap;
    let nearestIndex = Math.round(rawIndex);
    
    const maxIndex = Math.max(0, baseProducts.length - itemsVisibleRef.current);
    nearestIndex = Math.max(0, Math.min(nearestIndex, maxIndex));
    
    console.log('Nearest index:', nearestIndex, '(max:', maxIndex, ')');
    
    currentIndexRef.current = nearestIndex;
    
    const targetPosition = Math.round(nearestIndex * cardPlusGap);
    
    console.log('Target position:', targetPosition);
    
    trackRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    trackRef.current.style.transform = `translateX(-${targetPosition}px)`;
    
    isTransitioningRef.current = true;
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 400);
  }, [getCurrentScroll, calculateDimensions, baseProducts.length]);

  // Snap to nearest full product position
  const snapToNearest = useCallback(() => {
    console.log('=== SNAP TO NEAREST START ===');
    
    // Check om mobil
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // MOBIL SNAP LOGIK
      snapToNearestMobile();
    } else {
      // DESKTOP/TABLET SNAP LOGIK
      snapToNearestDesktop();
    }
    
    console.log('=== SNAP TO NEAREST END ===');
  }, [snapToNearestMobile, snapToNearestDesktop]);

  // Apply momentum scroll
  const applyMomentum = useCallback((initialVelocity: number) => {
    console.log('Starting momentum with velocity:', initialVelocity);
    
    let velocity = initialVelocity;
    const friction = 0.92;
    const minVelocity = 0.5;
    
    const animate = () => {
      if (Math.abs(velocity) < minVelocity) {
        console.log('Momentum ended');
        
        // Recalculate dimensions before snap
        calculateDimensions();
        
        // Sync index with mobile-aware logic
        const currentScroll = getCurrentScroll();
        const cardPlusGap = cardWidthRef.current + gapRef.current;
        
        if (cardPlusGap > 0) {
          const calculatedIndex = Math.round(currentScroll / cardPlusGap);
          const isMobile = window.innerWidth < 768;
          const maxIndex = isMobile 
            ? Math.max(0, baseProducts.length - 2)
            : Math.max(0, baseProducts.length - itemsVisibleRef.current);
          currentIndexRef.current = Math.max(0, Math.min(calculatedIndex, maxIndex));
          console.log('After momentum - synced index to:', currentIndexRef.current);
        }
        
        // Start auto-snap
        startAutoSnap();
        return;
      }
      
      const currentScroll = getCurrentScroll();
      const newScroll = currentScroll + velocity;
      
      // Calculate max scroll with mobile awareness
      const cardPlusGap = cardWidthRef.current + gapRef.current;
      const isMobile = window.innerWidth < 768;
      const maxIndex = isMobile 
        ? Math.max(0, baseProducts.length - 2)
        : Math.max(0, baseProducts.length - itemsVisibleRef.current);
      const maxScroll = maxIndex * cardPlusGap;
      
      const clampedScroll = Math.max(0, Math.min(newScroll, maxScroll));
      
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${Math.round(clampedScroll)}px)`;
      }
      
      velocity *= friction;
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [getCurrentScroll, calculateDimensions, startAutoSnap, baseProducts.length]);

  // Navigate to next product
  const navigateNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    
    // Sync with actual scroll position first
    syncCurrentIndexWithScroll();
    
    currentIndexRef.current++;
    
    // Loop back to start
    if (currentIndexRef.current > baseProducts.length - itemsVisibleRef.current) {
      currentIndexRef.current = 0;
    }
    
    updatePosition(true);
  }, [syncCurrentIndexWithScroll, updatePosition, baseProducts.length]);

  // Navigate to previous product
  const navigatePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    
    // Sync with actual scroll position first
    syncCurrentIndexWithScroll();
    
    currentIndexRef.current--;
    
    // Loop to end
    if (currentIndexRef.current < 0) {
      currentIndexRef.current = Math.max(0, baseProducts.length - itemsVisibleRef.current);
    }
    
    updatePosition(true);
  }, [syncCurrentIndexWithScroll, updatePosition, baseProducts.length]);

  // Touch handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    startXRef.current = e.touches[0].pageX;
    startScrollLeftRef.current = getCurrentScroll();
    lastXRef.current = e.touches[0].pageX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    clearAutoSnap();
    
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  }, [getCurrentScroll, clearAutoSnap]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const currentX = e.touches[0].pageX;
    const diff = (startXRef.current - currentX) * 1.5;
    
    const newScroll = startScrollLeftRef.current + diff;
    const maxScroll = (baseProducts.length - itemsVisibleRef.current) * (cardWidthRef.current + gapRef.current);
    // Add buffer for smoother edge experience
    const clampedScroll = Math.max(-10, Math.min(newScroll, maxScroll + 10));
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${Math.round(clampedScroll)}px)`;
    }
    
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    const dx = currentX - lastXRef.current;
    velocityRef.current = dx / dt;
    
    lastXRef.current = currentX;
    lastTimeRef.current = now;
  }, [baseProducts.length]);

  const handleTouchEnd = useCallback(() => {
    console.log('Touch ended');
    
    // Apply momentum hvis hurtig swipe
    if (Math.abs(velocityRef.current) > 0.5) {
      console.log('Applying momentum, velocity:', velocityRef.current);
      applyMomentum(-velocityRef.current * 50);
    } else {
      // Ingen momentum - snap direkte
      console.log('No momentum, direct snap');
      
      // Sync index først med mobile awareness
      const currentScroll = getCurrentScroll();
      const cardPlusGap = cardWidthRef.current + gapRef.current;
      if (cardPlusGap > 0) {
        const calculatedIndex = Math.round(currentScroll / cardPlusGap);
        const isMobile = window.innerWidth < 768;
        const maxIndex = isMobile 
          ? Math.max(0, baseProducts.length - 2)
          : Math.max(0, baseProducts.length - itemsVisibleRef.current);
        currentIndexRef.current = Math.max(0, Math.min(calculatedIndex, maxIndex));
        console.log('Synced index to:', currentIndexRef.current);
      }
      
      // Start auto-snap
      startAutoSnap();
    }
  }, [getCurrentScroll, applyMomentum, startAutoSnap, baseProducts.length]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    startScrollLeftRef.current = getCurrentScroll();
    lastXRef.current = e.pageX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    clearAutoSnap();
    
    if (viewportRef.current) {
      viewportRef.current.style.cursor = 'grabbing';
    }
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
    
    e.preventDefault();
  }, [getCurrentScroll, clearAutoSnap]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    const currentX = e.pageX;
    const diff = (startXRef.current - currentX) * 1.5;
    
    const newScroll = startScrollLeftRef.current + diff;
    const maxScroll = (baseProducts.length - itemsVisibleRef.current) * (cardWidthRef.current + gapRef.current);
    const clampedScroll = Math.max(-10, Math.min(newScroll, maxScroll + 10));
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${Math.round(clampedScroll)}px)`;
    }
    
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    const dx = currentX - lastXRef.current;
    velocityRef.current = dx / dt;
    
    lastXRef.current = currentX;
    lastTimeRef.current = now;
  }, [baseProducts.length]);

  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    if (viewportRef.current) {
      viewportRef.current.style.cursor = 'grab';
    }
    
    // Apply momentum hvis hurtig drag
    if (Math.abs(velocityRef.current) > 0.5) {
      console.log('Mouse drag momentum, velocity:', velocityRef.current);
      applyMomentum(-velocityRef.current * 50);
    } else {
      // Sync index først
      const currentScroll = getCurrentScroll();
      const cardPlusGap = cardWidthRef.current + gapRef.current;
      if (cardPlusGap > 0) {
        const calculatedIndex = Math.round(currentScroll / cardPlusGap);
        const isMobile = window.innerWidth < 768;
        const maxIndex = isMobile 
          ? Math.max(0, baseProducts.length - 2)
          : Math.max(0, baseProducts.length - itemsVisibleRef.current);
        currentIndexRef.current = Math.max(0, Math.min(calculatedIndex, maxIndex));
      }
      
      startAutoSnap();
    }
  }, [getCurrentScroll, applyMomentum, startAutoSnap, baseProducts.length]);

  // Wheel/trackpad handler
  const handleWheel = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      
      const currentScroll = getCurrentScroll();
      const deltaX = e.deltaX * 1.5;
      const newScroll = currentScroll + deltaX;
      
      const cardPlusGap = cardWidthRef.current + gapRef.current;
      const maxScroll = (baseProducts.length - itemsVisibleRef.current) * cardPlusGap;
      
      // Clamp scroll position
      const clampedScroll = Math.max(0, Math.min(newScroll, maxScroll));
      
      console.log('Wheel scroll:', {
        deltaX: e.deltaX,
        currentScroll,
        newScroll,
        clampedScroll,
        maxScroll
      });
      
      // Anvend scroll uden transition
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = `translateX(-${Math.round(clampedScroll)}px)`;
      }
      
      // NYT: Sync current index med faktisk position
      const calculatedIndex = Math.round(clampedScroll / cardPlusGap);
      const maxIndex = baseProducts.length - itemsVisibleRef.current;
      currentIndexRef.current = Math.max(0, Math.min(calculatedIndex, maxIndex));
      
      console.log('Wheel: synced currentIndex to', currentIndexRef.current);
      
      // Clear og start auto-snap
      clearAutoSnap();
      startAutoSnap();
    }
  }, [getCurrentScroll, clearAutoSnap, startAutoSnap, baseProducts.length]);

  // Setup event listeners
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || baseProducts.length === 0) return;
    
    calculateDimensions();
    updatePosition(false);
    
    // Log layout info
    console.log('=== CAROUSEL LAYOUT INFO ===');
    console.log('Window width:', window.innerWidth);
    console.log('Items visible:', itemsVisibleRef.current);
    console.log('Viewport width:', viewportRef.current?.getBoundingClientRect().width);
    console.log('Card width:', cardWidthRef.current);
    console.log('Gap:', gapRef.current);
    console.log('Total cards:', baseProducts.length);
    console.log('============================');
    
    // Window resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        console.log('Window resized, recalculating...');
        
        // Force recalculation
        calculateDimensions();
        
        // Reset position
        currentIndexRef.current = 0;
        updatePosition(false);
        
        console.log('Recalculated - Items visible:', itemsVisibleRef.current, 'Card width:', cardWidthRef.current);
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd, { passive: true });
    viewport.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchmove', handleTouchMove);
      viewport.removeEventListener('touchend', handleTouchEnd);
      viewport.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      viewport.removeEventListener('wheel', handleWheel);
      clearAutoSnap();
    };
  }, [baseProducts.length, calculateDimensions, updatePosition, handleTouchStart, handleTouchMove, handleTouchEnd, 
      handleMouseDown, handleMouseMove, handleMouseUp, handleWheel, clearAutoSnap]);

  const handleTabChange = (tab: 'popular' | 'new' | 'recommended') => {
    setActiveTab(tab);
    currentIndexRef.current = 0;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = 'translateX(0px)';
    }
  };

  return (
    <section className="product-carousel-wrapper" aria-label="Populære produkter i webshoppen">
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
        ) : baseProducts.length > 0 ? (
          <div className="carousel-container">
            {/* Navigation arrows */}
            <button
              onClick={navigatePrev}
              className="carousel-arrow prev-arrow"
              aria-label="Forrige produkter"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            
            <button
              onClick={navigateNext}
              className="carousel-arrow next-arrow"
              aria-label="Næste produkter"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Viewport */}
            <div ref={viewportRef} className="carousel-viewport">
              {/* Products track */}
              <div ref={trackRef} className="products-track">
                {baseProducts.map((product, index) => (
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
