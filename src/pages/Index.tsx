import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ShopifyProduct } from "@/types/shopify";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Loader2, Store } from "lucide-react";

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section 
          className="relative py-20 px-4 overflow-hidden"
          style={{ background: 'var(--hero-gradient)' }}
        >
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <Store className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Velkommen til Min Butik
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Opdag vores kuraterede kollektion af kvalitetsprodukter
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDM4YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        </section>

        <section className="py-16 px-4">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Vores Produkter</h2>
              <p className="text-muted-foreground text-lg">
                Udforsk vores nøje udvalgte kollektion
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : data && data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Ingen produkter fundet</h3>
                <p className="text-muted-foreground">
                  Fortæl mig om produkter du vil tilføje til din butik!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container text-center text-muted-foreground">
          <p>© 2025 Min Butik. Alle rettigheder forbeholdes.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
