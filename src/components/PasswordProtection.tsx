import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Zap } from "lucide-react";
import logo from "@/assets/logo-clean.png";

const CORRECT_PASSWORD = "billigelektriker2025";
// Beregn 45 dage fra nu
const LAUNCH_DATE = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const PasswordProtection = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setIsReady(true);
    console.log("🔒 PASSWORD WALL ACTIVE - ALL CONTENT BLOCKED");
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = LAUNCH_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔑 Attempting password:", password.substring(0, 3) + "...");
    
    if (password.trim() === CORRECT_PASSWORD) {
      console.log("✅ CORRECT PASSWORD - UNLOCKING CONTENT");
      setIsUnlocked(true);
      setError("");
    } else {
      console.log("❌ WRONG PASSWORD");
      setError("Forkert adgangskode - prøv igen");
      setPassword("");
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-blue-600 to-secondary">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        {/* Animated Electric Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9] via-[#A855F7] to-[#EC4899] animate-gradient-shift"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-2xl animate-fade-in">
          <div className="flex flex-col items-center gap-8">
            
            {/* Logo */}
            <div>
              <img 
                src={logo} 
                alt="Billig Elektriker Logo" 
                className="w-[180px] h-auto mb-4"
              />
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                Billig Elektriker
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-white/90 tracking-wide">
                COMING SOON
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 md:gap-6 w-full max-w-xl">
              {[
                { value: timeLeft.days, label: 'Dage' },
                { value: timeLeft.hours, label: 'Timer' },
                { value: timeLeft.minutes, label: 'Min' },
                { value: timeLeft.seconds, label: 'Sek' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="countdown-box bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border-2 border-white/30 animate-pulse-glow-slow"
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Story Box */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border-2 border-white/30 max-w-xl shimmer-border">
              <div className="flex items-start gap-3 mb-4">
                <Zap className="h-6 w-6 text-yellow-300 flex-shrink-0 mt-1" />
                <div className="text-white space-y-3">
                  <p className="text-lg md:text-xl font-semibold leading-relaxed">
                    Vi bygger noget helt nyt og spændende!
                  </p>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed">
                    Billig Elektriker er på vej med Danmarks mest moderne platform for elektriker-ydelser. 
                    Vi kombinerer professionel service, konkurrencedygtige priser og smart teknologi 
                    for at gøre dit hjem mere sikkert og energieffektivt.
                  </p>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed">
                    🔌 Professionelle elektrikere<br />
                    💡 Smart home installation<br />
                    ⚡ Hurtig service<br />
                    💰 Gennemsigtige priser
                  </p>
                </div>
              </div>
            </div>

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Indtast adgangskode"
                  className="pl-12 h-14 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white placeholder:text-white/60 text-lg rounded-xl focus:border-white/60 focus:ring-4 focus:ring-white/20"
                  autoFocus
                />
              </div>
              
              {error && (
                <p className="text-red-200 text-center font-medium bg-red-500/20 py-2 px-4 rounded-lg backdrop-blur-sm border border-red-300/30">
                  {error}
                </p>
              )}
              
              <Button 
                type="submit"
                className="w-full h-14 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.8)] hover:scale-105"
              >
                Lås Op
              </Button>
            </form>

          </div>
        </div>

        {/* Additional CSS Animations */}
        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes pulse-glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(255,255,255,0.3);
            }
            50% { 
              box-shadow: 0 0 40px rgba(14, 165, 233, 0.6);
            }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          .animate-gradient-shift {
            background-size: 400% 400%;
            animation: gradient-shift 12s ease infinite;
          }
          
          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          .animate-pulse-glow-slow {
            animation: pulse-glow 3s ease-in-out infinite;
          }
          
          .shimmer-border {
            background: linear-gradient(
              90deg,
              rgba(255,255,255,0.1) 0%,
              rgba(255,255,255,0.3) 50%,
              rgba(255,255,255,0.1) 100%
            );
            background-size: 200% 100%;
            animation: shimmer 3s linear infinite;
          }
          
          .countdown-box {
            box-shadow: 0 0 20px rgba(255,255,255,0.3);
          }
        `}</style>
      </div>
    );
  }

  console.log("✅ Showing unlocked content");
  return <>{children}</>;
};
