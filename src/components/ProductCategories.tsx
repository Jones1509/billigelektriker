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
          <span className="inline-block px-6 py-2.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-900">
            Udforsk Vores Sortiment
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Find Det Rigtige Lys Til Dit Projekt
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Fra indendørs hygge til robust udendørs belysning – vi har det hele.
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
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Se mere
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
