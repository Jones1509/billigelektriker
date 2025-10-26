import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const CartDrawer = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { 
    items, 
    isLoading, 
    updateQuantity, 
    removeItem, 
    createCheckout 
  } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  const handleCheckout = async () => {
    try {
      console.log('Starting checkout with items:', items);
      
      // Åbn et nyt vindue med det samme for at undgå popup blocker
      const checkoutWindow = window.open('about:blank', '_blank');
      
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      console.log('Checkout URL created:', checkoutUrl);
      
      if (checkoutUrl && checkoutWindow) {
        console.log('Redirecting to checkout URL');
        checkoutWindow.location.href = checkoutUrl;
        setIsOpen(false);
        toast.success("Åbner checkout", {
          description: "Du bliver nu sendt videre til Shopify checkout."
        });
      } else if (checkoutUrl) {
        // Fallback hvis popup blev blokeret - redirect i samme vindue
        console.log('Popup blocked, redirecting in same window');
        window.location.href = checkoutUrl;
      } else {
        if (checkoutWindow) checkoutWindow.close();
        console.error('No checkout URL returned');
        toast.error("Ingen checkout URL", {
          description: "Der blev ikke returneret en checkout URL fra Shopify."
        });
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Kunne ikke oprette checkout", {
        description: error instanceof Error ? error.message : "Prøv venligst igen senere."
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-11 w-11 md:h-10 md:w-10 md:rounded-full rounded-[10px] text-white hover:text-white backdrop-blur-sm bg-white/15 md:bg-white/5 hover:bg-white/20 md:hover:bg-white/10 border-0 md:border md:border-white/10 md:hover:border-white/20 transition-all duration-300 md:hover:shadow-lg md:hover:shadow-white/10 active:scale-95 md:hover:scale-105 group"
        >
          <ShoppingCart className="h-6 w-6 md:h-5 md:w-5 transition-transform group-hover:scale-110" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold bg-destructive text-destructive-foreground border-2 border-primary shadow-lg">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>{t('cart.title')}</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? t('cart.emptyCart') : t('cart.itemsInCart', { count: totalItems })}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('cart.emptyCart')}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-2">
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.product.node.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedOptions.map(option => option.value).join(' • ')}
                        </p>
                        <p className="font-semibold">
                          DKK {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{t('cart.total')}</span>
                  <span className="text-xl font-bold">
                    DKK {totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('cart.creatingCheckout')}
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('cart.goToCheckout')}
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
