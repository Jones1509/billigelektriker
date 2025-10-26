import { useState, useEffect } from "react";
import { 
  Phone, User, LogOut, Zap, Search, Smartphone, Car, 
  Server, Briefcase, Power, Lamp, Wifi, Moon, 
  Boxes, Cable, Shield, Menu, Info, Mail
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
import logo from "@/assets/logo.avif";
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
      title: t('services.installation.title'),
      href: "/services/installation",
      description: t('services.installation.description'),
      icon: Zap,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: t('services.troubleshooting.title'),
      href: "/services/fejlfinding",
      description: t('services.troubleshooting.description'),
      icon: Search,
      color: "from-green-500 to-green-600",
    },
    {
      title: t('services.smartHome.title'),
      href: "/services/smart-home",
      description: t('services.smartHome.description'),
      icon: Smartphone,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: t('services.evCharging.title'),
      href: "/services/elbil",
      description: t('services.evCharging.description'),
      icon: Car,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: t('services.panelWork.title'),
      href: "/services/tavle",
      description: t('services.panelWork.description'),
      icon: Server,
      color: "from-orange-500 to-red-600",
    },
    {
      title: t('services.business.title'),
      href: "/services/erhverv",
      description: t('services.business.description'),
      icon: Briefcase,
      color: "from-gray-500 to-gray-600",
    },
  ];
};

const useProducts = () => {
  const { t } = useTranslation();
  return [
    {
      title: t('products.outlets.title'),
      href: "/products/stikkontakter",
      description: t('products.outlets.description'),
      icon: Power,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: t('products.lamps.title'),
      href: "/products/lamper",
      description: t('products.lamps.description'),
      icon: Lamp,
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: t('products.smartHome.title'),
      href: "/products/smart-home",
      description: t('products.smartHome.description'),
      icon: Wifi,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: t('products.outdoor.title'),
      href: "/products/udendors",
      description: t('products.outdoor.description'),
      icon: Moon,
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: t('products.panels.title'),
      href: "/products/tavler",
      description: t('products.panels.description'),
      icon: Boxes,
      color: "from-gray-500 to-gray-600",
    },
    {
      title: t('products.cables.title'),
      href: "/products/kabler",
      description: t('products.cables.description'),
      icon: Cable,
      color: "from-green-500 to-emerald-600",
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
        <div className="container flex h-auto items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Billig Elektriker" 
            className="h-24 w-auto"
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
                <div className="w-[700px] p-6 bg-gradient-to-br from-background via-background to-blue-50/50 dark:to-blue-950/20">
                  <ul className="grid gap-3 md:grid-cols-2">
                    {services.map((service) => (
                      <li key={service.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={service.href}
                            className="group relative block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white dark:bg-gray-900 border border-transparent hover:border-primary/20 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                                 style={{ backgroundImage: `linear-gradient(135deg, ${service.color.split(' ')[1]} 0%, ${service.color.split(' ')[2]} 100%)`, opacity: 0.05 }} />
                            
                            <div className="relative flex items-start gap-4">
                              <div className={`rounded-lg bg-gradient-to-br ${service.color} p-3 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                <service.icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="text-base font-semibold leading-none mb-2 group-hover:text-primary transition-colors">
                                  {service.title}
                                </div>
                                <p className="text-sm leading-snug text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t flex items-center justify-center">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{t('header.tagline')}</span>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                {t('header.products')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[700px] p-6 bg-gradient-to-br from-background via-background to-green-50/50 dark:to-green-950/20">
                  <ul className="grid gap-3 md:grid-cols-2">
                    {products.map((product) => (
                      <li key={product.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={product.href}
                            className="group relative block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white dark:bg-gray-900 border border-transparent hover:border-secondary/20 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                                 style={{ backgroundImage: `linear-gradient(135deg, ${product.color.split(' ')[1]} 0%, ${product.color.split(' ')[2]} 100%)`, opacity: 0.05 }} />
                            
                            <div className="relative flex items-start gap-4">
                              <div className={`rounded-lg bg-gradient-to-br ${product.color} p-3 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                <product.icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="text-base font-semibold leading-none mb-2 group-hover:text-secondary transition-colors">
                                  {product.title}
                                </div>
                                <p className="text-sm leading-snug text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                  {product.description}
                                </p>
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
                              <div className={`rounded-lg bg-gradient-to-br ${service.color} p-2 shadow-md flex-shrink-0`}>
                                <service.icon className="h-4 w-4 text-white" />
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
                        <div className="space-y-2 pt-2">
                          {products.map((product) => (
                            <Link
                              key={product.title}
                              to={product.href}
                              onClick={closeMobileMenu}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                            >
                              <div className={`rounded-lg bg-gradient-to-br ${product.color} p-2 shadow-md flex-shrink-0`}>
                                <product.icon className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-sm">{product.title}</div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                              </div>
                            </Link>
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
