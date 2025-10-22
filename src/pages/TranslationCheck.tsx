import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { getTranslationCoverage, flattenTranslationKeys } from "@/utils/translationSync";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import daTranslations from "@/i18n/locales/da.json";
import enTranslations from "@/i18n/locales/en.json";
import deTranslations from "@/i18n/locales/de.json";
import frTranslations from "@/i18n/locales/fr.json";

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', translations: enTranslations },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', translations: deTranslations },
  { code: 'fr', name: 'Français', flag: '🇫🇷', translations: frTranslations },
];

export default function TranslationCheck() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const sourceKeys = flattenTranslationKeys(daTranslations);
  const totalKeys = Object.keys(sourceKeys).length;

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Translation Coverage Report</h1>
        <p className="text-muted-foreground text-lg">
          Oversigt over oversættelsesdækning for alle sprog
        </p>
      </div>

      {/* Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>📊 Samlet Status</CardTitle>
          <CardDescription>
            Kilde-sprog: 🇩🇰 Dansk med {totalKeys} nøgler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LANGUAGES.map((lang) => {
              const coverage = getTranslationCoverage(daTranslations, lang.translations);
              const status = 
                coverage.percentage === 100 ? 'complete' :
                coverage.percentage >= 80 ? 'good' :
                coverage.percentage >= 50 ? 'warning' : 'critical';

              return (
                <div key={lang.code} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{lang.flag}</span>
                    <div>
                      <h3 className="font-semibold">{lang.name}</h3>
                      <Badge 
                        variant={
                          status === 'complete' ? 'default' :
                          status === 'good' ? 'secondary' :
                          status === 'warning' ? 'outline' : 'destructive'
                        }
                        className="mt-1"
                      >
                        {coverage.percentage}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>{coverage.translated} oversat</span>
                    </div>
                    {coverage.missing > 0 && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{coverage.missing} mangler</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Missing Keys */}
      {LANGUAGES.map((lang) => {
        const coverage = getTranslationCoverage(daTranslations, lang.translations);
        
        if (coverage.missingKeys.length === 0) {
          return (
            <Card key={lang.code} className="mb-6 border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {lang.flag} {lang.name}
                </CardTitle>
                <CardDescription className="text-green-700">
                  ✅ Alle oversættelser er komplette!
                </CardDescription>
              </CardHeader>
            </Card>
          );
        }

        return (
          <Card key={lang.code} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-orange-600" />
                {lang.flag} {lang.name}
              </CardTitle>
              <CardDescription>
                Manglende oversættelser: {coverage.missingKeys.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {coverage.missingKeys.slice(0, 20).map((key) => (
                  <div key={key} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <code className="text-sm font-mono block truncate">{key}</code>
                      <p className="text-xs text-muted-foreground mt-1">
                        {sourceKeys[key]}
                      </p>
                    </div>
                  </div>
                ))}
                {coverage.missingKeys.length > 20 && (
                  <p className="text-sm text-muted-foreground text-center pt-2">
                    ... og {coverage.missingKeys.length - 20} flere
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
