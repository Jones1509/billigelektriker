import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Zap } from "lucide-react";
import { toast } from "sonner";

const LAUNCH_PASSWORD = "elektriker2025"; // Skift dette password

export const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already unlocked in this session
    const unlocked = sessionStorage.getItem("site_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (password === LAUNCH_PASSWORD) {
        sessionStorage.setItem("site_unlocked", "true");
        setIsUnlocked(true);
        toast.success("Adgang godkendt!");
      } else {
        toast.error("Forkert adgangskode");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border shadow-2xl rounded-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg">
              <Zap className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2">
            Billig Elektriker
          </h1>
          
          <p className="text-center text-muted-foreground mb-8">
            Siden er under udvikling. Indtast adgangskode for at fortsætte.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Adgangskode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={isLoading}
                autoFocus
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !password}
            >
              {isLoading ? "Tjekker..." : "Lås op"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Denne side er midlertidigt beskyttet og vil snart være offentligt tilgængelig.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
