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
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#10B981] via-[#3B82F6] to-[#EF4444]">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-12">
            <img 
              src={logoElektriker}
              alt="Billig Elektriker Logo" 
              className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-contain drop-shadow-2xl animate-pulse"
            />
          </div>
          
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Billig Elektriker
            </h1>
            <p className="text-2xl font-semibold text-white tracking-[4px] uppercase">
              COMING SOON
            </p>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Indtast adgangskode"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="bg-white/95 border-2 border-white/50 rounded-xl px-6 py-6 text-base"
              />
              {error && (
                <p className="text-white text-sm mt-2 font-medium drop-shadow">
                  {error}
                </p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-6 rounded-xl transition-all hover:translate-y-[-2px]"
            >
              Få adgang
            </Button>
            
            <p className="text-white/80 text-sm text-center mt-6">
              Kontakt administratoren for at få adgang
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
