import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logoElektriker from '@/assets/logo-elektriker.png';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const correctPassword = 'billigelektriker2025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Forkert adgangskode');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated electric gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] via-[#3B82F6] to-[#EF4444] animate-gradient-shift" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)] animate-pulse" />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logoElektriker} 
              alt="Billig Elektriker Logo" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
            />
          </div>
          
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight whitespace-nowrap">
              Billig Elektriker
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
              Vi er snart klar til dig!
            </p>
            <p className="text-lg md:text-xl text-white/90 drop-shadow">
              Vores nye hjemmeside er under opbygning
            </p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="password"
                placeholder="Indtast adgangskode"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="bg-white/95 border-2 border-white/50 rounded-xl px-6 py-7 text-lg font-medium"
              />
              {error && (
                <p className="text-white text-base mt-3 font-bold drop-shadow-lg">
                  {error}
                </p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-white/90 hover:bg-white text-blue-600 font-bold text-xl py-7 rounded-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Få adgang ⚡
            </Button>
            
            <p className="text-white/90 text-base text-center mt-6 font-medium drop-shadow">
              Har du brug for adgang? Kontakt os venligst
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
