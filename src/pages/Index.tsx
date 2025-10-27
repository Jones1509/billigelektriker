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
import { ConsultationSection } from "@/components/ConsultationSection";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
        
        {/* 10. Consultation CTA */}
        <ConsultationSection />
        
        {/* 11. Newsletter */}
        <NewsletterCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
