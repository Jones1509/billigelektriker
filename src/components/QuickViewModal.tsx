import { useState } from "react";
import { ShopifyProduct } from "@/types/shopify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickViewModalProps {
  product: ShopifyProduct;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

export const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) => {
  const { node } = product;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const images = node.images.edges;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const defaultVariant = node.variants.edges[0]?.node;

  const handleAddToCart = () => {
    onAddToCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative bg-secondary/5">
            {images.length > 0 ? (
              <>
                <img
                  src={images[selectedImageIndex]?.node.url}
                  alt={node.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`
                          w-16 h-16 rounded-md overflow-hidden border-2 transition-all
                          ${selectedImageIndex === index 
                            ? 'border-primary shadow-lg scale-105' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                          }
                        `}
                      >
                        <img
                          src={image.node.url}
                          alt={`${node.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-muted-foreground">
                Intet billede
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold pr-8">
                {node.title}
              </DialogTitle>
            </DialogHeader>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-foreground">
                {currency} {price.toFixed(2)}
              </p>
              {defaultVariant?.availableForSale ? (
                <Badge className="mt-2 bg-secondary text-secondary-foreground">
                  På lager
                </Badge>
              ) : (
                <Badge variant="destructive" className="mt-2">
                  Udsolgt
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 flex-1">
              <h4 className="font-semibold mb-2">Beskrivelse</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {node.description || "Ingen beskrivelse tilgængelig"}
              </p>
            </div>

            {/* Specifications */}
            {node.options && node.options.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Specifikationer</h4>
                <div className="space-y-2">
                  {node.options.map((option) => (
                    <div key={option.name} className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{option.name}:</span>
                      <span className="text-sm font-medium">{option.values.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full shadow-md hover:shadow-lg transition-all"
                size="lg"
                disabled={!defaultVariant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Læg i kurv
              </Button>
              
              <Link to={`/product/${node.handle}`} onClick={onClose}>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Se fuld produktside
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
