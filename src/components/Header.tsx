import { Store } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Store className="h-6 w-6" />
          <span>Min Butik</span>
        </Link>
        
        <CartDrawer />
      </div>
    </header>
  );
};
