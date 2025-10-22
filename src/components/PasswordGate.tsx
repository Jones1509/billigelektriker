import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="w-full max-w-xl space-y-12 relative z-10">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
              Billig Elektriker
            </h1>
            
            <div className="h-px w-24 mx-auto bg-white/40" />
            
            <p className="text-xl md:text-2xl text-white/90 drop-shadow font-light tracking-wide">
              Snart lancerer vi Danmarks mest moderne elektrikerplatform
            </p>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-white text-sm font-medium tracking-wider uppercase mb-2 opacity-90">
              Eksklusiv adgang
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="password"
                placeholder="Adgangskode"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="bg-white/95 border border-white/40 rounded-lg px-6 py-6 text-base font-light placeholder:text-gray-500 focus:border-white/60 transition-colors"
              />
              {error && (
                <p className="text-white/95 text-sm mt-3 font-light drop-shadow animate-fade-in">
                  {error}
                </p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-white hover:bg-white/90 text-gray-900 font-medium text-base py-6 rounded-lg transition-all"
            >
              Fortsæt
            </Button>
            
            <p className="text-white/80 text-sm text-center mt-6 font-light">
              Har du brug for adgang? Kontakt os venligst
            </p>
          </form>
        </div>

        <div className="text-center">
          <p className="text-white/70 text-xs font-light tracking-wider uppercase">
            Lanceringsdato annonceres snart
          </p>
        </div>
      </div>
    </div>
  );
};
