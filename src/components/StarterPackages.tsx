import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export const StarterPackages = () => {
  const { t } = useTranslation();
  
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

  return (
    <section 
      className="py-10 md:py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--blue-tint)) 100%)' }}
    >
      {/* Top fade removed - gradient spacer handles this */}
      <div className="container relative z-10">
        <div className="text-center mb-8 px-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1E293B]">
            Smart-Lys Pakker med Installation
          </h2>
          <p className="text-base text-[#64748B] max-w-2xl mx-auto">
            Inkluderer bridge, installation og opsætning af certificeret elektriker.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 px-4 md:px-0">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className="package-card group flex flex-col relative bg-white rounded-2xl transition-all duration-200 animate-fade-in"
              style={{ 
                border: pkg.popular ? '3px solid #0EA5E9' : '2px solid #E2E8F0',
                boxShadow: pkg.popular 
                  ? '0 8px 24px rgba(14,165,233,0.15)' 
                  : '0 4px 16px rgba(0,0,0,0.06)',
                padding: '32px 28px',
                maxHeight: '650px',
                animationDelay: `${idx * 100}ms`
              }}
            >
              {/* Simple popular badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span 
                    className="inline-block px-5 py-2 rounded-2xl text-xs font-bold uppercase tracking-wide text-white bg-[#0EA5E9]"
                  >
                    Mest Populære
                  </span>
                </div>
              )}
              
              <div className="relative text-center mb-6">
                <h3 className="text-2xl font-bold mb-4 text-[#1E293B]">
                  {pkg.name}
                </h3>
                
                {/* Clean solid price */}
                <div className="mb-3">
                  <span className="text-5xl font-black text-[#0EA5E9]">
                    {pkg.price}
                  </span>
                  <span className="text-xl font-medium text-[#64748B] align-top ml-2">
                    kr.
                  </span>
                </div>
                
                <p className="text-sm italic text-[#64748B] leading-relaxed max-w-xs mx-auto">
                  {pkg.description}
                </p>
              </div>

              {/* Simple separator */}
              <div className="w-4/5 h-px bg-[#E2E8F0] mx-auto mb-6"></div>

              <div className="relative flex-grow">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-4">
                  Indeholder:
                </p>
                <ul className="space-y-2.5 mb-5">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#0EA5E9]">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium text-[#475569] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 mt-5 border-t border-[#E2E8F0]">
                  <p className="text-sm italic text-center text-[#64748B]">
                    {pkg.perfectFor}
                  </p>
                </div>
              </div>

              <div className="relative pt-6 flex flex-col items-center">
                <Button 
                  className={`w-full h-12 text-base font-bold rounded-xl transition-all duration-200 ${
                    pkg.popular 
                      ? 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white' 
                      : 'bg-transparent text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white border-2 border-[#0EA5E9]'
                  }`}
                  style={pkg.popular ? {
                    boxShadow: '0 4px 12px rgba(14,165,233,0.2)'
                  } : {}}
                >
                  Køb nu
                </Button>
                <p className="text-xs text-[#94A3B8] mt-2 text-center">
                  Inkl. moms
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .package-card:hover {
          border-color: #0EA5E9;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};
