import { Languages, Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next";

const languages = [
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative group text-white hover:text-white backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:scale-105 rounded-xl"
        >
          <Languages className="h-5 w-5 transition-transform group-hover:rotate-12 duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 backdrop-blur-xl bg-background/95 border-2 shadow-2xl rounded-2xl overflow-hidden p-2"
      >
        {languages.map((language) => {
          const isActive = currentLanguage.code === language.code;
          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => i18n.changeLanguage(language.code)}
              className={`
                flex items-center gap-3 cursor-pointer rounded-xl px-4 py-3 mb-1 last:mb-0
                transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm' 
                  : 'hover:bg-accent/50 border border-transparent'
                }
              `}
            >
              <span className="text-2xl transition-transform duration-200 hover:scale-110">
                {language.flag}
              </span>
              <span className={`font-semibold flex-1 ${isActive ? 'text-primary' : ''}`}>
                {language.name}
              </span>
              {isActive && (
                <Check className="h-4 w-4 text-primary animate-in zoom-in-50 duration-200" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
