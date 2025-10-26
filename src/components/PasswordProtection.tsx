import { useState, useEffect } from "react";
import { Lock, Unlock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import logo from "@/assets/logo-new.png";

const LAUNCH_DATE = new Date("2025-11-15T00:00:00");

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

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={logo} alt="Billig Elektriker" className="h-24 w-auto" />
          </div>

          {/* Countdown */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Hjemmesiden lanceres snart
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-4 text-white">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-xs uppercase tracking-wide">Dage</div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-4 text-white">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs uppercase tracking-wide">Timer</div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-4 text-white">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs uppercase tracking-wide">Min</div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-4 text-white">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs uppercase tracking-wide">Sek</div>
              </div>
            </div>
          </div>

          {/* Access Code Form */}
          <div className="border-t pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Har du en adgangskode? Indtast den her:
                </p>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Indtast adgangskode"
                  className="pl-10 text-center"
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Unlock className="mr-2 h-5 w-5" />
                Få adgang
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="text-center text-sm text-gray-500 border-t pt-6">
            <p>
              Brug for adgang nu?{" "}
              <a
                href="mailto:kontakt@billigelektriker.dk"
                className="text-primary hover:underline font-medium"
              >
                Kontakt os
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
