import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import logoClean from '@/assets/logo-clean.png';

const SITE_PASSWORD = 'Zack2410';
const SESSION_KEY = 'site_access_granted';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate = ({ children }: PasswordGateProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Check if user already has access in this session
    const hasAccess = sessionStorage.getItem(SESSION_KEY);
    if (hasAccess === 'true') {
      setIsAuthenticated(true);
    }

    // Countdown timer
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate password
    if (password.trim() === SITE_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      toast.success('Adgang godkendt', {
        description: 'Velkommen til siden',
      });
    } else {
      toast.error('Forkert kode', {
        description: 'Prøv venligst igen',
      });
      setPassword('');
    }
    
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Electric animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] via-[#3b82f6] to-[#ef4444] animate-electric-flow" 
           style={{ backgroundSize: '400% 400%' }} />
      
      {/* Secondary animated layer for lightning effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ef4444] via-[#10b981] to-[#3b82f6] animate-electric-pulse opacity-50" 
           style={{ backgroundSize: '400% 400%' }} />
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="mb-4">
            <img 
              src={logoClean} 
              alt="Billig Elektriker" 
              className="w-32 h-auto drop-shadow-2xl"
            />
          </div>

          {/* Main heading */}
          <h1 
            className="text-5xl md:text-7xl font-black text-white -mb-2"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          >
            Billig Elektriker
          </h1>

          {/* Coming Soon text */}
          <p 
            className="text-2xl font-semibold text-white/90 tracking-[0.3em] uppercase mb-6"
          >
            COMING SOON
          </p>

          {/* Countdown timer */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 w-full">
            {[
              { value: timeLeft.days, label: 'DAGE' },
              { value: timeLeft.hours, label: 'TIMER' },
              { value: timeLeft.minutes, label: 'MIN' },
              { value: timeLeft.seconds, label: 'SEK' },
            ].map((item, index) => (
              <div
                key={index}
                className="w-28 h-28 md:w-36 md:h-36 flex flex-col items-center justify-center rounded-2xl border-2"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <div className="text-5xl md:text-6xl font-bold text-white leading-none mb-1">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm text-white/80 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mission statement */}
          <div 
            className="max-w-2xl w-full p-8 md:p-10 rounded-3xl border-2 mb-6"
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderColor: 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <div className="text-left space-y-5">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Vi bygger en platform hvor service møder handel.
              </h2>
              
              <p className="text-base md:text-lg text-white/95 leading-relaxed">
                Billig Elektriker er både autoriseret el-service og webshop. Book certificerede elektrikere til privat eller erhverv – eller køb produkter direkte og gør det selv. Én platform, alle løsninger, fair priser og dokumenteret kvalitet.
              </p>

              <p className="text-base md:text-lg text-white/95 leading-relaxed">
                Fra akut fejlfinding til planlagte installationer. Fra Smart Home-udstyr til el-komponenter. Vi gør det nemt at få præcis den hjælp eller de produkter du har brug for.
              </p>
            </div>
          </div>

          {/* Password section */}
          <div className="max-w-xl w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Indtast adgangskode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-6 text-base rounded-xl border-2 bg-white/90 border-white/50 placeholder:text-gray-400"
                disabled={isLoading}
                autoFocus
              />
              
              <Button
                type="submit"
                disabled={isLoading || !password.trim()}
                className="w-full h-14 text-lg font-bold rounded-xl bg-[#06B6D4] hover:bg-[#0891B2] text-white shadow-lg transition-all duration-200"
              >
                {isLoading ? 'Verificerer...' : 'Lås Op'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* CSS for electric animations */}
      <style>{`
        @keyframes electric-flow {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 50% 100%;
          }
          75% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes electric-pulse {
          0% {
            background-position: 100% 0%;
            opacity: 0.3;
          }
          33% {
            background-position: 0% 100%;
            opacity: 0.5;
          }
          66% {
            background-position: 100% 100%;
            opacity: 0.4;
          }
          100% {
            background-position: 100% 0%;
            opacity: 0.3;
          }
        }
        
        .animate-electric-flow {
          animation: electric-flow 8s ease-in-out infinite;
        }
        
        .animate-electric-pulse {
          animation: electric-pulse 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
