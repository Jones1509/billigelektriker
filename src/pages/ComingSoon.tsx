import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import logoClean from '@/assets/logo-clean.png';

const CORRECT_PASSWORD = 'billigelektriker2025';

const ComingSoon = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate target date (45 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);

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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.trim() === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      toast.success('Adgang godkendt', {
        description: 'Velkommen!',
      });
    } else {
      toast.error('Forkert adgangskode', {
        description: 'Prøv venligst igen',
      });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C084FC] via-[#A855F7] to-[#9333EA]" />
      
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
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">⚡</span>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Vi bygger noget helt nyt og spændende!
                </h2>
              </div>
              
              <p className="text-base md:text-lg text-white/95 leading-relaxed">
                Billig Elektriker er på vej med Danmarks mest moderne platform for elektriker-ydelser. Vi kombinerer professionel service, konkurrencedygtige priser og smart teknologi for at gøre dit hjem mere sikkert og energieffektivt.
              </p>

              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3 text-white/95">
                  <span className="text-xl">🔌</span>
                  <span className="text-base md:text-lg">Professionelle elektrikere</span>
                </div>
                <div className="flex items-center gap-3 text-white/95">
                  <span className="text-xl">💡</span>
                  <span className="text-base md:text-lg">Smart home installation</span>
                </div>
                <div className="flex items-center gap-3 text-white/95">
                  <span className="text-xl">⚡</span>
                  <span className="text-base md:text-lg">Hurtig service</span>
                </div>
                <div className="flex items-center gap-3 text-white/95">
                  <span className="text-xl">💰</span>
                  <span className="text-base md:text-lg">Gennemsigtige priser</span>
                </div>
              </div>
            </div>
          </div>

          {/* Password section */}
          {!isAuthenticated && (
            <div className="max-w-xl w-full">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Indtast adgangskode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 px-6 text-base rounded-xl border-2 bg-white/90 border-white/50 placeholder:text-gray-400"
                />
                
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold rounded-xl bg-[#06B6D4] hover:bg-[#0891B2] text-white shadow-lg transition-all duration-200"
                >
                  Lås Op
                </Button>
              </form>
            </div>
          )}

          {/* Authenticated message */}
          {isAuthenticated && (
            <div 
              className="max-w-xl w-full p-8 rounded-3xl border-2"
              style={{
                background: 'rgba(255,255,255,0.15)',
                borderColor: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Velkommen! 🎉
              </h2>
              <p className="text-white text-lg leading-relaxed">
                Du har nu adgang til forhåndsvisningen. Vi arbejder hårdt på at gøre siden klar til lancering.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
