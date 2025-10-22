import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";
import { toast } from "sonner";

const LAUNCH_CODE = "Zack2410";
const ACCESS_KEY = "site_access_granted";

export const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [code, setCode] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user already has access
    const access = localStorage.getItem(ACCESS_KEY);
    if (access === "true") {
      setHasAccess(true);
    }
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === LAUNCH_CODE) {
      localStorage.setItem(ACCESS_KEY, "true");
      setHasAccess(true);
      toast.success("Adgang godkendt!");
    } else {
      toast.error("Forkert kode. Prøv igen.");
      setCode("");
    }
  };

  // Show nothing while checking
  if (isChecking) {
    return null;
  }

  // Show password gate if no access
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl border border-border/50 p-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg">
                <Zap className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2">Billig Elektriker</h1>
            <p className="text-muted-foreground text-center mb-8">
              Siden er under opbygning. Indtast adgangskode.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Indtast adgangskode"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center text-lg"
                  autoFocus
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                size="lg"
              >
                Få adgang
              </Button>
            </form>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Kontakt administratoren for adgang
          </p>
        </div>
      </div>
    );
  }

  // Show app if access granted
  return <>{children}</>;
};
