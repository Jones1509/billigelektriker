import { ShopifyProduct } from "@/types/shopify";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border rounded-2xl h-full flex flex-col">
      <Link to={`/product/${node.handle}`} className="relative block">
        <div className="relative h-[220px] overflow-hidden bg-muted/30 rounded-t-2xl">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={node.title}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
              {/* Status badge */}
              <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white" 
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
      
      <CardContent className="p-3.5 flex-1 flex flex-col">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-semibold text-base leading-[1.3] mb-1.5 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {node.title}
          </h3>
        </Link>
        
        {node.description && (
          <p className="text-[13px] text-muted-foreground line-clamp-2 mb-3 leading-[1.4]">
            {node.description}
          </p>
        )}
        
        <p className="text-[22px] font-bold text-foreground mb-3 mt-auto">
          DKK {price.toFixed(2)}
        </p>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full h-11 text-[14px] font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
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
