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

  // Product schema for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": node.title,
    "description": node.description || `Køb ${node.title} hos Billig Elektriker`,
    "image": node.images.edges[0]?.node.url,
    "sku": node.id,
    "offers": {
      "@type": "Offer",
      "url": `https://billigelektriker.dk/product/${node.handle}`,
      "priceCurrency": node.priceRange.minVariantPrice.currencyCode,
      "price": node.priceRange.minVariantPrice.amount,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Billig Elektriker"
      }
    }
  };

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
  const altText = node.images.edges[0]?.node.altText || `${node.title} - Smart belysning fra Billig Elektriker`;

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <Card 
        className="group overflow-visible hover:-translate-y-1 border border-border h-full flex flex-col"
        style={{ 
          borderRadius: '1rem',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
        }}
      >
        <Link to={`/product/${node.handle}`} className="relative block" aria-label={`Se ${node.title}`}>
          <div className="relative h-[130px] md:h-[180px] lg:h-[220px] overflow-hidden bg-muted/30" style={{ borderRadius: '1rem 1rem 0 0' }}>
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt={altText}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                />
                {/* Status badge */}
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white" 
                      style={{ background: '#10B981' }}
                      aria-label="Produktet er på lager">
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
      
      <CardContent className="p-2 md:p-2.5 lg:p-3.5 flex-1 flex flex-col">
        <Link to={`/product/${node.handle}`} aria-label={`Læs mere om ${node.title}`}>
          <h3 className="font-semibold text-[11px] md:text-sm lg:text-base leading-tight mb-1 md:mb-1 lg:mb-1.5 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {node.title}
          </h3>
        </Link>
        
        <p className="text-base md:text-lg lg:text-[22px] font-bold text-foreground mb-1.5 md:mb-2 lg:mb-3 mt-auto" aria-label={`Pris: ${price.toFixed(0)} kroner`}>
          DKK {price.toFixed(0)}
        </p>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full h-8 md:h-9 lg:h-11 text-[10px] md:text-xs lg:text-[14px] font-semibold rounded-lg lg:rounded-xl transition-all duration-300 hover:scale-[1.02]"
          style={{ 
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
          }}
          aria-label={`Tilføj ${node.title} til kurv`}
        >
          <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 mr-1 md:mr-1.5 lg:mr-2" aria-hidden="true" />
          <span className="hidden md:inline">{t('productCard.addToCart')}</span>
          <span className="md:hidden">Køb</span>
        </Button>
      </CardContent>
    </Card>
    </>
  );
};
