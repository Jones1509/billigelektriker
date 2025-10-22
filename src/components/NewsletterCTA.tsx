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
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex p-4 bg-white/10 rounded-full mb-4">
            <Gift className="h-8 w-8" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Få 10% rabat på din første ordre
          </h2>
          
          <p className="text-lg text-primary-foreground/90">
            Tilmeld dig nyhedsbrevet og få rabatkoden direkte i din indbakke.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Din e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-foreground"
            />
            <Button type="submit" variant="secondary" size="lg" className="whitespace-nowrap">
              Få rabatkode
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/70 mt-4">
            Vi sender højst én mail om måneden. Afmeld når som helst.
          </p>
        </div>
      </div>
    </section>
  );
};
