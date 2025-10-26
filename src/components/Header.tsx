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
  return [
    [
      { title: "Lamper & belysning", href: "/pages/lamper-belysning" },
      { title: "Stikkontakter & Afbrydere", href: "/pages/stikkontakter-afbrydere" },
      { title: "Akut Hjælp", href: "/pages/akut-hjaelp", badge: "24/7" },
    ],
    [
      { title: "Fejlfinding", href: "/pages/fejlfinding" },
      { title: "Sikkerhed", href: "/pages/sikkerhed" },
      { title: "Smart Home & Energioptimering", href: "/pages/smart-home" },
    ],
    [
      { title: "Vedligeholdelse & Serviceaftaler", href: "/pages/vedligeholdelse" },
      { title: "Rådgivning & Indkøb", href: "/pages/raadgivning" },
      { title: "Specialydelser & Udlejning", href: "/pages/specialydelser" },
    ],
  ];
};

const useProducts = () => {
  return [
    {
      title: "LAMPER & SPOTS",
      links: [
        { title: "Loftlamper & pendler", href: "/collections/loftlamper" },
        { title: "Væglamper", href: "/collections/vaeglamper" },
        { title: "Bordlamper", href: "/collections/bordlamper" },
        { title: "Gulvlamper", href: "/collections/gulvlamper" },
        { title: "Spots", href: "/collections/spots" },
        { title: "Spejllamper", href: "/collections/spejllamper" },
        { title: "Lysarmaturer", href: "/collections/lysarmaturer" },
        { title: "Dekorativ belysning", href: "/collections/dekorativ" },
        { title: "Havelamper", href: "/collections/havelamper" },
        { title: "Julebelysning", href: "/collections/julebelysning" },
      ]
    },
    {
      title: "LYSKILDER",
      links: [
        { title: "LED-pærer", href: "/collections/led-paerer" },
        { title: "Halogenpærer", href: "/collections/halogen" },
        { title: "Glødepærer", href: "/collections/gloede" },
        { title: "Lysstofrer", href: "/collections/lysstofrer" },
        { title: "Kompaktrør", href: "/collections/kompaktroer" },
      ]
    },
    {
      title: "LAMPETILBEHØR",
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
      links: [
        { title: "Stikkontakter", href: "/collections/stikkontakter" },
        { title: "Afbrydere", href: "/collections/afbrydere" },
        { title: "Lysdæmpere", href: "/collections/lysdaempere" },
        { title: "Bevægelsessensorer", href: "/collections/bevaegelsessensorer" },
        { title: "Rammer", href: "/collections/rammer" },
        { title: "Dåser & underlag", href: "/collections/daaser" },
        { title: "Tangenter & afdækninger", href: "/collections/tangenter" },
        { title: "Lampeudtag", href: "/collections/lampeudtag" },
        { title: "Antenne- & datamateriel", href: "/collections/antenne-data" },
        { title: "Løs el", href: "/collections/loes-el" },
        { title: "Ladestandere", href: "/collections/ladestandere" },
      ]
    },
    {
      title: "TAVLEMATERIEL",
      links: [
        { title: "Tavlekomponenter", href: "/collections/tavlekomponenter" },
        { title: "Målertavler", href: "/collections/maalertavler" },
        { title: "Gruppetavler", href: "/collections/gruppetavler" },
        { title: "Tilbehør", href: "/collections/tavle-tilbehoer" },
      ]
    },
    {
      title: "KABEL & LEDNING",
      links: [
        { title: "Installations- & flexrør", href: "/collections/flexroer" },
        { title: "Kabler & ledninger", href: "/collections/kabler" },
        { title: "Kabeltromler", href: "/collections/kabeltromler" },
        { title: "Stikdåser & forlængerledninger", href: "/collections/stikdaaser" },
        { title: "Kabelkanaler & befæstigelse", href: "/collections/kabelkanaler" },
        { title: "Samlemuffer & -dåser", href: "/collections/samlemuffer" },
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
      <header className="sticky top-0 z-50 w-full bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/95">
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
                <div className="mega-menu-container">
                  <div className="mega-menu-inner">
                    <div className="mega-menu-grid-3">
                      {services.map((column, idx) => (
                        <div key={idx} className="menu-column">
                          <ul>
                            {column.map((service) => (
                              <li key={service.href}>
                                <Link to={service.href} className="menu-link">
                                  {service.title}
                                  {service.badge && (
                                    <span className="akut-badge">
                                      {service.badge}
                                    </span>
                                  )}
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

            <NavigationMenuItem
              onMouseEnter={() => handleMenuEnter("products")}
              onMouseLeave={handleMenuLeave}
            >
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                {t('header.products')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="mega-menu-container">
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
                          {services.flat().map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors"
                            >
                              <span className="font-medium text-sm">{service.title}</span>
                              {service.badge && (
                                <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                                  {service.badge}
                                </span>
                              )}
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
                          {products.map((category) => (
                            <div key={category.title} className="space-y-2">
                              <div className="font-semibold text-sm px-3 py-2 bg-muted rounded-lg">
                                {category.title}
                              </div>
                              <div className="pl-4 space-y-1">
                                {category.links.slice(0, 5).map((link) => (
                                  <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={closeMobileMenu}
                                    className="block text-sm text-muted-foreground hover:text-primary py-1 transition-colors"
                                  >
                                    • {link.title}
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
