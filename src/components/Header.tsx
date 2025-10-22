import { useState, useEffect } from "react";
import { 
  Phone, User, LogOut, Zap, Search, Smartphone, Car, 
  Server, Briefcase, Power, Lamp, Wifi, Moon, 
  Boxes, Cable, Sparkles, TrendingUp, Shield, Award
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
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.avif";

const services = [
  {
    title: "El-installation",
    href: "/services/installation",
    description: "Professionel installation af stikkontakter, afbrydere og elinstallationer",
    icon: Zap,
    popular: true,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Fejlfinding",
    href: "/services/fejlfinding",
    description: "Hurtig og effektiv fejlfinding på alle typer el-problemer",
    icon: Search,
    popular: false,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Smart Home Installation",
    href: "/services/smart-home",
    description: "Installation og opsætning af smart belysning og styringssystemer",
    icon: Smartphone,
    popular: true,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Elbil Ladestandere",
    href: "/services/elbil",
    description: "Installation af ladestandere til elbiler i privat og erhverv",
    icon: Car,
    popular: true,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Tavlearbejde",
    href: "/services/tavle",
    description: "Udskiftning og opgradering af eltavler efter gældende regler",
    icon: Server,
    popular: false,
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Erhvervsservice",
    href: "/services/erhverv",
    description: "El-service til butikker, kontorer og produktionsfaciliteter",
    icon: Briefcase,
    popular: false,
    color: "from-gray-500 to-gray-600",
  },
];

const products = [
  {
    title: "Stikkontakter & Kontakter",
    href: "/products/stikkontakter",
    description: "Moderne stikkontakter og afbrydere i mange designs",
    icon: Power,
    bestseller: true,
    discount: "15%",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Lamper & Belysning",
    href: "/products/lamper",
    description: "Indendørs lamper, spots og LED-belysning",
    icon: Lamp,
    bestseller: true,
    discount: null,
    color: "from-yellow-500 to-orange-600",
  },
  {
    title: "Smart Home Produkter",
    href: "/products/smart-home",
    description: "Smart belysning, sensorer og styringssystemer",
    icon: Wifi,
    bestseller: true,
    discount: "20%",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Udendørs Belysning",
    href: "/products/udendors",
    description: "Vejrbestandig belysning til haven og facade",
    icon: Moon,
    bestseller: false,
    discount: null,
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "Tavler & Komponenter",
    href: "/products/tavler",
    description: "Eltavler, automatsikringer og tavlekomponenter",
    icon: Boxes,
    bestseller: false,
    discount: null,
    color: "from-gray-500 to-gray-600",
  },
  {
    title: "Kabler & Ledninger",
    href: "/products/kabler",
    description: "Elkabler, installationsledninger og tilbehør",
    icon: Cable,
    bestseller: false,
    discount: "10%",
    color: "from-green-500 to-emerald-600",
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

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
    toast.success("Du er nu logget ud");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary/95">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Billig Elektriker" 
            className="h-14 w-auto"
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
                Serviceydelser
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[700px] p-6 bg-gradient-to-br from-background via-background to-blue-50/50 dark:to-blue-950/20">
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-medium">Vores mest populære services</span>
                  </div>
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
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="text-base font-semibold leading-none group-hover:text-primary transition-colors">
                                    {service.title}
                                  </div>
                                  {service.popular && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-white text-xs font-medium">
                                      <TrendingUp className="h-3 w-3" />
                                      Populær
                                    </span>
                                  )}
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
                  <div className="mt-6 pt-6 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Autoriseret elektriker • Fri parkering • 2 års garanti</span>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base text-white hover:text-white/90 backdrop-blur-sm hover:bg-white/5 transition-all duration-300">
                Produkter
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[700px] p-6 bg-gradient-to-br from-background via-background to-green-50/50 dark:to-green-950/20">
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4 text-secondary" />
                    <span className="font-medium">Bestsellers med de bedste tilbud</span>
                  </div>
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
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="text-base font-semibold leading-none group-hover:text-secondary transition-colors">
                                    {product.title}
                                  </div>
                                  {product.bestseller && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium shadow-md">
                                      <Sparkles className="h-3 w-3" />
                                      Bestseller
                                    </span>
                                  )}
                                  {product.discount && (
                                    <span className="px-2 py-0.5 rounded-full bg-accent text-white text-xs font-bold">
                                      -{product.discount}
                                    </span>
                                  )}
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
                  <div className="mt-6 pt-6 border-t">
                    <Button className="w-full bg-gradient-to-r from-secondary to-green-600 hover:from-secondary/90 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Se alle produkter og tilbud
                    </Button>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex items-center gap-2 text-white hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
          >
            <Phone className="h-4 w-4" />
            <span>Ring til os</span>
          </Button>
          
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
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel>Min konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log ud</span>
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
    </header>
  );
};
