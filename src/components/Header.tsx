import { useState, useEffect } from "react";
import { 
  Phone, User, LogOut, Zap, Search, Smartphone, Car, 
  Server, Briefcase, Power, Lamp, Wifi, Moon, 
  Boxes, Cable, Shield, Menu, Info, Mail, Lightbulb, Bell,
  Lock, Settings, Wrench, ShoppingCart, Battery, Plug, Box, Grid3x3, Gauge, ArrowRight
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
    { code: 'da', name: 'Dansk', flag: '🇩🇰' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <AccordionItem value="language" className="border-b-0">
      <AccordionTrigger className="px-2 text-lg font-semibold text-primary hover:no-underline">
        Sprog / Language
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-2 pt-2 px-2">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={i18n.language === language.code ? "default" : "outline"}
              size="sm"
              onClick={() => i18n.changeLanguage(language.code)}
              className="justify-start gap-2"
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-xs">{language.name}</span>
            </Button>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const useServices = () => {
  const { t } = useTranslation();
  return [
    {
      title: "Lamper & belysning",
      href: "/pages/lamper-belysning",
      description: "Installation og reparation",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=160&h=160&fit=crop",
      badge: null,
    },
    {
      title: "Stikkontakter & Afbrydere",
      href: "/pages/stikkontakter-afbrydere",
      description: "Moderne designer-løsninger",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=160&h=160&fit=crop",
      badge: null,
    },
    {
      title: "Akut Hjælp",
      href: "/pages/akut-hjaelp",
      description: "Døgnet rundt service",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=160&h=160&fit=crop",
      badge: "24/7",
    },
    {
      title: "Fejlfinding",
      href: "/pages/fejlfinding",
      description: "Professionel diagnostik",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=160&h=160&fit=crop",
      badge: null,
    },
    {
      title: "Sikkerhed",
      href: "/pages/sikkerhed",
      description: "El-tjek og eftersyn",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=160&h=160&fit=crop",
      badge: null,
    },
    {
      title: "Smart Home",
      href: "/pages/smart-home",
      description: "Intelligent automation",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=160&h=160&fit=crop",
      badge: null,
    },
    {
      title: "Vedligeholdelse",
      href: "/pages/vedligeholdelse",
      description: "Service og vedligehold",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=160&h=160&fit=crop",
      badge: null,
    },
    {
      title: "Rådgivning",
      href: "/pages/raadgivning",
      description: "Professionel vejledning",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=160&h=160&fit=crop",
      badge: null,
    },
    {
      title: "Specialydelser",
      href: "/pages/specialydelser",
      description: "Avancerede el-services",
      image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=160&h=160&fit=crop",
      badge: null,
    },
  ];
};

const useProducts = () => {
  const { t } = useTranslation();
  return {
    mainCategories: [
      {
        title: "Lamper",
        href: "/collections/lamper",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=160&h=160&fit=crop",
        subcategories: [
          { title: "Loftlamper", href: "/collections/loftlamper" },
          { title: "Væglamper", href: "/collections/vaeglamper" },
          { title: "Spots", href: "/collections/spots" },
          { title: "LED-strips", href: "/collections/led-strips" },
        ]
      },
      {
        title: "Stikkontakter",
        href: "/collections/stikkontakter",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=160&h=160&fit=crop",
        subcategories: [
          { title: "Monteringstype", href: "/collections/stikkontakter-montering" },
          { title: "Funktioner", href: "/collections/stikkontakter-funktioner" },
          { title: "Rammer", href: "/collections/stikkontakter-rammer" },
          { title: "Tangenter", href: "/collections/stikkontakter-tangenter" },
          { title: "Udendørs", href: "/collections/stikkontakter-udendoers" },
        ]
      },
      {
        title: "Tavler & Materialer",
        href: "/collections/tavler-materialer",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=160&h=160&fit=crop",
        subcategories: [
          { title: "El-tavler", href: "/collections/el-tavler" },
          { title: "Gruppesikringer", href: "/collections/gruppesikringer" },
          { title: "Fejlstrømsafbrydere", href: "/collections/fejlstroemsafbrydere" },
          { title: "Kombiafbrydere", href: "/collections/kombiafbrydere" },
        ]
      },
      {
        title: "Kabler & Ledninger",
        href: "/collections/kabler-ledninger",
        image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=160&h=160&fit=crop",
        subcategories: [
          { title: "Lampe ledning", href: "/collections/lampe-ledning" },
          { title: "Installationskabel 1,5mm²", href: "/collections/kabel-15mm" },
          { title: "Installationskabel 2,5mm²", href: "/collections/kabel-25mm" },
          { title: "Installationskabel 4mm²", href: "/collections/kabel-4mm" },
          { title: "Installationskabel 6mm+", href: "/collections/kabel-6mm" },
        ]
      },
    ],
    featuredCategories: [
      {
        title: "Indendørs belysning",
        items: ["Loftlamper", "Væglamper", "Spots", "LED-strips"]
      },
      {
        title: "Udendørs belysning",
        items: ["Udendørs væglamper", "Havelamper", "Solcellelamper", "Udendørs spots"]
      },
      {
        title: "Smart belysning",
        items: ["Smart-lamper", "Smart LED-strips", "Smart pærer"]
      },
      {
        title: "Lyskilder",
        items: ["LED-pærer", "Filamentpærer", "Halogenpærer", "Lysstofrer", "Smart pærer"]
      }
    ]
  };
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
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setActiveMenu(menu);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleMenuLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveMenu(null);
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
      <header className="sticky top-0 z-50 w-full border-b bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/95">
        <div className="container flex h-auto items-center justify-between py-6">
        <Link to="/" className="flex items-center">
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
        
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem
              onMouseEnter={() => handleMenuEnter("services")}
              onMouseLeave={handleMenuLeave}
            >
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                {t('header.services')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="mega-menu-services">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="service-card group"
                      >
                        <div className="relative mb-3">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-20 h-20 rounded-lg object-cover"
                            loading="lazy"
                          />
                          {service.badge && (
                            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-[15px] text-foreground mb-1">
                          {service.title}
                        </h3>
                        <p className="text-[13px] text-muted-foreground line-clamp-1 mb-2">
                          {service.description}
                        </p>
                        <span className="text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Læs mere <span className="text-lg">→</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem
              onMouseEnter={() => handleMenuEnter("products")}
              onMouseLeave={handleMenuLeave}
            >
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                {t('header.products')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="mega-menu-products">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
                    {products.mainCategories.map((category) => (
                      <div key={category.title} className="product-category-card">
                        <Link to={category.href} className="block mb-3">
                          <img
                            src={category.image}
                            alt={category.title}
                            className="w-20 h-20 rounded-lg object-cover mb-3"
                            loading="lazy"
                          />
                          <h3 className="font-semibold text-[15px] text-foreground border-b border-border pb-3">
                            {category.title}
                          </h3>
                        </Link>
                        <ul className="space-y-2">
                          {category.subcategories.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                to={sub.href}
                                className="text-[13px] text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-150 inline-block"
                              >
                                • {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="featured-categories">
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      POPULÆRE BELYSNINGSKATEGORIER
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {products.featuredCategories.map((featured) => (
                        <div key={featured.title}>
                          <h5 className="font-medium text-[14px] text-foreground mb-2">
                            {featured.title}
                          </h5>
                          <ul className="space-y-1.5">
                            {featured.items.map((item) => (
                              <li key={item}>
                                <Link
                                  to={`/collections/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-[13px] text-muted-foreground hover:text-primary transition-colors"
                                >
                                  • {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] bg-background">
              <SheetHeader>
                <SheetTitle>{t('header.menu')}</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)] mt-6">
                <div className="space-y-6 pb-10">
                  <Accordion type="single" collapsible className="w-full">
                    {/* Services */}
                    <AccordionItem value="services" className="border-b-0">
                      <AccordionTrigger className="px-2 text-lg font-semibold text-primary hover:no-underline">
                        {t('header.services')}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {services.map((service) => (
                            <Link
                              key={service.title}
                              to={service.href}
                              onClick={closeMobileMenu}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                            >
                              <div className="relative flex-shrink-0">
                                <img 
                                  src={service.image} 
                                  alt={service.title}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                {service.badge && (
                                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[8px] font-bold px-1 rounded-full">
                                    {service.badge}
                                  </span>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{service.title}</div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Products */}
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className="px-2 text-lg font-semibold text-secondary hover:no-underline">
                        {t('header.products')}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {products.mainCategories.map((category) => (
                            <div key={category.title} className="space-y-2">
                              <Link
                                to={category.href}
                                onClick={closeMobileMenu}
                                className="flex items-start gap-3 p-3 rounded-lg bg-muted hover:bg-accent transition-colors font-semibold"
                              >
                                <img 
                                  src={category.image} 
                                  alt={category.title}
                                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                />
                                <span>{category.title}</span>
                              </Link>
                              <div className="pl-8 space-y-1">
                                {category.subcategories.slice(0, 4).map((sub) => (
                                  <Link
                                    key={sub.href}
                                    to={sub.href}
                                    onClick={closeMobileMenu}
                                    className="block text-sm text-muted-foreground hover:text-primary py-1 transition-colors"
                                  >
                                    • {sub.title}
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
                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      <Link
                        to="/om-os"
                        onClick={closeMobileMenu}
                        className="block p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <span className="font-medium">{t('header.about')}</span>
                      </Link>
                      <Link
                        to="/kontakt"
                        onClick={closeMobileMenu}
                        className="block p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <span className="font-medium">{t('header.contact')}</span>
                      </Link>
                    </div>
                  </div>


                  {/* User Actions */}
                  <div className="border-t pt-4 space-y-2 px-2">
                    {user ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            closeMobileMenu();
                            navigate("/profile");
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          {t('header.myProfile')}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            closeMobileMenu();
                            handleSignOut();
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          {t('header.logout')}
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => {
                          closeMobileMenu();
                          navigate("/auth");
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        {t('header.login')}
                      </Button>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hidden lg:flex relative rounded-full text-white hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:scale-105"
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
              className="hidden lg:flex relative rounded-full text-white hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:scale-105"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
          
          <CartDrawer />
        </div>
      </div>
      </header>
    </>
  );
};
