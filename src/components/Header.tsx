import { useState, useEffect } from "react";
import { 
  Phone, User, LogOut, Zap, Search, Smartphone, Car, 
  Server, Briefcase, Power, Lamp, Wifi, Moon, 
  Boxes, Cable, Shield, Menu, Info, Mail, Lightbulb, Bell,
  Lock, Settings, Wrench, ShoppingCart, Battery, Plug, Box, Grid3x3, Gauge
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
      description: "Installation og reparation af alle typer belysning",
      icon: Lightbulb,
      badge: null,
    },
    {
      title: "Stikkontakter & Afbrydere",
      href: "/pages/stikkontakter-afbrydere",
      description: "Moderne stikkontakter og designer-afbrydere",
      icon: Plug,
      badge: null,
    },
    {
      title: "Akut Hjælp",
      href: "/pages/akut-hjaelp",
      description: "Akut el-hjælp døgnet rundt",
      icon: Bell,
      badge: "24/7",
    },
    {
      title: "Fejlfinding",
      href: "/pages/fejlfinding",
      description: "Professionel fejlfinding af el-problemer",
      icon: Search,
      badge: null,
    },
    {
      title: "Sikkerhed",
      href: "/pages/sikkerhed",
      description: "El-tjek, sikring og eftersyn",
      icon: Shield,
      badge: null,
    },
    {
      title: "Smart Home & Energioptimering",
      href: "/pages/smart-home",
      description: "Intelligent hjem-automation",
      icon: Smartphone,
      badge: null,
    },
    {
      title: "Vedligeholdelse & Serviceaftaler",
      href: "/pages/vedligeholdelse",
      description: "Regelmæssig service og vedligehold",
      icon: Settings,
      badge: null,
    },
    {
      title: "Rådgivning & Indkøb",
      href: "/pages/raadgivning",
      description: "Professionel rådgivning om el-løsninger",
      icon: Info,
      badge: null,
    },
    {
      title: "Specialydelser & Udlejning",
      href: "/pages/specialydelser",
      description: "Specialiserede el-services",
      icon: Wrench,
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
        icon: Lamp,
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
        icon: Plug,
        subcategories: [
          { title: "Forfradåse", href: "/collections/stikkontakter-forfradaase", category: "Monteringstype" },
          { title: "Indmuringsdåse", href: "/collections/stikkontakter-indmuring", category: "Monteringstype" },
          { title: "Vægmonteret", href: "/collections/stikkontakter-vaeg", category: "Monteringstype" },
          { title: "Stikkontakt", href: "/collections/funktioner-stikkontakt", category: "Funktioner" },
          { title: "Afbryder", href: "/collections/funktioner-afbryder", category: "Funktioner" },
          { title: "Lysdæmper", href: "/collections/funktioner-lysdaemper", category: "Funktioner" },
          { title: "USB-oplader", href: "/collections/funktioner-usb", category: "Funktioner" },
          { title: "Softline", href: "/collections/rammer-softline", category: "Rammer" },
          { title: "Baseline", href: "/collections/rammer-baseline", category: "Rammer" },
          { title: "Pureline", href: "/collections/rammer-pureline", category: "Rammer" },
          { title: "Slimline", href: "/collections/rammer-slimline", category: "Rammer" },
          { title: "Design", href: "/collections/rammer-design", category: "Rammer" },
          { title: "Udendørs underlag", href: "/collections/udendors-underlag", category: "Udendørs" },
          { title: "Udendørs stikkontakt", href: "/collections/udendors-stikkontakt", category: "Udendørs" },
        ]
      },
      {
        title: "Tavler & Materialer",
        href: "/collections/tavler-materialer",
        icon: Box,
        subcategories: [
          { title: "UG 6", href: "/collections/tavler-ug6", category: "El-tavler" },
          { title: "UG 12", href: "/collections/tavler-ug12", category: "El-tavler" },
          { title: "UG 18", href: "/collections/tavler-ug18", category: "El-tavler" },
          { title: "UG 20", href: "/collections/tavler-ug20", category: "El-tavler" },
          { title: "10A - 20A", href: "/collections/2polet-10-20a", category: "2-polet grupper" },
          { title: "10A - 32A", href: "/collections/4polet-10-32a", category: "4-polet grupper" },
          { title: "RCD type A/B/S", href: "/collections/fejlstroms", category: "Fejlstrøms-afbrydere" },
          { title: "2 polet", href: "/collections/kombi-2polet", category: "Kombiafbrydere" },
          { title: "4 polet", href: "/collections/kombi-4polet", category: "Kombiafbrydere" },
        ]
      },
      {
        title: "Kabler & Ledninger",
        href: "/collections/kabler-ledninger",
        icon: Cable,
        subcategories: [
          { title: "0,75 mm²", href: "/collections/lampeledning-075", category: "Lampe ledning" },
          { title: "1,5 mm²", href: "/collections/installations-15", category: "Installations kabel" },
          { title: "2,5 mm²", href: "/collections/installations-25", category: "Installations kabel" },
          { title: "4 mm²", href: "/collections/installations-4", category: "Installations kabel" },
          { title: "6 mm²", href: "/collections/installations-6", category: "Installations kabel" },
          { title: "10 mm²", href: "/collections/installations-10", category: "Installations kabel" },
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
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                {t('header.services')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[1200px] p-10 bg-white dark:bg-gray-950">
                  <ul className="grid gap-4 md:grid-cols-3">
                    {services.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={service.href}
                            className="group relative block select-none rounded-xl p-6 leading-none no-underline outline-none transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 hover:border-primary"
                          >
                            <div className="flex flex-col items-start gap-4">
                              <div className="relative">
                                <div className="rounded-lg bg-primary/10 p-3">
                                  <service.icon className="h-12 w-12 text-primary" />
                                </div>
                                {service.badge && (
                                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {service.badge}
                                  </span>
                                )}
                              </div>
                              <div className="space-y-2">
                                <div className="text-base font-bold leading-tight text-slate-900 dark:text-slate-100">
                                  {service.title}
                                </div>
                                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                  {service.description}
                                </p>
                                <div className="flex items-center text-sm text-primary font-medium pt-1 group-hover:gap-2 transition-all">
                                  <span>Læs mere</span>
                                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                {t('header.products')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[1400px] bg-white dark:bg-gray-950">
                  {/* Main Categories */}
                  <div className="p-10 grid gap-6 md:grid-cols-4">
                    {products.mainCategories.map((category) => (
                      <div key={category.title} className="group">
                        <Link
                          to={category.href}
                          className="block rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="space-y-4">
                            <div className="w-[120px] h-[120px] rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                              <category.icon className="h-16 w-16 text-primary" />
                            </div>
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
                              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
                                {category.title}
                              </h3>
                            </div>
                          </div>
                        </Link>
                        
                        {/* Subcategories */}
                        <div className="mt-3 space-y-1.5 pl-2">
                          {category.subcategories.map((sub, idx) => (
                            <div key={sub.href}>
                              {/* Show category header for grouped items */}
                              {'category' in sub && (
                                idx === 0 || 
                                !('category' in category.subcategories[idx - 1]) ||
                                (category.subcategories[idx - 1] as any).category !== (sub as any).category
                              ) && (
                                <div className="text-xs font-semibold text-slate-500 mt-3 mb-1">
                                  {(sub as any).category}
                                </div>
                              )}
                              <Link
                                to={sub.href}
                                className="block text-sm text-slate-600 dark:text-slate-400 hover:text-primary hover:pl-1 transition-all"
                              >
                                • {sub.title}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Featured Categories */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 p-8">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 text-center">
                      POPULÆRE BELYSNINGSKATEGORIER
                    </h4>
                    <div className="grid gap-6 md:grid-cols-4">
                      {products.featuredCategories.map((featured) => (
                        <div key={featured.title}>
                          <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-sm">
                            {featured.title}
                          </h5>
                          <ul className="space-y-1.5">
                            {featured.items.map((item) => (
                              <li key={item} className="text-sm text-slate-600 dark:text-slate-400">
                                • {item}
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
                              <div className="rounded-lg bg-primary/10 p-2 flex-shrink-0 relative">
                                <service.icon className="h-4 w-4 text-primary" />
                                {service.badge && (
                                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full">
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
                                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-accent transition-colors font-semibold"
                              >
                                <category.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
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
