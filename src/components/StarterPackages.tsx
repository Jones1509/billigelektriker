import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

export const StarterPackages = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.package-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}></div>
      </div>

      {/* Radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)]"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-16 px-4">
          <span className="inline-block px-6 py-2 rounded-full text-xs uppercase font-bold tracking-[2px] mb-6 backdrop-blur-md"
            style={{
              background: 'rgba(255,184,0,0.15)',
              border: '1px solid rgba(255,184,0,0.4)',
              color: '#FFB800'
            }}
          >
            {t('starterPackages.badge')}
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white" style={{ 
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            letterSpacing: '-0.5px'
          }}>
            {t('starterPackages.title')}
          </h2>
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed" style={{ 
            color: 'rgba(255,255,255,0.7)' 
          }}>
            {t('starterPackages.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className="package-card group flex flex-col relative overflow-hidden rounded-3xl transition-all duration-500 opacity-0 translate-y-8"
              style={{ 
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                minHeight: '600px',
                animationDelay: `${idx * 200}ms`
              }}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div 
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    transform: 'skewX(-20deg)'
                  }}
                ></div>
              </div>

              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span 
                    className="inline-block px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
                    style={{
                      background: 'linear-gradient(90deg, #FFB800 0%, #FF8800 100%)',
                      color: '#1E293B',
                      boxShadow: '0 4px 16px rgba(255,184,0,0.4)',
                      letterSpacing: '1px'
                    }}
                  >
                    {t('starterPackages.mostPopular')}
                  </span>
                </div>
              )}
              
              <div className="relative text-center pt-10 pb-6 px-6">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{pkg.name}</h3>
                
                {/* Premium gradient price */}
                <div className="mb-4">
                  <span 
                    className="text-6xl md:text-7xl font-black inline-block animate-pulse"
                    style={{ 
                      background: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-2px',
                      animationDuration: '3s'
                    }}
                  >
                    {pkg.price}
                  </span>
                  <span className="text-2xl md:text-3xl font-medium align-top ml-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    kr.
                  </span>
                </div>
                
                <p className="text-base italic leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {pkg.description}
                </p>
              </div>

              {/* Elegant separator */}
              <div className="w-3/5 h-px mx-auto my-8" style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
              }}></div>

              <div className="relative flex-grow px-8">
                <p className="text-xs font-semibold uppercase tracking-[2px] mb-5 pl-0" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {t('starterPackages.includes')}
                </p>
                <ul className="space-y-3.5 mb-8">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: 'linear-gradient(135deg, #0EA5E9, #8B5CF6)',
                          boxShadow: '0 2px 8px rgba(14,165,233,0.3)'
                        }}
                      >
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 mt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="text-sm italic text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {pkg.perfectFor}
                  </p>
                </div>
              </div>

              <div className="relative pt-8 px-8 pb-8 flex flex-col items-center">
                <Button 
                  className={`w-full h-14 text-base font-bold rounded-2xl transition-all duration-300 hover:scale-105 ${
                    pkg.popular 
                      ? 'text-white border-0' 
                      : 'bg-transparent text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white'
                  }`}
                  style={pkg.popular ? {
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
                    boxShadow: '0 4px 20px rgba(14,165,233,0.4)'
                  } : {
                    border: '2px solid #0EA5E9'
                  }}
                >
                  {t('starterPackages.cta')}
                </Button>
                <p className="text-xs mt-3 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {t('starterPackages.vatIncluded')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .package-card.animate-in {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .package-card:hover {
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-8px);
          box-shadow: 0 12px 48px rgba(0,0,0,0.6), 0 0 40px rgba(14,165,233,0.2);
        }
      `}</style>
    </section>
  );
};
