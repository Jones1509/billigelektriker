import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Gift } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Tak for tilmeldingen!", {
        description: "Du modtager snart din rabatkode på email.",
        position: "top-center"
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-blue-600 to-primary text-primary-foreground relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.15),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 shadow-xl">
            <Gift className="h-10 w-10" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Få <span className="text-secondary">10% rabat</span> på din første ordre
            </h2>
            
            <p className="text-xl text-primary-foreground/95 leading-relaxed">
              Tilmeld dig nyhedsbrevet og få rabatkoden direkte i din indbakke. Plus eksklusive tilbud og tips til dit smarte hjem.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Din e-mail adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-foreground h-14 px-6 text-lg shadow-lg"
            />
            <Button type="submit" variant="secondary" size="lg" className="h-14 px-8 whitespace-nowrap shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold">
              Få rabatkode
            </Button>
          </form>

          <div className="flex flex-wrap gap-6 justify-center pt-4 text-sm text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Ingen spam</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Max 1 mail om måneden</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Afmeld når som helst</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
