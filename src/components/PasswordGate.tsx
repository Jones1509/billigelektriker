import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import logoComingSoon from '@/assets/logo-coming-soon.png';

const SITE_PASSWORD = 'Zack2410';
const COMING_SOON_PASSWORD = 'billigelektriker2025';
const SESSION_KEY = 'site_access_granted';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate = ({ children }: PasswordGateProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate target date (45 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);

  useEffect(() => {
    // Check if user already has access in this session
    const hasAccess = sessionStorage.getItem(SESSION_KEY);
    if (hasAccess === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
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

    // Check both passwords
    if (password.trim() === SITE_PASSWORD || password.trim() === COMING_SOON_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      toast.success('Adgang godkendt', {
        description: 'Velkommen til siden',
      });
    } else {
      toast.error('Forkert adgangskode', {
        description: 'Prøv venligst igen',
      });
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#A855F7]" />
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          {/* Logo */}
          <div className="mb-2">
            <img 
              src={logoComingSoon} 
              alt="Billig Elektriker" 
              className="w-[100px] md:w-[120px] h-auto drop-shadow-2xl"
            />
          </div>

          {/* Main heading */}
          <h1 
            className="text-[32px] md:text-[48px] font-[800] text-white text-center"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          >
            Billig Elektriker
          </h1>

          {/* Coming Soon text */}
          <p 
            className="text-[18px] md:text-[20px] font-[600] text-white tracking-[3px] uppercase"
          >
            COMING SOON
          </p>

          {/* Countdown timer */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full my-6">
            {[
              { value: timeLeft.days, label: 'DAGE' },
              { value: timeLeft.hours, label: 'TIMER' },
              { value: timeLeft.minutes, label: 'MIN' },
              { value: timeLeft.seconds, label: 'SEK' },
            ].map((item, index) => (
              <div
                key={index}
                className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] flex flex-col items-center justify-center p-3 md:p-4 rounded-[16px] border-2"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                <div className="text-[28px] md:text-[40px] font-bold text-white leading-none mb-1">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[12px] md:text-[14px] text-white uppercase tracking-[1px]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mission statement */}
          <div 
            className="max-w-[700px] w-full p-6 md:p-8 rounded-[20px] border-2"
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderColor: 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <div 
              className="text-[15px] md:text-[16px] leading-[1.7] text-white text-left space-y-3"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
            >
              <p>
                Vi bygger en platform hvor service møder handel.
              </p>
              <p>
                Billig Elektriker er både autoriseret el-service og webshop. Book certificerede elektrikere til privat eller erhverv – eller køb produkter direkte og gør det selv. Én platform, alle løsninger, fair priser og dokumenteret kvalitet.
              </p>
              <p>
                Fra akut fejlfinding til planlagte installationer. Fra Smart Home-udstyr til el-komponenter. Vi gør det nemt at få præcis den hjælp eller de produkter du har brug for.
              </p>
            </div>
          </div>

          {/* Password section */}
          <div className="max-w-[450px] w-full mt-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="password"
                placeholder="Indtast adgangskode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-auto px-5 py-[14px] text-[15px] rounded-[12px] border-2"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderColor: 'rgba(255,255,255,0.5)',
                }}
                autoFocus
              />
              
              <Button
                type="submit"
                disabled={!password.trim()}
                className="w-full h-auto px-10 py-[14px] text-[16px] font-bold rounded-[12px] bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                Få adgang
              </Button>
            </form>
            
            <p className="text-[13px] mt-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Kontakt administratoren for at få adgang
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
