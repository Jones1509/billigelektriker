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
      
      <div className="w-full max-w-2xl space-y-10 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/src/assets/logo-elektriker.png" 
                alt="Billig Elektriker Logo" 
                className="w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl animate-pulse"
              />
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight whitespace-nowrap">
                Billig Elektriker
              </h1>
            </div>
            
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg animate-fade-in">
                🚀 Snart lancerer vi!
              </p>
              <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg font-semibold max-w-xl mx-auto">
                Danmarks mest moderne elektrikerplatform er på vej
              </p>
            </div>
          </div>

          {/* Benefits preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 transform hover:scale-105 transition-all">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-white font-bold text-sm">Lynhurtig booking</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 transform hover:scale-105 transition-all">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-white font-bold text-sm">Konkurrencedygtige priser</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 transform hover:scale-105 transition-all">
              <div className="text-3xl mb-2">🛒</div>
              <p className="text-white font-bold text-sm">Smart produkt-shop</p>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all">
          <div className="text-center mb-6">
            <p className="text-white/90 text-lg font-semibold drop-shadow">
              🔐 Eksklusiv forhåndsadgang
            </p>
            <p className="text-white/75 text-sm mt-2">
              Er du klar til at opleve fremtidens elektrikerservice?
            </p>
          </div>
          
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
                className="bg-white/95 border-2 border-white/50 rounded-xl px-6 py-7 text-lg font-medium placeholder:text-gray-400"
              />
              {error && (
                <p className="text-white text-base mt-3 font-bold drop-shadow-lg animate-fade-in">
                  {error}
                </p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-white hover:bg-white/95 text-blue-600 font-bold text-xl py-7 rounded-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Få adgang nu ⚡
            </Button>
            
            <p className="text-white/90 text-base text-center mt-6 font-medium drop-shadow">
              Har du brug for adgang? 
              <br />
              <span className="text-white font-bold">Kontakt os i dag</span>
            </p>
          </form>
        </div>

        {/* Coming soon teaser */}
        <div className="text-center">
          <p className="text-white/80 text-sm font-medium drop-shadow animate-pulse">
            ✨ Lanceringsdato annonceres snart ✨
          </p>
        </div>
      </div>
    </div>
  );
};
