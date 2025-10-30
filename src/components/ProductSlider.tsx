import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, COLLECTION_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useCallback } from "react";

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

  // Calculate dimensions based on screen width
  const calculateDimensions = useCallback(() => {
    const width = window.innerWidth;
    
    // Determine number of visible items - ALWAYS consistent based on screen width
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
    
    // FORCE apply gap to track to ensure consistency
    trackRef.current.style.gap = `${gapRef.current}px`;
    
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
    
    // CRITICAL: Force apply width to ALL cards
    const cards = viewportRef.current.querySelectorAll('.product-card');
    cards.forEach(card => {
      const cardEl = card as HTMLElement;
      cardEl.style.width = `${cardWidthRef.current}px`;
      cardEl.style.minWidth = `${cardWidthRef.current}px`;
      cardEl.style.maxWidth = `${cardWidthRef.current}px`;
      cardEl.style.flexShrink = '0'; // Prevent shrinking
    });
    
    // Verificer faktisk bredde
    if (cards.length > 0) {
      const firstCard = cards[0] as HTMLElement;
      const actualWidth = Math.round(firstCard.getBoundingClientRect().width);
      
      if (Math.abs(actualWidth - cardWidthRef.current) > 2) {
        console.log('⚠️ Adjusting card width from', cardWidthRef.current, 'to', actualWidth);
        cardWidthRef.current = actualWidth;
        
        // Re-apply corrected width
        cards.forEach(card => {
          const cardEl = card as HTMLElement;
          cardEl.style.width = `${cardWidthRef.current}px`;
          cardEl.style.minWidth = `${cardWidthRef.current}px`;
          cardEl.style.maxWidth = `${cardWidthRef.current}px`;
        });
      }
    }
    
    // Log final dimensions
    console.log('✅ Final dimensions:', {
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
      console.log('Clearing existing auto-snap timer');
      clearTimeout(autoSnapTimerRef.current);
      autoSnapTimerRef.current = null;
    }
  }, []);

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
    console.log('=== MOBILE SNAP START ===');
    
    calculateDimensions();
    
    if (!viewportRef.current || !trackRef.current) return;
    
    // Få viewport info
    const viewportRect = viewportRef.current.getBoundingClientRect();
    const viewportLeft = viewportRect.left;
    const viewportWidth = viewportRect.width;
    
    console.log('Viewport:', { left: viewportLeft, width: viewportWidth });
    
    // Find hvilket kort er tættest på viewport's venstre kant
    const cards = Array.from(viewportRef.current.querySelectorAll('.product-card'));
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardLeft = cardRect.left;
      
      // Distance fra kortets venstre kant til viewport's venstre kant
      const distance = Math.abs(cardLeft - viewportLeft);
      
      console.log(`Card ${index}: left=${Math.round(cardLeft)}, distance=${Math.round(distance)}`);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    console.log('Closest card to viewport left:', closestIndex);
    
    // KRITISK: På mobil skal vi kunne se 2 kort
    // Så max index = total - 2
    const maxIndex = baseProducts.length - 2;
    const targetIndex = Math.min(closestIndex, maxIndex);
    
    console.log('Target index (clamped):', targetIndex);
    console.log('Will show cards:', targetIndex, 'and', targetIndex + 1);
    
    // Nu beregn PRÆCIS hvor meget vi skal flytte track
    // Vi vil have card[targetIndex] skal være ved viewport's venstre kant
    
    const targetCard = cards[targetIndex] as HTMLElement;
    if (!targetCard) {
      console.error('Target card not found');
      return;
    }
    
    const targetCardRect = targetCard.getBoundingClientRect();
    const trackRect = trackRef.current.getBoundingClientRect();
    
    console.log('Target card current position:', Math.round(targetCardRect.left));
    console.log('Track current position:', Math.round(trackRect.left));
    
    // Beregn offset: hvor langt skal track flyttes for at aligne?
    // Target card's current distance from viewport left
    const currentOffset = targetCardRect.left - viewportLeft;
    
    console.log('Current offset of target card:', Math.round(currentOffset));
    
    // Current transform value
    const currentTransform = getCurrentScroll();
    
    console.log('Current transform:', currentTransform);
    
    // New transform = current + offset
    const targetTransform = currentTransform + currentOffset;
    
    console.log('Target transform:', Math.round(targetTransform));
    
    // Opdater state
    currentIndexRef.current = targetIndex;
    
    // Anvend transform
    trackRef.current.style.transition = 'transform 0.4s ease-out';
    trackRef.current.style.transform = `translateX(-${Math.round(targetTransform)}px)`;
    
    isTransitioningRef.current = true;
    
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 450);
    
    console.log('=== MOBILE SNAP END ===');
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
    console.log('Is mobile:', isMobile);
    
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
    console.log('Starting momentum, velocity:', initialVelocity);
    
    let velocity = initialVelocity;
    const friction = 0.86; // Increased friction for faster stop (like Instagram)
    const minVelocity = 0.5;
    
    const animate = () => {
      if (Math.abs(velocity) < minVelocity) {
        console.log('Momentum ended, starting auto-snap');
        
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
        
        // Start auto-snap timer inline to avoid circular dependency
        clearAutoSnap();
        console.log('Starting auto-snap timer: 5000 ms');
        autoSnapTimerRef.current = setTimeout(() => {
          console.log('⏰ AUTO-SNAP TIMER FIRED');
          snapToNearest();
        }, 5000);
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
  }, [getCurrentScroll, calculateDimensions, clearAutoSnap, snapToNearest, baseProducts.length]);

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
    const diff = (startXRef.current - currentX) * 1.0; // 1:1 touch tracking
    
    const newScroll = startScrollLeftRef.current + diff;
    const isMobile = window.innerWidth < 768;
    const maxIndex = isMobile 
      ? Math.max(0, baseProducts.length - 2)
      : Math.max(0, baseProducts.length - itemsVisibleRef.current);
    const maxScroll = maxIndex * (cardWidthRef.current + gapRef.current);
    
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
    
    // KRITISK: Clear auto-snap during touch
    clearAutoSnap();
  }, [baseProducts.length, clearAutoSnap]);

  const handleTouchEnd = useCallback(() => {
    console.log('=== TOUCH END ===');
    console.log('Velocity:', velocityRef.current);
    
    // Apply momentum hvis hurtig swipe
    if (Math.abs(velocityRef.current) > 0.5) {
      console.log('Applying momentum');
      applyMomentum(-velocityRef.current * 28); // Reduced from 50 to 28 for controlled momentum
    } else {
      // Ingen momentum - sync index
      console.log('No momentum, syncing index');
      
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
    }
    
    // KRITISK: Start auto-snap timer ALTID efter touch (inline to avoid circular dependency)
    clearAutoSnap();
    console.log('Starting 5 second auto-snap timer...');
    autoSnapTimerRef.current = setTimeout(() => {
      console.log('⏰ AUTO-SNAP TIMER FIRED');
      snapToNearest();
    }, 5000);
    console.log('Timer started, will snap in 5 seconds');
  }, [getCurrentScroll, applyMomentum, clearAutoSnap, snapToNearest, baseProducts.length]);

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
      applyMomentum(-velocityRef.current * 28); // Matched with touch for consistency
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
      
      // Start auto-snap inline
      clearAutoSnap();
      autoSnapTimerRef.current = setTimeout(() => {
        console.log('⏰ AUTO-SNAP TIMER FIRED');
        snapToNearest();
      }, 5000);
    }
  }, [getCurrentScroll, applyMomentum, clearAutoSnap, snapToNearest, baseProducts.length]);

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
      
      // Clear og start auto-snap inline
      clearAutoSnap();
      autoSnapTimerRef.current = setTimeout(() => {
        console.log('⏰ AUTO-SNAP TIMER FIRED');
        snapToNearest();
      }, 5000);
    }
  }, [getCurrentScroll, clearAutoSnap, snapToNearest, baseProducts.length]);

  // Setup event listeners
  // Force recalculation when collection data changes
  useEffect(() => {
    if (!viewportRef.current || !trackRef.current || baseProducts.length === 0) return;
    
    console.log('🔄 Collection data changed, recalculating layout...');
    
    // Fallback timer: Force visibility after 2 seconds if something goes wrong
    const fallbackTimer = setTimeout(() => {
      console.warn('⚠️ FALLBACK: Forcing products visible after timeout');
      if (trackRef.current) {
        trackRef.current.style.transition = 'opacity 0.25s ease-in';
        trackRef.current.style.opacity = '1';
      }
    }, 2000);
    
    // Wait for React to finish rendering new products to DOM
    const recalculateLayout = () => {
      if (!viewportRef.current || !trackRef.current) {
        clearTimeout(fallbackTimer);
        return;
      }
      
      // Force reflow to ensure fresh layout calculations
      void viewportRef.current.offsetHeight;
      void trackRef.current.offsetHeight;
      
      // Get fresh card references
      const cards = viewportRef.current.querySelectorAll('.product-card');
      console.log('📦 Cards in DOM:', cards.length);
      
      // Recalculate dimensions with fresh DOM state
      calculateDimensions();
      
      // Verify cards got correct dimensions
      if (cards.length > 0) {
        const firstCard = cards[0] as HTMLElement;
        const actualWidth = Math.round(firstCard.getBoundingClientRect().width);
        console.log('✅ Card width after recalc:', actualWidth, 'px');
      }
      
      // Reset to start position
      currentIndexRef.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = 'translateX(0px)';
      }
      
      // Force one more reflow
      void trackRef.current.offsetHeight;
      
      // Now FADE IN products smoothly
      requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = 'opacity 0.25s ease-in';
          trackRef.current.style.opacity = '1';
          console.log('✅ Products faded in successfully');
        }
        
        // Clear fallback timer since we succeeded
        clearTimeout(fallbackTimer);
      });
      
      console.log('✅ Layout recalculated after collection change');
    };
    
    // Use double RAF to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(recalculateLayout, 50);
      });
    });
    
    // Cleanup function
    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [collectionData, calculateDimensions]);

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

  const handleTabChange = (tab: keyof typeof COLLECTION_CONFIG) => {
    // Ignore if same tab is already active
    if (activeTab === tab) {
      console.log('⚠️ Same tab already active, ignoring click');
      return;
    }
    
    // Prevent tab change if already loading
    if (isLoading) {
      console.log('⚠️ Already loading, ignoring tab click');
      return;
    }
    
    console.log('🎯 TAB CLICKED:', tab, '→ Will fetch collection:', COLLECTION_CONFIG[tab].shopifyHandle);
    
    // INSTANT hide products to prevent ugly layout flash
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
      trackRef.current.style.opacity = '0';
      trackRef.current.style.transform = 'translateX(0px)';
    }
    
    // Clear any pending timers
    clearAutoSnap();
    
    // Reset state flags
    isTransitioningRef.current = false;
    isDraggingRef.current = false;
    
    // Reset position
    currentIndexRef.current = 0;
    
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
        <div className="text-center mb-10 md:mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-semibold mb-8 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            {t('productSlider.badge')}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
            {t('productSlider.title')}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10">
            {t('productSlider.subtitle')}
          </p>
          
          {/* Tab buttons - Labels come from COLLECTION_CONFIG */}
          <nav aria-label="Produktfiltre">
            <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 mb-[100px] md:mb-[100px] rounded-full relative z-[1]" style={{ background: '#F3F4F6' }} role="tablist">
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
          <div className="carousel-container">
            {/* Navigation arrows */}
            <button
              onClick={navigatePrev}
              className="carousel-arrow prev-arrow"
              style={{ zIndex: 1 }}
              aria-label="Forrige produkter"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            
            <button
              onClick={navigateNext}
              className="carousel-arrow next-arrow"
              style={{ zIndex: 1 }}
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
