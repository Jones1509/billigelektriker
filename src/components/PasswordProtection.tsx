import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import logo from "@/assets/logo-new.png";

// Calculate launch date as 45 days from now
const calculateLaunchDate = () => {
  const now = new Date();
  const launchDate = new Date(now.getTime() + (45 * 24 * 60 * 60 * 1000));
  return launchDate;
};

const LAUNCH_DATE = calculateLaunchDate();

export const PasswordProtection = ({ children }: { children: React.ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Check if already unlocked
    const unlocked = localStorage.getItem("site_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }

    // Update countdown
    const timer = setInterval(() => {
      const now = new Date();
      const difference = LAUNCH_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify code with backend
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-access-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.valid) {
        localStorage.setItem("site_unlocked", "true");
        setIsUnlocked(true);
        toast.success("Adgang godkendt! Velkommen!");
      } else {
        toast.error("Forkert adgangskode");
        setCode("");
      }
    } catch (error) {
      toast.error("Der opstod en fejl. Prøv igen.");
    }
  };

  // Lightning flash animation
  const [lightningFlashes, setLightningFlashes] = useState([
    { id: 1, visible: false, position: { top: '10%', left: '15%' } },
    { id: 2, visible: false, position: { top: '60%', right: '10%' } },
    { id: 3, visible: false, position: { bottom: '15%', left: '8%' } },
    { id: 4, visible: false, position: { top: '30%', right: '20%' } }
  ]);

  useEffect(() => {
    // Lightning flash patterns
    const flashLightning = (id: number, delay: number) => {
      setTimeout(() => {
        setLightningFlashes(prev => prev.map(flash => 
          flash.id === id ? { ...flash, visible: true } : flash
        ));
        
        setTimeout(() => {
          setLightningFlashes(prev => prev.map(flash => 
            flash.id === id ? { ...flash, visible: false } : flash
          ));
        }, 150);
        
        // Double flash
        setTimeout(() => {
          setLightningFlashes(prev => prev.map(flash => 
            flash.id === id ? { ...flash, visible: true } : flash
          ));
          
          setTimeout(() => {
            setLightningFlashes(prev => prev.map(flash => 
              flash.id === id ? { ...flash, visible: false } : flash
            ));
          }, 150);
        }, 300);
      }, delay);
    };

    const interval = setInterval(() => {
      flashLightning(1, 0);
      flashLightning(2, 2000);
      flashLightning(3, 4000);
      flashLightning(4, 6000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 25%, #8B5CF6 50%, #3B82F6 75%, #0EA5E9 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 18s ease infinite'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 -z-10" />

      {/* Lightning Flashes */}
      {lightningFlashes.map(flash => (
        <Zap
          key={flash.id}
          className={`absolute w-16 h-16 text-yellow-300 transition-opacity duration-150 pointer-events-none ${
            flash.visible ? 'opacity-70' : 'opacity-0'
          }`}
          style={flash.position}
        />
      ))}

      {/* Animated Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 5 + 3}px`,
              height: `${Math.random() * 5 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: ['#ffffff', '#fef08a', '#93c5fd'][Math.floor(Math.random() * 3)],
              opacity: Math.random() * 0.6 + 0.2,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content Box */}
      <div className="w-full max-w-[700px] animate-fade-in">
        <div 
          className="bg-white/95 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-12 md:p-16 space-y-10"
          style={{ animation: 'slideUp 0.6s ease-out' }}
        >
          {/* Logo */}
          <div className="flex justify-center" style={{ animation: 'fadeIn 0.8s ease-out' }}>
            <img src={logo} alt="Billig Elektriker" className="h-[200px] w-auto" />
          </div>

          {/* Countdown Section */}
          <div className="text-center space-y-6">
            <p className="text-[16px] font-semibold text-[#64748B] uppercase tracking-[2px]">
              Lancering om
            </p>
            
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 max-w-[600px] mx-auto">
              <div className="bg-[#F8FAFC] rounded-2xl p-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="text-[48px] font-bold text-[#1E293B] leading-none">{timeLeft.days}</div>
                <div className="text-[13px] text-[#64748B] mt-2 uppercase tracking-wide">Dage</div>
              </div>
              <div className="bg-[#F8FAFC] rounded-2xl p-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="text-[48px] font-bold text-[#1E293B] leading-none">{timeLeft.hours}</div>
                <div className="text-[13px] text-[#64748B] mt-2 uppercase tracking-wide">Timer</div>
              </div>
              <div className="bg-[#F8FAFC] rounded-2xl p-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="text-[48px] font-bold text-[#1E293B] leading-none">{timeLeft.minutes}</div>
                <div className="text-[13px] text-[#64748B] mt-2 uppercase tracking-wide">Min</div>
              </div>
              <div className="bg-[#F8FAFC] rounded-2xl p-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="text-[48px] font-bold text-[#1E293B] leading-none">{timeLeft.seconds}</div>
                <div className="text-[13px] text-[#64748B] mt-2 uppercase tracking-wide">Sek</div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[36px] md:text-[36px] font-extrabold text-[#1E293B] leading-[1.3] text-center">
            Vi bygger en platform hvor service møder handel.
          </h1>

          {/* Description */}
          <div className="max-w-[600px] mx-auto space-y-4">
            <p className="text-[17px] text-[#64748B] leading-[1.7] text-center">
              Billig Elektriker er både autoriseret el-service og webshop. Book certificerede elektrikere til privat eller erhverv – eller køb produkter direkte og gør det selv. Én platform, alle løsninger, fair priser og dokumenteret kvalitet.
            </p>
            <p className="text-[17px] text-[#64748B] leading-[1.7] text-center">
              Fra akut fejlfinding til planlagte installationer. Fra Smart Home-udstyr til el-komponenter. Vi gør det nemt at få præcis den hjælp eller de produkter du har brug for.
            </p>
          </div>

          {/* Password Input Section */}
          <div className="max-w-[400px] mx-auto space-y-3">
            <p className="text-[15px] text-[#64748B] text-center">
              Har du fået adgang? Indtast kode:
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Indtast adgangskode"
                className="h-[52px] border-2 border-[#E2E8F0] rounded-xl px-5 text-[16px] focus:border-[#0EA5E9] transition-colors"
                required
              />
              <Button 
                type="submit" 
                className="w-full h-[52px] text-[17px] font-bold rounded-xl shadow-[0_6px_24px_rgba(14,165,233,0.35)] hover:scale-[1.02] transition-transform duration-300"
                style={{
                  background: 'linear-gradient(135deg, #0EA5E9, #8B5CF6)'
                }}
              >
                Få Adgang
              </Button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-[13px] text-[#94A3B8] text-center mt-10">
            Spørgsmål? Kontakt os på{" "}
            <a 
              href="mailto:kontakt@billigelektriker.dk"
              className="hover:text-[#0EA5E9] transition-colors"
            >
              kontakt@billigelektriker.dk
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
