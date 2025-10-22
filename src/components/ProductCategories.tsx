import { Card, CardContent } from "./ui/card";
import { Home, Sun, Lightbulb, Plug } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ProductCategories = () => {
  const { t } = useTranslation();
  
  const categories = [
    {
      icon: Home,
      title: t('productCategories.indoor.title'),
      description: t('productCategories.indoor.description'),
      link: "/collections/indendors-lys",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Sun,
      title: t('productCategories.outdoor.title'),
      description: t('productCategories.outdoor.description'),
      link: "/collections/udendors-lys",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: Lightbulb,
      title: t('productCategories.smartHome.title'),
      description: t('productCategories.smartHome.description'),
      link: "/collections/smart-home",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Plug,
      title: t('productCategories.accessories.title'),
      description: t('productCategories.accessories.description'),
      link: "/collections/tilbehor",
      gradient: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section 
      className="py-8 md:py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--blue-tint)) 50%, hsl(var(--background)) 100%)' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-8 md:mb-10 animate-fade-in px-4">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {t('productCategories.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('productCategories.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('productCategories.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0">
          {categories.map((category, idx) => (
            <Link key={idx} to={category.link}>
              <Card className="group h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 overflow-hidden animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                     style={{ backgroundImage: `linear-gradient(135deg, ${category.gradient.split(' ')[1]} 0%, ${category.gradient.split(' ')[2]} 100%)`, opacity: 0.05 }} />
                <CardContent className="relative p-6 md:p-10 flex flex-col items-center text-center space-y-3 md:space-y-4">
                  <div className={`p-4 md:p-6 bg-gradient-to-br ${category.gradient} rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <category.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">{category.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors">{category.description}</p>
                  <div className="pt-2 flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('productCategories.cta')}
                    <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
