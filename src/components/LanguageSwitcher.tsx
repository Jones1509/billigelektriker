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
  { code: 'da', name: 'Dansk', flag: '🇩🇰', countryCode: 'DK' },
  { code: 'en', name: 'English', flag: '🇬🇧', countryCode: 'GB' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', countryCode: 'FR' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', countryCode: 'DE' },
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
          className="relative group text-white hover:text-white backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:scale-105 rounded-lg"
        >
          <Languages className="h-4 w-4 transition-transform group-hover:rotate-12 duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 backdrop-blur-xl bg-background/98 border border-border/50 shadow-xl rounded-xl overflow-hidden p-1.5"
      >
        {languages.map((language) => {
          const isActive = currentLanguage.code === language.code;
          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => !isActive && i18n.changeLanguage(language.code)}
              disabled={isActive}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2 mb-0.5 last:mb-0
                transition-all duration-200 cursor-pointer
                ${isActive 
                  ? 'bg-primary/5 cursor-default' 
                  : 'hover:bg-accent/50'
                }
              `}
            >
              <div className="flex items-center gap-2.5 flex-1">
                <span className="text-xs font-semibold text-muted-foreground/60 w-6">
                  {language.countryCode}
                </span>
                <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                  {language.name}
                </span>
              </div>
              {isActive && (
                <Check className="h-3.5 w-3.5 text-primary animate-in fade-in zoom-in-50 duration-200" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
