import { ShopifyProduct } from "@/types/shopify";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;

  const handleAddToCart = () => {
    const defaultVariant = node.variants.edges[0]?.node;
    
    if (!defaultVariant) {
      toast.error("Produktet er ikke tilgængeligt");
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
    toast.success("Tilføjet til kurv", {
      description: node.title,
      position: "top-center"
    });
  };

  const imageUrl = node.images.edges[0]?.node.url;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/product/${node.handle}`}>
        <div className="aspect-square overflow-hidden bg-secondary/10">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={node.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Intet billede
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-accent transition-colors">
            {node.title}
          </h3>
        </Link>
        {node.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {node.description}
          </p>
        )}
        <p className="text-xl font-bold">
          {currency} {price.toFixed(2)}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          size="lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Læg i kurv
        </Button>
      </CardFooter>
    </Card>
  );
};
