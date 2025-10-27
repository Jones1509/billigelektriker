import { useState, useEffect } from "react";
import { 
  Phone, User, LogOut, Zap, Search, Smartphone, Car, 
  Server, Briefcase, Power, Lamp, Wifi, Moon, 
  Boxes, Cable, Shield, Menu, Info, Mail, Lightbulb, Bell,
  Lock, Settings, Wrench, ShoppingCart, Battery, Plug, Box, Grid3x3, Gauge, ArrowRight, X
} from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo-new.png";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AnnouncementBar } from "./AnnouncementBar";

const MobileLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'da', name: 'Dansk' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <AccordionItem value="language" className="border-0 border-b border-border/30">
      <AccordionTrigger className="px-3 py-4 text-base font-semibold text-foreground hover:no-underline hover:text-primary transition-colors duration-200">
        Sprog / Language
      </AccordionTrigger>
      <AccordionContent className="pt-1 pb-3">
        <div className="grid grid-cols-2 gap-2">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={i18n.language === language.code ? "default" : "outline"}
              size="sm"
              onClick={() => i18n.changeLanguage(language.code)}
              className="justify-center h-10 transition-all duration-200"
            >
              <span className="text-sm font-medium">{language.name}</span>
            </Button>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const useServices = () => {
  return [
    { title: "Lamper & belysning", description: "Installation og reparation", href: "/pages/lamper-belysning" },
    { title: "Stikkontakter & Afbrydere", description: "Moderne og funktionelle", href: "/pages/stikkontakter-afbrydere" },
    { title: "Akut Hjælp", description: "Døgnservice ved nødsituationer", href: "/pages/akut-hjaelp", badge: "24/7" },
    { title: "Fejlfinding", description: "Hurtig diagnosticering", href: "/pages/fejlfinding" },
    { title: "Sikkerhed", description: "El-tjek og eftersyn", href: "/pages/sikkerhed" },
    { title: "Smart Home & Energioptimering", description: "Intelligent automatisering", href: "/pages/smart-home" },
    { title: "Vedligeholdelse & Serviceaftaler", description: "Forebyggende vedligehold", href: "/pages/vedligeholdelse" },
    { title: "Rådgivning & Indkøb", description: "Professionel sparring", href: "/pages/raadgivning" },
    { title: "Specialydelser & Udlejning", description: "Avancerede løsninger", href: "/pages/specialydelser" },
  ];
};

const useProducts = () => {
  return [
    {
      title: "LAMPER & SPOTS",
      allLink: { title: "Alle lamper", href: "/collections/lamper" },
      links: [
        { title: "Loftlamper & pendler", href: "/collections/loftlamper" },
        { title: "Væglamper", href: "/collections/vaeglamper" },
        { title: "Bordlamper", href: "/collections/bordlamper" },
        { title: "Gulvlamper", href: "/collections/gulvlamper" },
        { title: "Spots", href: "/collections/spots" },
      ]
    },
    {
      title: "LYSKILDER",
      allLink: { title: "Alle lyskilder", href: "/collections/lyskilder" },
      links: [
        { title: "LED-pærer", href: "/collections/led-paerer" },
        { title: "Halogenpærer", href: "/collections/halogen" },
        { title: "Glødepærer", href: "/collections/gloede" },
        { title: "Lysstofrer", href: "/collections/lysstofrer" },
      ]
    },
    {
      title: "LAMPETILBEHØR",
      allLink: { title: "Alle tilbehør", href: "/collections/tilbehoer" },
      links: [
        { title: "Strømskinner", href: "/collections/stroemskinner" },
        { title: "Drivere & transformere", href: "/collections/drivere" },
        { title: "Safeboxes", href: "/collections/safeboxes" },
        { title: "Fatninger & kroge", href: "/collections/fatninger" },
        { title: "Lampeskærme", href: "/collections/lampeskaerme" },
      ]
    },
    {
      title: "EL-INSTALLATIONER",
      allLink: { title: "Alle installationer", href: "/collections/installationer" },
      links: [
        { title: "Stikkontakter", href: "/collections/stikkontakter" },
        { title: "Afbrydere", href: "/collections/afbrydere" },
        { title: "Lysdæmpere", href: "/collections/lysdaempere" },
        { title: "Bevægelsessensorer", href: "/collections/bevaegelsessensorer" },
        { title: "Rammer", href: "/collections/rammer" },
      ]
    },
    {
      title: "TAVLEMATERIEL",
      allLink: { title: "Alle tavler", href: "/collections/tavler" },
      links: [
        { title: "Tavlekomponenter", href: "/collections/tavlekomponenter" },
        { title: "Målertavler", href: "/collections/maalertavler" },
        { title: "Gruppetavler", href: "/collections/gruppetavler" },
        { title: "Tilbehør", href: "/collections/tavle-tilbehoer" },
      ]
    },
    {
      title: "KABEL & LEDNING",
      allLink: { title: "Alle kabler", href: "/collections/kabler" },
      links: [
        { title: "Installations- & flexrør", href: "/collections/flexroer" },
        { title: "Kabler & ledninger", href: "/collections/kabler" },
        { title: "Kabeltromler", href: "/collections/kabeltromler" },
        { title: "Stikdåser & forlængerledninger", href: "/collections/stikdaaser" },
        { title: "Kabelkanaler & befæstigelse", href: "/collections/kabelkanaler" },
      ]
    },
  ];
};

export const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const services = useServices();
  const products = useProducts();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [forceClose, setForceClose] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleMenuEnter = (menu: string) => {
    if (forceClose) return;
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveMenu(menu);
    setMenuOpen(menu);
  };

  const handleMenuLeave = () => {
    if (forceClose) return;
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setActiveMenu(null);
      setMenuOpen(null);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleCloseMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear any pending hover timeouts
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    // Force close the menu aggressively - set to empty string to trigger controlled close
    setForceClose(true);
    setActiveMenu(null);
    setMenuOpen("");
    
    // Force immediate re-render
    setTimeout(() => {
      setMenuOpen(null);
    }, 0);
    
    // Reset force close after a short delay to allow menu interactions again
    setTimeout(() => {
      setForceClose(false);
    }, 300);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success(t('header.logoutSuccess'));
    navigate("/");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 w-full bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/95">
        <div className="container py-3 lg:py-6">
          {/* Mobile Layout - Flexbox */}
          <div className="flex lg:hidden items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Billig Elektriker" 
                className="h-11 w-auto"
                style={{ 
                  imageRendering: "-webkit-optimize-contrast",
                  WebkitFontSmoothing: "antialiased"
                }}
                loading="eager"
              />
            </Link>
            
            <div className="flex items-center gap-3">
              <CartDrawer />
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 h-11 w-11 hover:scale-110 active:scale-95"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[420px] bg-background border-l border-border/50 p-0">
                  <SheetHeader className="px-6 py-6 border-b border-border/30">
                    <SheetTitle className="text-2xl font-bold text-foreground">
                      {t('header.menu')}
                    </SheetTitle>
                  </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)] mobile-menu-scroll">
                <div className="space-y-1 pb-10 px-4 pt-4">
                  <Accordion type="single" collapsible className="w-full space-y-1">
                    {/* Services */}
                    <AccordionItem value="services" className="border-0 border-b border-border/30">
                      <AccordionTrigger className="px-3 py-4 text-base font-semibold text-foreground hover:no-underline hover:text-primary transition-colors duration-200">
                        {t('header.services')}
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-3">
                        <div className="space-y-1">
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              onClick={closeMobileMenu}
                              className="flex items-center justify-between gap-2 px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                            >
                              <div className="flex-1">
                                <span className="font-medium text-sm block group-hover:text-primary transition-colors">{service.title}</span>
                                <span className="text-xs text-muted-foreground">{service.description}</span>
                              </div>
                              {service.badge && (
                                <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded">
                                  {service.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Products */}
                    <AccordionItem value="products" className="border-0 border-b border-border/30">
                      <AccordionTrigger className="px-3 py-4 text-base font-semibold text-foreground hover:no-underline hover:text-primary transition-colors duration-200">
                        {t('header.products')}
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-3">
                        <div className="space-y-4">
                          {products.map((category) => (
                            <div key={category.title} className="space-y-1.5">
                              <div className="font-semibold text-xs px-3 py-1.5 text-muted-foreground uppercase tracking-wide">
                                {category.title}
                              </div>
                              <div className="space-y-0.5">
                                {category.links.slice(0, 5).map((link) => (
                                  <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={closeMobileMenu}
                                    className="block text-sm text-foreground hover:text-primary py-2 px-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
                                  >
                                    {link.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                        {/* Language Switcher in Mobile Menu */}
                        <MobileLanguageSwitcher />
                      </Accordion>

                  {/* Additional Links */}
                  <div className="border-t border-border/30 pt-2">
                    <Link
                      to="/om-os"
                      onClick={closeMobileMenu}
                      className="block px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                    >
                      <span className="font-medium text-base group-hover:text-primary transition-colors">{t('header.about')}</span>
                    </Link>
                    <Link
                      to="/kontakt"
                      onClick={closeMobileMenu}
                      className="block px-3 py-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
                    >
                      <span className="font-medium text-base group-hover:text-primary transition-colors">{t('header.contact')}</span>
                    </Link>
                  </div>

                      {/* User Actions */}
                      <div className="pt-2 space-y-2 border-t border-border/30">
                        {user ? (
                          <>
                            <Button
                              variant="outline"
                              className="w-full justify-center h-11 transition-all duration-200"
                              onClick={() => {
                                closeMobileMenu();
                                navigate("/profile");
                              }}
                            >
                              <span className="font-medium">{t('header.myProfile')}</span>
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-center h-11 transition-all duration-200"
                              onClick={() => {
                                closeMobileMenu();
                                handleSignOut();
                              }}
                            >
                              <span className="font-medium">{t('header.logout')}</span>
                            </Button>
                          </>
                        ) : (
                          <Button
                            className="w-full h-11 transition-all duration-200"
                            onClick={() => {
                              closeMobileMenu();
                              navigate("/auth");
                            }}
                          >
                            <span className="font-semibold">{t('header.login')}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Layout - Grid */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <Link to="/" className="flex items-center justify-start">
              <img 
                src={logo} 
                alt="Billig Elektriker" 
                className="h-20 w-auto"
                style={{ 
                  imageRendering: "-webkit-optimize-contrast",
                  WebkitFontSmoothing: "antialiased"
                }}
                loading="eager"
              />
            </Link>
            
            <NavigationMenu 
              value={menuOpen ?? ""}
              onValueChange={(value) => {
                if (!value) {
                  setMenuOpen(null);
                  setActiveMenu(null);
                }
              }}
            >
          <NavigationMenuList>
            <NavigationMenuItem
              value="services"
              onMouseEnter={() => handleMenuEnter("services")}
            >
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                {t('header.services')}
              </NavigationMenuTrigger>
              <NavigationMenuContent onMouseLeave={handleMenuLeave}>
                <div className="mega-menu-container">
                  <button 
                    type="button"
                    className="mega-menu-close" 
                    aria-label="Luk menu"
                    onClick={handleCloseMenu}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="mega-menu-inner">
                    <div className="service-grid">
                      {services.map((service, idx) => (
                        <Link 
                          key={service.href} 
                          to={service.href} 
                          className="service-card"
                        >
                          <h3>
                            {service.title}
                            {service.badge && (
                              <span className="badge badge-red">
                                {service.badge}
                              </span>
                            )}
                          </h3>
                          <p>{service.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem
              value="products"
              onMouseEnter={() => handleMenuEnter("products")}
            >
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                {t('header.products')}
              </NavigationMenuTrigger>
              <NavigationMenuContent onMouseLeave={handleMenuLeave}>
                <div className="mega-menu-container">
                  <button 
                    type="button"
                    className="mega-menu-close" 
                    aria-label="Luk menu"
                    onClick={handleCloseMenu}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="mega-menu-inner">
                    <div className="mega-menu-grid-6">
                      {products.map((column) => (
                        <div key={column.title} className="menu-column">
                          <h3 className="menu-column-title">{column.title}</h3>
                          <ul>
                            {column.links.map((link) => (
                              <li key={link.href}>
                                <Link to={link.href} className="menu-link">
                                  {link.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link to={column.allLink.href} className="category-all-link">
                            {column.allLink.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-3 justify-end">
              <div className="flex items-center gap-1 mr-2">
                <Button
                  variant="ghost"
                  asChild
                  className="text-white hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Link to="/om-os">{t('header.about')}</Link>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="text-white hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Link to="/kontakt">{t('header.contact')}</Link>
                </Button>
              </div>
              
              <div className="flex">
                <LanguageSwitcher />
              </div>
          
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="relative rounded-full text-white hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:scale-105"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-xl">
                    <DropdownMenuLabel>{t('header.myAccount')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('header.profile')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('header.logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate("/auth")} 
                  className="relative rounded-full text-white hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:scale-105"
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
              
              <CartDrawer />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
