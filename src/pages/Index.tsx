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
import { Zap } from "lucide-react";

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
      <footer className="border-t py-12 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <span>Billig Elektriker</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professionel el-service til fair priser
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>El-arbejde</li>
                <li>Smart Home</li>
                <li>Erhverv</li>
                <li>Udlejning</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produkter</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Indendørs belysning</li>
                <li>Udendørs belysning</li>
                <li>Smart Home</li>
                <li>Tilbehør</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Billig Elektriker (ASA ApS). Alle rettigheder forbeholdes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
