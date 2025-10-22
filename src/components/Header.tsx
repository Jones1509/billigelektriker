import { useState, useEffect } from "react";
import { Zap, Phone, Wrench, Lightbulb, Plug, Cable, Box, Home, Zap as ZapIcon, User, LogOut } from "lucide-react";
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
    icon: Plug,
  },
  {
    title: "Fejlfinding",
    href: "/services/fejlfinding",
    description: "Hurtig og effektiv fejlfinding på alle typer el-problemer",
    icon: Wrench,
  },
  {
    title: "Smart Home Installation",
    href: "/services/smart-home",
    description: "Installation og opsætning af smart belysning og styringssystemer",
    icon: Home,
  },
  {
    title: "Elbil Ladestandere",
    href: "/services/elbil",
    description: "Installation af ladestandere til elbiler i privat og erhverv",
    icon: ZapIcon,
  },
  {
    title: "Tavlearbejde",
    href: "/services/tavle",
    description: "Udskiftning og opgradering af eltavler efter gældende regler",
    icon: Box,
  },
  {
    title: "Erhvervsservice",
    href: "/services/erhverv",
    description: "El-service til butikker, kontorer og produktionsfaciliteter",
    icon: Wrench,
  },
];

const products = [
  {
    title: "Stikkontakter & Kontakter",
    href: "/products/stikkontakter",
    description: "Moderne stikkontakter og afbrydere i mange designs",
    icon: Plug,
  },
  {
    title: "Lamper & Belysning",
    href: "/products/lamper",
    description: "Indendørs lamper, spots og LED-belysning",
    icon: Lightbulb,
  },
  {
    title: "Smart Home Produkter",
    href: "/products/smart-home",
    description: "Smart belysning, sensorer og styringssystemer",
    icon: Home,
  },
  {
    title: "Udendørs Belysning",
    href: "/products/udendors",
    description: "Vejrbestandig belysning til haven og facade",
    icon: Lightbulb,
  },
  {
    title: "Tavler & Komponenter",
    href: "/products/tavler",
    description: "Eltavler, automatsikringer og tavlekomponenter",
    icon: Box,
  },
  {
    title: "Kabler & Ledninger",
    href: "/products/kabler",
    description: "Elkabler, installationsledninger og tilbehør",
    icon: Cable,
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-bold text-2xl">
          <img src={logo} alt="Billig Elektriker" className="h-12 w-auto" />
        </Link>
        
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base">Serviceydelser</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-6 md:grid-cols-2">
                  {services.map((service) => (
                    <li key={service.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={service.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-md bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                              <service.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium leading-none mb-1">
                                {service.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base">Produkter</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-6 md:grid-cols-2">
                  {products.map((product) => (
                    <li key={product.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={product.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-md bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                              <product.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium leading-none mb-1">
                                {product.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Ring til os</span>
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/auth")}>
              <User className="h-5 w-5" />
            </Button>
          )}
          
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
