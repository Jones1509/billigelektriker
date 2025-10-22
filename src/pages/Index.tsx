import { useState } from "react";
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
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'billigelektriker2025') {
      setIsUnlocked(true);
    } else {
      alert('Forkert adgangskode');
      setPassword('');
    }
  };

  // BLOCK EVERYTHING if not unlocked
  if (!isUnlocked) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#10B981] via-[#3B82F6] to-[#EF4444]">
        <div className="w-full max-w-xl space-y-12 relative z-10 bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-10 shadow-2xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
              Billig Elektriker
            </h1>
            <div className="h-px w-24 mx-auto bg-white/40" />
            <p className="text-xl md:text-2xl text-white/90 drop-shadow font-light">
              Snart lancerer vi Danmarks mest moderne elektrikerplatform
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Adgangskode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/95 border border-white/40 rounded-lg px-6 py-6 text-base font-light placeholder:text-gray-500"
                autoFocus
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-white hover:bg-white/90 text-gray-900 font-medium text-base py-6 rounded-lg transition-all"
            >
              Fortsæt
            </button>
            
            <p className="text-white/80 text-sm text-center font-light">
              Adgangskode: billigelektriker2025
            </p>
          </form>
        </div>
      </div>
    );
  }
  
  // Show normal page only if unlocked
  
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
      <footer className="border-t bg-gradient-to-b from-background to-blue-50/20 py-8 sm:py-10 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        
        <div className="container relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-8 md:mb-10 lg:mb-12 px-4 md:px-0">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 md:mb-6">
                <div className="p-2 md:p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-lg">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span>Billig Elektriker</span>
              </div>
              <p className="text-muted-foreground mb-4 md:mb-5 lg:mb-6 leading-relaxed max-w-md text-xs sm:text-sm md:text-base">
                {t('footer.description')}
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Phone className="h-4 w-4 mr-2" />
                  {t('footer.callUs')}
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 flex items-center gap-2">
                <div className="h-1 w-6 sm:w-7 md:w-8 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                {t('footer.servicesTitle')}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">{t('footer.electricalWork')}</li>
                <li className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">{t('footer.smartHome')}</li>
                <li className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">{t('footer.business')}</li>
                <li className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">{t('footer.rental')}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 flex items-center gap-2">
                <div className="h-1 w-6 sm:w-7 md:w-8 bg-gradient-to-r from-secondary to-green-600 rounded-full"></div>
                {t('footer.productsTitle')}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="hover:text-secondary hover:translate-x-1 transition-all cursor-pointer">{t('footer.indoorLighting')}</li>
                <li className="hover:text-secondary hover:translate-x-1 transition-all cursor-pointer">{t('footer.outdoorLighting')}</li>
                <li className="hover:text-secondary hover:translate-x-1 transition-all cursor-pointer">{t('footer.smartHome')}</li>
                <li className="hover:text-secondary hover:translate-x-1 transition-all cursor-pointer">{t('footer.accessories')}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-5 sm:pt-6 md:pt-7 lg:pt-8 px-4 md:px-0">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
              <p>{t('footer.copyright')}</p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
                <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
                <a href="#" className="hover:text-primary transition-colors">{t('footer.contact')}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
