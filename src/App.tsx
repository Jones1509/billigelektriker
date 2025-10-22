import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationGuard } from "./components/TranslationGuard";
import { PasswordGate } from "./components/PasswordGate";
import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TranslationAdmin from "./pages/TranslationAdmin";
import TranslationCheck from "./pages/TranslationCheck";
import NotFound from "./pages/NotFound";
import "./i18n/config";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TranslationGuard />
      <PasswordGate>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/om-os" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/admin/translations" element={<TranslationAdmin />} />
            <Route path="/admin/translation-check" element={<TranslationCheck />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PasswordGate>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
