import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LAUNCH_PASSWORD = "billigelektriker2025";
const LAUNCH_DATE = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000); // 45 dage frem

const ComingSoon = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = LAUNCH_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === LAUNCH_PASSWORD) {
      toast.success("Adgang godkendt!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      toast.error("Forkert adgangskode");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
      <div className="w-full max-w-[1200px] mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-12 md:mb-[50px]">
          <div className="p-8 md:p-10 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl shadow-2xl backdrop-blur-sm border-2 border-white/30">
            <Zap className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 text-white drop-shadow-2xl" />
          </div>
        </div>

        {/* Overskrift */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
          Billig Elektriker
        </h1>

        {/* Undertekst */}
        <p className="text-xl sm:text-2xl font-semibold text-white tracking-[4px] uppercase mb-10 md:mb-[50px]">
          COMING SOON
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mb-12 md:mb-[60px]">
          {[
            { value: timeLeft.days, label: "DAGE" },
            { value: timeLeft.hours, label: "TIMER" },
            { value: timeLeft.minutes, label: "MIN" },
            { value: timeLeft.seconds, label: "SEK" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/20 backdrop-blur-[10px] border-2 border-white/40 rounded-2xl p-5 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-sm md:text-base text-white uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tekstboks - Mission Statement */}
        <div className="max-w-[800px] mx-auto bg-white/15 backdrop-blur-[15px] border-2 border-white/30 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-10 md:mb-[50px]">
          <p className="text-base md:text-lg leading-relaxed text-white text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            Vi er Billig Elektriker – dit nye valg for professionel el-service i København og omegn.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            Vores mission er simpel: At levere førsteklasses el-arbejde til ærlige priser, uden at gå på kompromis med kvaliteten. Vi er et ungt, dynamisk team af certificerede elektrikere med passion for faget.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white text-center mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            Fra den mindste fejlfinding til store installationsprojekter – vi løser dine problemer hurtigt, professionelt og til en pris der giver mening.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            Snart kan du opleve forskellen selv. Vi glæder os til at servicere dig!
          </p>
        </div>

        {/* Password Sektion */}
        <div className="max-w-[500px] mx-auto">
          <form onSubmit={handlePasswordSubmit}>
            <Input
              type="password"
              placeholder="Indtast adgangskode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/95 border-2 border-white/50 rounded-xl p-5 text-base mb-4 w-full"
            />
            <Button
              type="submit"
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-lg font-bold py-5 px-12 rounded-xl w-full transition-all hover:-translate-y-0.5"
            >
              Få adgang
            </Button>
          </form>
          <p className="text-sm text-white/80 mt-6">
            Kontakt administratoren for at få adgang
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
