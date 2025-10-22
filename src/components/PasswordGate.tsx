import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Lock } from "lucide-react";
import { toast } from "sonner";

const PASSWORD = "Zack2410";
const LAUNCHED_KEY = "site_launched";
const SESSION_ACCESS_KEY = "site_access";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [shake, setShake] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminInput, setAdminInput] = useState("");

  // Calculate launch date (45 days from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 45);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check access on mount
  useEffect(() => {
    const launched = localStorage.getItem(LAUNCHED_KEY) === "true";
    const sessionAccess = sessionStorage.getItem(SESSION_ACCESS_KEY) === "granted";

    if (launched) {
      setIsLaunched(true);
      setHasAccess(true);
    } else if (sessionAccess) {
      setHasAccess(true);
    }
    
    setIsChecking(false);
  }, []);

  // Admin panel keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === PASSWORD) {
      sessionStorage.setItem(SESSION_ACCESS_KEY, "granted");
      setHasAccess(true);
      toast.success("✅ Adgang godkendt!");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("❌ Forkert adgangskode");
      setPassword("");
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminInput === "Launch") {
      localStorage.setItem(LAUNCHED_KEY, "true");
      setIsLaunched(true);
      setHasAccess(true);
      setShowAdmin(false);
      alert("🚀 Hjemmesiden er nu live!");
      window.location.reload();
    } else {
      toast.error("Forkert kommando");
    }
  };

  if (isChecking) {
    return null;
  }

  if (!hasAccess) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
          {/* Animated background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>

          <div className="relative z-10 w-full max-w-2xl animate-fade-in">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-12">
              <div className="p-6 bg-gradient-to-br from-primary to-blue-600 rounded-3xl shadow-2xl mb-6 animate-pulse">
                <Zap className="h-16 w-16 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Billig Elektriker</h1>
              <p className="text-blue-200 text-lg">Coming Soon</p>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 mb-12">
              {[
                { value: timeLeft.days, label: "Dage" },
                { value: timeLeft.hours, label: "Timer" },
                { value: timeLeft.minutes, label: "Minutter" },
                { value: timeLeft.seconds, label: "Sekunder" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-blue-200 text-sm uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <p className="text-white/90 text-center text-lg leading-relaxed">
                Vi er ved at forberede noget helt særligt. Billig Elektriker er din nye partner for 
                professionel el-service til fair priser – med certificerede elektrikere, hurtig respons 
                og garanteret kvalitet.
              </p>
            </div>

            {/* Password Box */}
            <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 ${shake ? "animate-shake" : ""}`}>
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Har du adgangskode?
              </h3>
              <p className="text-blue-200 text-center mb-6">
                Indtast din kode for at få adgang til hjemmesiden
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Indtast adgangskode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-center text-lg h-14 backdrop-blur-sm"
                  autoFocus
                />
                
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white border-0"
                  size="lg"
                >
                  Få adgang
                </Button>
              </form>
            </div>

            <p className="text-center text-white/60 text-sm mt-8">
              Kontakt administratoren for at få adgang
            </p>
          </div>
        </div>

        {/* Admin Panel */}
        {showAdmin && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Admin Launch Panel</h2>
              <p className="text-muted-foreground mb-6">
                Indtast "Launch" for at gøre siden offentlig
              </p>
              
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder='Skriv "Launch"'
                  value={adminInput}
                  onChange={(e) => setAdminInput(e.target.value)}
                  className="text-lg"
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Launch Site
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAdmin(false)}
                  >
                    Annuller
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};
