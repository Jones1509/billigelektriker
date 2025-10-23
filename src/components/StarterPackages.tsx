import { Button } from "./ui/button";
import { Check, Zap, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

export const StarterPackages = () => {
  const { t } = useTranslation();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  const packages = [
    {
      name: t('starterPackages.starter.name'),
      price: t('starterPackages.starter.price'),
      description: t('starterPackages.starter.description'),
      features: t('starterPackages.starter.features', { returnObjects: true }) as string[],
      perfectFor: t('starterPackages.starter.perfectFor'),
      popular: false
    },
    {
      name: t('starterPackages.expansion.name'),
      price: t('starterPackages.expansion.price'),
      description: t('starterPackages.expansion.description'),
      features: t('starterPackages.expansion.features', { returnObjects: true }) as string[],
      perfectFor: t('starterPackages.expansion.perfectFor'),
      popular: true
    },
    {
      name: t('starterPackages.complete.name'),
      price: t('starterPackages.complete.price'),
      description: t('starterPackages.complete.description'),
      features: t('starterPackages.complete.features', { returnObjects: true }) as string[],
      perfectFor: t('starterPackages.complete.perfectFor'),
      popular: false
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate prices
            packages.forEach((pkg, idx) => {
              const targetPrice = parseInt(pkg.price.replace(/\./g, ''));
              const element = priceRefs.current[idx];
              if (element) {
                let current = 0;
                const increment = targetPrice / 75;
                const timer = setInterval(() => {
                  current += increment;
                  if (current >= targetPrice) {
                    element.textContent = pkg.price;
                    clearInterval(timer);
                  } else {
                    element.textContent = Math.floor(current).toLocaleString('da-DK');
                  }
                }, 16);
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, packages]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-16 px-4 animate-fade-in">
          <span 
            className="inline-block px-5 py-2 rounded-full text-xs uppercase font-semibold tracking-[2px] mb-6"
            style={{
              background: 'rgba(14,165,233,0.1)',
              border: '1px solid rgba(14,165,233,0.3)',
              color: '#0369A1'
            }}
          >
            Professionel Installation
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#1E293B]">
            {t('starterPackages.title')}
          </h2>
          <p className="text-base md:text-lg text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            {t('starterPackages.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`package-card group flex flex-col relative rounded-[20px] transition-all duration-300 animate-fade-in ${
                pkg.popular ? 'premium-gradient-card scale-[1.02]' : 'bg-white'
              }`}
              style={{ 
                border: pkg.popular ? 'none' : '2px solid #E2E8F0',
                boxShadow: pkg.popular 
                  ? '0 8px 32px rgba(14,165,233,0.3), 0 0 30px rgba(14,165,233,0.2)' 
                  : '0 4px 16px rgba(0,0,0,0.06)',
                padding: '40px 32px',
                animationDelay: `${idx * 100}ms`
              }}
            >
              {/* Popular badge with pulse */}
              {pkg.popular && (
                <>
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 popular-pulse">
                    <span 
                      className="inline-block px-6 py-2 rounded-2xl text-xs font-bold uppercase tracking-wide text-white shadow-lg"
                      style={{
                        background: 'linear-gradient(90deg, #FFB800 0%, #FF8800 100%)',
                        boxShadow: '0 4px 12px rgba(255,184,0,0.5), 0 0 20px rgba(255,184,0,0.4)'
                      }}
                    >
                      {t('starterPackages.mostPopular')}
                    </span>
                  </div>
                  {/* Save badge */}
                  <div className="absolute -top-3.5 right-4 z-10 save-pulse">
                    <span 
                      className="inline-block px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#DC2626]"
                      style={{
                        boxShadow: '0 4px 12px rgba(220,38,38,0.4)'
                      }}
                    >
                      SPAR 800 KR
                    </span>
                  </div>
                </>
              )}
              
              <div className="relative text-center mb-8">
                <h3 className={`text-2xl md:text-3xl font-bold mb-5 ${pkg.popular ? 'text-white' : 'text-[#1E293B]'}`}>
                  {pkg.name}
                </h3>
                
                {/* Animated price counter */}
                <div className="mb-4">
                  <span 
                    ref={(el) => (priceRefs.current[idx] = el)}
                    className={`text-5xl md:text-6xl font-black ${pkg.popular ? 'text-white' : 'text-[#0EA5E9]'}`}
                  >
                    {pkg.price}
                  </span>
                  <span className={`text-2xl font-medium align-top ml-2 ${pkg.popular ? 'text-white/80' : 'text-[#64748B]'}`}>
                    kr.
                  </span>
                </div>
                
                <p className={`text-sm md:text-base italic leading-relaxed max-w-xs mx-auto ${pkg.popular ? 'text-white/90' : 'text-[#64748B]'}`}>
                  {pkg.description}
                </p>
              </div>

              {/* Clean separator */}
              <div className={`w-4/5 h-px mx-auto mb-8 ${pkg.popular ? 'bg-white/20' : 'bg-[#E2E8F0]'}`}></div>

              <div className="relative flex-grow">
                <p className={`text-xs font-semibold uppercase tracking-[1.5px] mb-5 ${pkg.popular ? 'text-white/70' : 'text-[#94A3B8]'}`}>
                  {t('starterPackages.includes')}
                </p>
                <ul className="space-y-3 mb-7">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div 
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          pkg.popular ? 'bg-white/20' : 'bg-[#0EA5E9]'
                        }`}
                      >
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </div>
                      <span className={`text-sm md:text-base font-medium leading-relaxed ${
                        pkg.popular ? 'text-white' : 'text-[#475569]'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className={`pt-5 mt-7 ${pkg.popular ? 'border-t border-white/20' : 'border-t border-[#E2E8F0]'}`}>
                  <p className={`text-sm italic text-center ${pkg.popular ? 'text-white/80' : 'text-[#64748B]'}`}>
                    {pkg.perfectFor}
                  </p>
                </div>
              </div>

              <div className="relative pt-7 flex flex-col items-center">
                <Button 
                  className={`w-full h-[52px] text-base md:text-lg font-bold rounded-xl transition-all duration-200 group/btn ${
                    pkg.popular 
                      ? 'bg-white text-[#0EA5E9] hover:bg-white/90 hover:scale-[1.02]' 
                      : 'bg-transparent text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white border-2 border-[#0EA5E9]'
                  }`}
                  style={pkg.popular ? {
                    boxShadow: '0 4px 16px rgba(255,255,255,0.3)'
                  } : {}}
                >
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    {t('starterPackages.cta')}
                  </span>
                </Button>
                <p className={`text-xs mt-2.5 text-center ${pkg.popular ? 'text-white/70' : 'text-[#94A3B8]'}`}>
                  {t('starterPackages.vatIncluded')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof notification */}
        <div className="mt-12 flex justify-center px-4 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <div 
            className="max-w-2xl w-full flex items-center gap-3 px-6 py-4 rounded-lg"
            style={{
              background: 'rgba(14,165,233,0.1)',
              borderLeft: '3px solid #0EA5E9'
            }}
          >
            <TrendingUp className="h-5 w-5 text-[#0EA5E9] flex-shrink-0" />
            <p className="text-sm text-[#475569] font-medium">
              🔥 <strong>12 kunder</strong> har booket installation denne uge • ⚡ <strong>3 Start-pakker</strong> solgt i dag
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .package-card:hover {
          border-color: #0EA5E9;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }

        .package-card.premium-gradient-card {
          background: linear-gradient(135deg, #0EA5E9, #8B5CF6, #EC4899, #0EA5E9);
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }

        .package-card.premium-gradient-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 12px 40px rgba(14,165,233,0.4), 0 0 50px rgba(14,165,233,0.3);
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .popular-pulse {
          animation: pulse-badge 2s ease infinite;
        }

        @keyframes pulse-badge {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50% { transform: translate(-50%, 0) scale(1.05); }
        }

        .save-pulse {
          animation: pulse-save 2s ease infinite;
        }

        @keyframes pulse-save {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
};
