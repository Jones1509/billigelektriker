import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo-password.png";

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
      {/* Animated Multi-Color Gradient Background */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #0EA5E9 33%, #EF4444 66%, #10B981 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite'
        }}
      />
      
      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Electric Lightning Flashes */}
      {lightningFlashes.map(flash => (
        <Zap
          key={flash.id}
          className={`absolute transition-opacity duration-150 pointer-events-none`}
          style={{
            ...flash.position,
            width: '80px',
            height: '80px',
            color: '#0EA5E9',
            opacity: flash.visible ? 0.7 : 0,
            filter: 'drop-shadow(0 0 40px rgba(14,165,233,0.8))',
          }}
        />
      ))}

      {/* SVG Light Arcs */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="arcGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#0EA5E9', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
          </linearGradient>
          <linearGradient id="arcGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        <path
          d="M 0,100 Q 400,50 800,100"
          stroke="url(#arcGradient1)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: 'drawArc 8s ease-in-out infinite'
          }}
        />
        <path
          d="M 800,300 Q 400,400 0,300"
          stroke="url(#arcGradient2)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: 'drawArc 8s ease-in-out infinite 2s'
          }}
        />
        <path
          d="M 200,0 Q 400,200 600,600"
          stroke="url(#arcGradient1)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: 'drawArc 8s ease-in-out infinite 4s'
          }}
        />
      </svg>

      {/* Animated Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 5 + 3}px`,
              height: `${Math.random() * 5 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: ['#0EA5E9', '#10B981', '#EF4444', '#ffffff'][Math.floor(Math.random() * 4)],
              opacity: Math.random() * 0.6 + 0.2,
              animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Content Box */}
      <div className="w-full max-w-[700px] animate-fade-in">
        <div 
          className="rounded-[32px] p-6 md:p-16 space-y-8 md:space-y-12 border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.6s ease-out'
          }}
        >
          {/* Logo */}
          <div className="flex justify-center" style={{ animation: 'fadeIn 0.8s ease-out' }}>
            <img 
              src={logo} 
              alt="Billig Elektriker" 
              className="w-auto"
              style={{ 
                maxWidth: '125px',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Countdown Section */}
          <div className="text-center space-y-6 md:space-y-8">
            <p className="text-[14px] font-bold text-white/80 uppercase tracking-[3px]">
              Lancering om
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-[600px] mx-auto">
              <div 
                className="rounded-[20px] p-6 border-2 border-white/30"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="text-[56px] font-black text-white leading-none"
                  style={{ textShadow: '0 0 20px rgba(14,165,233,0.6)' }}
                >
                  {timeLeft.days}
                </div>
                <div className="text-[13px] text-white/70 mt-2 uppercase tracking-[2px] font-semibold">Dage</div>
              </div>
              <div 
                className="rounded-[20px] p-6 border-2 border-white/30"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="text-[56px] font-black text-white leading-none"
                  style={{ textShadow: '0 0 20px rgba(14,165,233,0.6)' }}
                >
                  {timeLeft.hours}
                </div>
                <div className="text-[13px] text-white/70 mt-2 uppercase tracking-[2px] font-semibold">Timer</div>
              </div>
              <div 
                className="rounded-[20px] p-6 border-2 border-white/30"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="text-[56px] font-black text-white leading-none"
                  style={{ textShadow: '0 0 20px rgba(14,165,233,0.6)' }}
                >
                  {timeLeft.minutes}
                </div>
                <div className="text-[13px] text-white/70 mt-2 uppercase tracking-[2px] font-semibold">Min</div>
              </div>
              <div 
                className="rounded-[20px] p-6 border-2 border-white/30"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="text-[56px] font-black text-white leading-none"
                  style={{ textShadow: '0 0 20px rgba(14,165,233,0.6)' }}
                >
                  {timeLeft.seconds}
                </div>
                <div className="text-[13px] text-white/70 mt-2 uppercase tracking-[2px] font-semibold">Sek</div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 
            className="text-[24px] md:text-[40px] font-black text-white leading-[1.3] md:leading-[1.2] text-left md:text-center px-2 md:px-0"
            style={{ 
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-0.5px'
            }}
          >
            Vi bygger en platform hvor service møder handel.
          </h1>

          {/* Description */}
          <div className="max-w-[600px] mx-auto space-y-5 md:space-y-6">
            <p className="text-[15px] md:text-[18px] text-white/90 leading-[1.7] md:leading-[1.8] text-left md:text-center font-normal px-2 md:px-0">
              Billig Elektriker er både autoriseret el-service og webshop. Book certificerede elektrikere til privat eller erhverv – eller køb produkter direkte og gør det selv. Én platform, alle løsninger, fair priser og dokumenteret kvalitet.
            </p>
            <p className="text-[15px] md:text-[18px] text-white/90 leading-[1.7] md:leading-[1.8] text-left md:text-center font-normal px-2 md:px-0">
              Fra akut fejlfinding til planlagte installationer. Fra Smart Home-udstyr til el-komponenter. Vi gør det nemt at få præcis den hjælp eller de produkter du har brug for.
            </p>
          </div>

          {/* Password Input Section */}
          <div className="max-w-[400px] mx-auto space-y-5 pt-4">
            <p className="text-[16px] text-white/90 text-center font-semibold">
              Har du fået adgang? Indtast kode:
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Indtast adgangskode"
                className="w-full h-[56px] rounded-[14px] px-6 text-[17px] text-white placeholder-white/50 border-2 border-white/30 transition-all duration-300 focus:outline-none focus:border-[#0EA5E9]"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 20px rgba(14,165,233,0.4)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
              <button
                type="submit"
                className="w-full h-[56px] rounded-[14px] text-white text-[18px] font-bold transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
                  boxShadow: '0 8px 28px rgba(14,165,233,0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(14,165,233,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(14,165,233,0.4)';
                }}
              >
                Få Adgang
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-[14px] text-white/60 text-center mt-12">
            Spørgsmål? Kontakt os på{" "}
            <a 
              href="mailto:info@billigelektriker.dk"
              className="hover:text-white transition-colors underline"
            >
              info@billigelektriker.dk
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
            transform: translateY(30px);
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
        
        @keyframes drawArc {
          0% {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            stroke-dashoffset: -1000;
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(-5px, 5px);
          }
          75% {
            transform: translate(-10px, -5px);
          }
        }
      `}</style>
    </div>
  );
};
