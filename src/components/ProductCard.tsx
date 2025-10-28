import { ShopifyProduct } from "@/types/shopify";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;

  const handleAddToCart = () => {
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

  const imageUrl = node.images.edges[0]?.node.url;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-border rounded-2xl">
      <Link to={`/product/${node.handle}`} className="relative block">
        <div className="relative h-[280px] md:h-[240px] lg:h-[280px] overflow-hidden bg-muted/30 rounded-t-2xl">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={node.title}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
              {/* Status badge */}
              <span className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white" 
                    style={{ background: '#10B981' }}>
                På lager
              </span>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {t('productCard.noImage')}
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-5">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {node.title}
          </h3>
        </Link>
        
        {node.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {node.description}
          </p>
        )}
        
        <p className="text-2xl font-bold text-foreground mb-4">
          DKK {price.toFixed(2)}
        </p>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full h-12 text-[15px] font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
          style={{ 
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t('productCard.addToCart')}
        </Button>
      </CardContent>
    </Card>
  );
};
