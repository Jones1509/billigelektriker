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
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
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
              className="package-card group flex flex-col relative bg-white rounded-[20px] transition-all duration-300 animate-fade-in"
              style={{ 
                border: '2px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                padding: '40px 32px',
                animationDelay: `${idx * 100}ms`
              }}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span 
                    className="inline-block px-6 py-2 rounded-2xl text-xs font-bold uppercase tracking-wide text-white"
                    style={{
                      background: 'linear-gradient(90deg, #FFB800 0%, #FF8800 100%)',
                      boxShadow: '0 4px 12px rgba(255,184,0,0.3)'
                    }}
                  >
                    {t('starterPackages.mostPopular')}
                  </span>
                </div>
              )}
              
              <div className="relative text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-5 text-[#1E293B]">{pkg.name}</h3>
                
                {/* Clean solid price */}
                <div className="mb-4">
                  <span className="text-5xl md:text-6xl font-black text-[#0EA5E9]">
                    {pkg.price}
                  </span>
                  <span className="text-2xl font-medium text-[#64748B] align-top ml-2">
                    kr.
                  </span>
                </div>
                
                <p className="text-sm md:text-base italic text-[#64748B] leading-relaxed max-w-xs mx-auto">
                  {pkg.description}
                </p>
              </div>

              {/* Clean separator */}
              <div className="w-4/5 h-px bg-[#E2E8F0] mx-auto mb-8"></div>

              <div className="relative flex-grow">
                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#94A3B8] mb-5">
                  {t('starterPackages.includes')}
                </p>
                <ul className="space-y-3 mb-7">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#0EA5E9]"
                      >
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm md:text-base font-medium text-[#475569] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-5 mt-7 border-t border-[#E2E8F0]">
                  <p className="text-sm italic text-center text-[#64748B]">
                    {pkg.perfectFor}
                  </p>
                </div>
              </div>

              <div className="relative pt-7 flex flex-col items-center">
                <Button 
                  className={`w-full h-[52px] text-base md:text-lg font-bold rounded-xl transition-all duration-200 ${
                    pkg.popular 
                      ? 'bg-[#0EA5E9] hover:bg-[#0284C7] text-white hover:scale-[1.02]' 
                      : 'bg-transparent text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white border-2 border-[#0EA5E9]'
                  }`}
                  style={pkg.popular ? {
                    boxShadow: '0 4px 12px rgba(14,165,233,0.25)'
                  } : {}}
                >
                  {t('starterPackages.cta')}
                </Button>
                <p className="text-xs text-[#94A3B8] mt-2.5 text-center">
                  {t('starterPackages.vatIncluded')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .package-card:hover {
          border-color: #0EA5E9;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
};
