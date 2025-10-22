import { HeroSection } from "@/components/HeroSection";
import { ServiceBoxes } from "@/components/ServiceBoxes";
import { TeamSection } from "@/components/TeamSection";
import { ServiceColumns } from "@/components/ServiceColumns";
import { ValuesSection } from "@/components/ValuesSection";
import { GradientDivider } from "@/components/GradientDivider";
import { SmartLightSection } from "@/components/SmartLightSection";
import { ProductCategories } from "@/components/ProductCategories";
import { StarterPackages } from "@/components/StarterPackages";
import { ProductSlider } from "@/components/ProductSlider";
import { BookingCTA } from "@/components/BookingCTA";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Zap, Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* 1. Hero */}
        <HeroSection />
        
        {/* 2. Service Boxes */}
        <ServiceBoxes />
        
        {/* 3. Team */}
        <TeamSection />
        
        {/* 4. Service Columns */}
        <ServiceColumns />
        
        {/* 5. Values */}
        <ValuesSection />
        
        {/* Gradient Divider */}
        <GradientDivider />
        
        {/* 6. Smart Light */}
        <SmartLightSection />
        
        {/* 7. Product Categories */}
        <ProductCategories />
        
        {/* 8. Starter Packages */}
        <StarterPackages />
        
        {/* 9. Product Slider */}
        <ProductSlider />
        
        {/* 10. Booking CTA */}
        <BookingCTA />
        
        {/* 11. Newsletter */}
        <NewsletterCTA />
      </main>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-b from-background to-blue-50/20 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="container relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 font-bold text-2xl mb-6">
                <div className="p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span>Billig Elektriker</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
                Professionel el-service til fair priser. Certificerede elektrikere med passion for kvalitet og kundetilfredshed.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Phone className="h-4 w-4 mr-2" />
                  Ring til os
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                Services
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">El-arbejde</li>
                <li className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">Smart Home</li>
                <li className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">Erhverv</li>
                <li className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">Udlejning</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <div className="h-1 w-8 bg-gradient-to-r from-secondary to-green-600 rounded-full"></div>
                Produkter
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-secondary hover:translate-x-1 transition-all cursor-pointer">Indendørs belysning</li>
                <li className="hover:text-secondary hover:translate-x-1 transition-all cursor-pointer">Udendørs belysning</li>
                <li className="hover:text-secondary hover:translate-x-1 transition-all cursor-pointer">Smart Home</li>
                <li className="hover:text-secondary hover:translate-x-1 transition-all cursor-pointer">Tilbehør</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2025 Billig Elektriker (ASA ApS). Alle rettigheder forbeholdes.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privatlivspolitik</a>
                <a href="#" className="hover:text-primary transition-colors">Handelsbetingelser</a>
                <a href="#" className="hover:text-primary transition-colors">Kontakt</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
