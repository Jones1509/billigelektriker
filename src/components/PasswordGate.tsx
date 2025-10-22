import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Lock, Key, Settings } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo-symbol.png";

const DEFAULT_PASSWORD = "Zack2410";
const LAUNCHED_KEY = "site_launched";
const SESSION_ACCESS_KEY = "site_access";
const PASSWORD_KEY = "site_password";

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
  const [showPasswordAdmin, setShowPasswordAdmin] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

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

  // Get current password
  useEffect(() => {
    const storedPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    setCurrentPassword(storedPassword);
  }, []);

  // Admin panel keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        e.preventDefault();
        setShowAdmin(true);
      }
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setShowPasswordAdmin(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const storedPassword = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    
    if (password === storedPassword) {
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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 4) {
      toast.error("Adgangskoden skal være mindst 4 tegn");
      return;
    }
    
    localStorage.setItem(PASSWORD_KEY, newPassword);
    setCurrentPassword(newPassword);
    alert(`✅ Ny adgangskode gemt: ${newPassword}`);
    setNewPassword("");
    setShowPasswordAdmin(false);
    toast.success("Adgangskode opdateret!");
  };

  const resetPassword = () => {
    localStorage.removeItem(PASSWORD_KEY);
    setCurrentPassword(DEFAULT_PASSWORD);
    alert(`🔄 Password nulstillet til: ${DEFAULT_PASSWORD}`);
    toast.success("Password nulstillet!");
  };

  if (isChecking) {
    return null;
  }

  if (!hasAccess) {
    return (
      <>
        <div className="coming-soon-page electric-gradient">
          {/* Electric grid overlay */}
          <div className="electric-grid"></div>
          
          {/* Animated radial glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          </div>

          <div className="coming-soon-container">
            {/* Logo Section */}
            <div className="logo-section">
              <div className="logo-wrapper">
                <img src={logo} alt="Billig Elektriker Logo" className="logo-image" />
              </div>
              <h1 className="company-name">Billig Elektriker</h1>
              <p className="coming-soon-subtitle">Coming Soon</p>
            </div>

            {/* Countdown Timer */}
            <div className="countdown-timer">
              {[
                { value: timeLeft.days, label: "Dage" },
                { value: timeLeft.hours, label: "Timer" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Sek" },
              ].map((item, index) => (
                <div key={index} className="time-unit">
                  <div className="time-number">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="time-label">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="description-section">
              <div className="description-content">
                <p className="font-semibold">
                  Vi er Billig Elektriker – dit nye valg for professionel el-service i København og omegn.
                </p>
                <p>
                  Vores mission er simpel: At levere førsteklasses el-arbejde til ærlige priser, uden at gå på kompromis med kvaliteten. Vi er et ungt, dynamisk team af certificerede elektrikere med passion for faget.
                </p>
                <p>
                  Fra den mindste fejlfinding til store installationsprojekter – vi løser dine problemer hurtigt, professionelt og til en pris der giver mening.
                </p>
                <p className="font-semibold highlight">
                  Snart kan du opleve forskellen selv. Vi glæder os til at servicere dig!
                </p>
              </div>
            </div>

            {/* Password Box */}
            <div className={`access-card ${shake ? "animate-shake" : ""}`}>
              <h3 className="access-title">
                Har du adgangskode?
              </h3>
              <p className="access-subtitle">
                Indtast din kode for at få adgang
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <Input
                  type="password"
                  placeholder="Indtast adgangskode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                  autoFocus
                />
                
                <Button 
                  type="submit" 
                  className="access-button"
                  size="lg"
                >
                  Få adgang
                </Button>
              </form>
            </div>

            <p className="text-center text-white/80 text-xs md:text-sm" style={{ marginTop: 'clamp(8px, 1.5vh, 12px)' }}>
              Kontakt administratoren for at få adgang
            </p>
          </div>
        </div>

        {/* Launch Admin Panel */}
        {showAdmin && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-scale-in">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <h2 className="text-xl md:text-2xl font-bold">Admin Launch Panel</h2>
              </div>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                Indtast "Launch" for at gøre siden offentlig for alle
              </p>
              
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder='Skriv "Launch"'
                  value={adminInput}
                  onChange={(e) => setAdminInput(e.target.value)}
                  className="text-base md:text-lg"
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    🚀 Launch Site
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowAdmin(false);
                      setAdminInput("");
                    }}
                  >
                    Annuller
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Password Admin Panel */}
        {showPasswordAdmin && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-scale-in">
              <div className="flex items-center gap-3 mb-4">
                <Key className="h-6 w-6 text-primary" />
                <h2 className="text-xl md:text-2xl font-bold">Password Admin</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Nuværende adgangskode:</p>
                  <p className="font-mono font-bold text-lg">
                    {currentPassword.split("").map((_, i) => i < 3 ? currentPassword[i] : "*").join("")}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Dage til launch:</strong> {timeLeft.days} dage
                  </p>
                </div>
              </div>
              
              <form onSubmit={handlePasswordChange} className="space-y-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ny adgangskode:</label>
                  <Input
                    type="text"
                    placeholder="Indtast ny kode (min. 4 tegn)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-base md:text-lg"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Opdater kode
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={resetPassword}
                    title="Nulstil til Zack2410"
                  >
                    🔄
                  </Button>
                </div>
              </form>

              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setShowPasswordAdmin(false);
                  setNewPassword("");
                }}
              >
                Luk
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};
