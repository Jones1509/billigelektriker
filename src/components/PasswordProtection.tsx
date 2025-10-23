import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import logo from "@/assets/logo.avif";

const CORRECT_PASSWORD = "billigelektriker2025";

export const PasswordProtection = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("🔒 Password Protection Active - Blocking all content");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("Forkert adgangskode - prøv igen");
      setPassword("");
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-blue-600 to-secondary p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
          <img 
            src={logo} 
            alt="Billig Elektriker Logo" 
            className="w-[120px] h-auto mb-4"
          />
          
          <h1 className="text-4xl font-bold text-white text-center mb-2">
            Adgang Krævet
          </h1>
          
          <div className="w-full space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Indtast adgangskode"
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 text-lg"
                autoFocus
              />
            </div>
            
            {error && (
              <p className="text-red-200 text-center font-medium">
                {error}
              </p>
            )}
            
            <Button 
              type="submit"
              className="w-full h-12 bg-white text-primary hover:bg-white/90 font-bold text-lg"
            >
              Lås Op
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
