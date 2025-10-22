import { Zap, Phone } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-bold text-2xl">
          <Zap className="h-8 w-8 text-primary" />
          <span className="text-foreground">Billig Elektriker</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Ring til os</span>
          </Button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
