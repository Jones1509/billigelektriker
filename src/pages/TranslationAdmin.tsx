import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Languages, Download, Upload, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { translateObject, getTranslationCoverage, TranslationProgress } from "@/utils/translationSync";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import daTranslations from "@/i18n/locales/da.json";
import enTranslations from "@/i18n/locales/en.json";
import deTranslations from "@/i18n/locales/de.json";
import frTranslations from "@/i18n/locales/fr.json";

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function TranslationAdmin() {
  const [translating, setTranslating] = useState(false);
  const [progress, setProgress] = useState<TranslationProgress>({
    total: 0,
    completed: 0,
    current: '',
    status: 'idle',
  });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to access the admin panel",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }

        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (roleError || !roleData) {
          toast({
            title: "Unauthorized Access",
            description: "You don't have permission to access this page",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const getTranslationFile = (langCode: string) => {
    switch (langCode) {
      case 'en': return enTranslations;
      case 'de': return deTranslations;
      case 'fr': return frTranslations;
      default: return {};
    }
  };

  const getCoverageStats = () => {
    return SUPPORTED_LANGUAGES.map(lang => ({
      ...lang,
      coverage: getTranslationCoverage(daTranslations, getTranslationFile(lang.code)),
    }));
  };

  const handleTranslateAll = async () => {
    setTranslating(true);
    const results: Record<string, any> = {};

    try {
      for (const lang of SUPPORTED_LANGUAGES) {
        setProgress({
          total: SUPPORTED_LANGUAGES.length,
          completed: 0,
          current: `Translating to ${lang.name}...`,
          status: 'translating',
        });

        const translated = await translateObject(
          daTranslations,
          lang.code,
          'da',
          (langProgress) => {
            setProgress({
              ...langProgress,
              current: `${lang.flag} ${lang.name}: ${langProgress.current}`,
            });
          }
        );

        results[lang.code] = translated;

        // Small delay between languages
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setProgress({
        total: SUPPORTED_LANGUAGES.length,
        completed: SUPPORTED_LANGUAGES.length,
        current: '',
        status: 'complete',
      });

      toast({
        title: "✅ Oversættelse fuldført!",
        description: "Alle sprog er blevet opdateret. Download JSON filerne nedenfor.",
      });

      // Auto-download all translation files
      for (const [langCode, content] of Object.entries(results)) {
        downloadTranslationFile(langCode, content);
      }

    } catch (error) {
      console.error('Translation error:', error);
      setProgress({
        ...progress,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      
      toast({
        title: "❌ Oversættelsesfejl",
        description: "Der opstod en fejl under oversættelsen. Prøv igen.",
        variant: "destructive",
      });
    } finally {
      setTranslating(false);
    }
  };

  const downloadTranslationFile = (langCode: string, content: any) => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${langCode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Checking authorization...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const stats = getCoverageStats();
  const progressPercentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Languages className="w-10 h-10" />
          Translation Manager
        </h1>
        <p className="text-muted-foreground text-lg">
          Automatisk oversættelse af hele hjemmesiden med AI
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.code} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-3xl">{stat.flag}</span>
                {stat.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dækning</span>
                  <span className="font-bold text-lg">{stat.coverage.percentage}%</span>
                </div>
                <Progress value={stat.coverage.percentage} className="h-2" />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>{stat.coverage.translated} oversat</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-600">
                    <AlertCircle className="w-3 h-3" />
                    <span>{stat.coverage.missing} mangler</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Translation Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Automatisk Oversættelse</CardTitle>
          <CardDescription>
            Oversæt automatisk alle tekster fra dansk til alle understøttede sprog med AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {translating && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{progress.current}</span>
                <span className="font-semibold">
                  {progress.completed} / {progress.total}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleTranslateAll}
              disabled={translating}
              size="lg"
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              {translating ? 'Oversætter...' : 'Oversæt alle sprog'}
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download oversættelser
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[{ code: 'da', name: 'Dansk', flag: '🇩🇰' }, ...SUPPORTED_LANGUAGES].map((lang) => (
                <Button
                  key={lang.code}
                  variant="outline"
                  size="sm"
                  onClick={() => downloadTranslationFile(lang.code, getTranslationFile(lang.code))}
                >
                  {lang.flag} {lang.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">📋 Sådan bruges Translation Manager</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3">
            <span className="font-bold text-primary">1.</span>
            <p>Klik på "Oversæt alle sprog" for at starte automatisk oversættelse</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-primary">2.</span>
            <p>AI oversætter automatisk alle tekster til alle sprog (dette tager et par minutter)</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-primary">3.</span>
            <p>De oversatte filer downloades automatisk som JSON</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-primary">4.</span>
            <p>Erstat filerne i <code className="bg-background px-2 py-1 rounded">src/i18n/locales/</code></p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-primary">5.</span>
            <p>✅ Færdig! Alle oversættelser er nu opdateret</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
