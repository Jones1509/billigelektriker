import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
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

  useEffect(() => {
    // Check if user already has access in this session
    const hasAccess = sessionStorage.getItem(SESSION_KEY);
    if (hasAccess === 'true') {
      setIsAuthenticated(true);
    }
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
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9] via-[#8B5CF6] to-[#EC4899] animate-gradient-shift" />
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          {/* Rotating logo with countdown effect */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] rounded-full blur-2xl opacity-30 animate-pulse" />
              <img 
                src={logoClean} 
                alt="Logo" 
                className="relative w-24 h-24 md:w-32 md:h-32 animate-spin-slow drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6]">
              Beskyttet Side
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Indtast adgangskoden for at fortsætte
            </p>
          </div>

          {/* Password form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Indtast kode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 h-14 text-lg border-2 focus:border-[#0EA5E9] rounded-xl"
                disabled={isLoading}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] hover:from-[#0284C7] hover:to-[#7C3AED] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? 'Verificerer...' : 'Åbn Side'}
            </Button>
          </form>

          {/* Trust indicators */}
          <div className="pt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Sikker adgang</span>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};
