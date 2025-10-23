import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import logoClean from '@/assets/logo-clean.png';

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
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-[60px] py-[30px] md:py-[60px]">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
          {/* Logo */}
          <div className="mb-[50px]">
            <img 
              src={logoClean} 
              alt="Billig Elektriker" 
              className="w-[180px] h-auto drop-shadow-2xl"
            />
          </div>

          {/* Main heading */}
          <h1 
            className="text-[48px] md:text-[72px] font-[800] text-white mb-6"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          >
            Billig Elektriker
          </h1>

          {/* Coming Soon text */}
          <p 
            className="text-[24px] font-[600] text-white tracking-[4px] uppercase mb-[50px]"
          >
            COMING SOON
          </p>

          {/* Countdown timer */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-[60px] w-full">
            {[
              { value: timeLeft.days, label: 'DAGE' },
              { value: timeLeft.hours, label: 'TIMER' },
              { value: timeLeft.minutes, label: 'MIN' },
              { value: timeLeft.seconds, label: 'SEK' },
            ].map((item, index) => (
              <div
                key={index}
                className="w-[90px] h-[90px] md:w-[140px] md:h-[140px] flex flex-col items-center justify-center p-5 rounded-[20px] border-2"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                <div className="text-[36px] md:text-[56px] font-bold text-white leading-none mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[16px] text-white uppercase tracking-[1px]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mission statement */}
          <div 
            className="max-w-[800px] w-full p-[40px] rounded-[24px] border-2 mb-[50px]"
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderColor: 'rgba(255,255,255,0.3)',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <div 
              className="text-[16px] md:text-[18px] leading-[1.8] text-white space-y-4"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
            >
              <p>
                Vi er Billig Elektriker – dit nye valg for professionel el-service i København og omegn.
              </p>
              <p>
                Vores mission er simpel: At levere førsteklasses el-arbejde til ærlige priser, uden at gå på kompromis med kvaliteten. Vi er et ungt, dynamisk team af certificerede elektrikere med passion for faget.
              </p>
              <p>
                Fra den mindste fejlfinding til store installationsprojekter – vi løser dine problemer hurtigt, professionelt og til en pris der giver mening.
              </p>
              <p>
                Snart kan du opleve forskellen selv. Vi glæder os til at servicere dig!
              </p>
            </div>
          </div>

          {/* Password section */}
          <div className="max-w-[500px] w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Indtast adgangskode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-auto px-6 py-[18px] text-[16px] rounded-[12px] border-2"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderColor: 'rgba(255,255,255,0.5)',
                }}
                autoFocus
              />
              
              <Button
                type="submit"
                disabled={!password.trim()}
                className="w-full h-auto px-12 py-[18px] text-[18px] font-bold rounded-[12px] bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                Få adgang
              </Button>
            </form>
            
            <p className="text-[14px] mt-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Kontakt administratoren for at få adgang
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
