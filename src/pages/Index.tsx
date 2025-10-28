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
import { StructuredData } from "@/components/StructuredData";
import { FAQSchema } from "@/components/FAQSchema";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Billig Elektriker København | Certificeret El-Service & Smart Home Webshop</title>
        <meta name="description" content="Billig elektriker i København ⚡ Autoriserede elektrikere til installation, fejlfinding & smart home. Webshop med Philips Hue, IKEA Trådfri m.m. ⭐ Fair priser & høj kvalitet" />
        <meta name="keywords" content="billig elektriker, elektriker københavn, el-installation, fejlfinding, smart home, philips hue, ikea trådfri, certificeret elektriker, autoriseret elektriker, el-service københavn, stikkontakter, afbrydere, led belysning, smart belysning" />
        <link rel="canonical" href="https://billigelektriker.dk" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://storefront-hero-ah7ur.myshopify.com" />
        <link rel="dns-prefetch" href="https://storefront-hero-ah7ur.myshopify.com" />
        
        {/* Additional meta tags */}
        <meta name="author" content="Billig Elektriker ApS" />
        <meta name="geo.region" content="DK-084" />
        <meta name="geo.placename" content="København" />
        <meta name="geo.position" content="55.770249;12.481379" />
        <meta name="ICBM" content="55.770249, 12.481379" />
        
        {/* Mobile optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>
      
      <StructuredData />
      <FAQSchema />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main role="main">
          {/* 1. Hero */}
          <HeroSection />
          
          {/* 2. Service Boxes */}
          <section id="services" aria-label="Vores services">
            <ServiceBoxes />
          </section>
          
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
          <section id="webshop" aria-label="Webshop produkter">
            <ProductSlider />
          </section>
          
          {/* 10. Consultation CTA */}
          <ConsultationSection />
          
          {/* 11. Newsletter */}
          <NewsletterCTA />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
