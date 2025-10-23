import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import indoorImage from "@/assets/category-indoor.jpg";
import outdoorImage from "@/assets/category-outdoor.jpg";
import smartHomeImage from "@/assets/category-smart-home.jpg";
import accessoriesImage from "@/assets/category-accessories.jpg";

export const ProductCategories = () => {
  const { t } = useTranslation();
  
  const categories = [
    {
      title: t('productCategories.indoor.title'),
      description: "Skab den perfekte hygge derhjemme",
      link: "/collections/indendors-lys",
      image: indoorImage
    },
    {
      title: t('productCategories.outdoor.title'),
      description: "Robust belysning til have og terrasse",
      link: "/collections/udendors-lys",
      image: outdoorImage
    },
    {
      title: t('productCategories.smartHome.title'),
      description: "Intelligente løsninger til hele hjemmet",
      link: "/collections/smart-home",
      image: smartHomeImage
    },
    {
      title: t('productCategories.accessories.title'),
      description: "Alt du behøver til installationen",
      link: "/collections/tilbehor",
      image: accessoriesImage
    }
  ];

  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-b from-background via-blue-50/30 to-background dark:via-blue-950/10">
      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in px-4">
          <span className="inline-block px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium mb-6 border border-blue-500/30">
            Udforsk Vores Sortiment
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight tracking-tight" style={{ letterSpacing: '-0.5px' }}>
            Lys Der Forvandler Dit Hjem
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Alt fra hyggelig indendørs belysning til robust udendørs lys – samlet ét sted.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0">
          {categories.map((category, idx) => (
            <Link 
              key={idx} 
              to={category.link}
              className="group relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-all duration-500 group-hover:from-black/60 group-hover:via-black/30" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 border border-white/40 backdrop-blur-md text-white text-sm font-semibold transition-all duration-300 group-hover:bg-white/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  Udforsk
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
