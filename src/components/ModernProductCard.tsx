import { useState } from "react";
import { ShopifyProduct } from "@/types/shopify";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QuickViewModal } from "./QuickViewModal";

interface ModernProductCardProps {
  product: ShopifyProduct;
}

export const ModernProductCard = ({ product }: ModernProductCardProps) => {
  const { t } = useTranslation();
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const [isLiked, setIsLiked] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const defaultVariant = node.variants.edges[0]?.node;
    
    if (!defaultVariant) {
      toast.error(t('productCard.notAvailable'));
      return;
    }

    const cartItem = {
      product,
      variantId: defaultVariant.id,
      variantTitle: defaultVariant.title,
      price: defaultVariant.price,
      quantity: 1,
      selectedOptions: defaultVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success(t('productCard.addedToCart'), {
      description: node.title,
      position: "top-center"
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Fjernet fra favoritter" : "Tilføjet til favoritter", {
      position: "top-center"
    });
  };

  const imageUrl = node.images.edges[0]?.node.url;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-border/50 hover:border-primary/20 bg-card">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/5">
          <Link to={`/product/${node.handle}`}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={node.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                {t('productCard.noImage')}
              </div>
            )}
          </Link>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {price < 200 && (
              <Badge className="bg-secondary text-secondary-foreground shadow-md">
                Tilbud
              </Badge>
            )}
          </div>

          {/* Quick View Button - Desktop Only */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowQuickView(true);
            }}
            className="absolute inset-x-0 bottom-0 bg-background/95 backdrop-blur-sm py-2 px-4 
                     flex items-center justify-center gap-2 text-sm font-medium
                     opacity-0 group-hover:opacity-100 transition-all duration-300 
                     hover:bg-primary hover:text-primary-foreground
                     hidden md:flex"
          >
            <Eye className="w-4 h-4" />
            Quick view
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleLike}
            className={`
              absolute top-3 left-3 w-9 h-9 rounded-full 
              bg-background/95 backdrop-blur-sm shadow-md
              flex items-center justify-center
              transition-all duration-300 hover:scale-110
              ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}
            `}
            style={{ animation: isLiked ? 'heartPulse 0.3s ease' : 'none' }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {/* Content */}
        <CardContent className="p-4">
          <Link to={`/product/${node.handle}`}>
            <h3 className="font-semibold text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {node.title}
            </h3>
          </Link>
          {node.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {node.description}
            </p>
          )}
          <p className="text-xl font-bold text-foreground">
            {currency} {price.toFixed(2)}
          </p>
        </CardContent>
        
        {/* Footer */}
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            onClick={handleAddToCart}
            className="flex-1 shadow-md hover:shadow-lg transition-all duration-300"
            size="default"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Læg i kurv
          </Button>
        </CardFooter>
      </Card>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};
