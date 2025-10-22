import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Zap, Loader2, ArrowLeft, Shield, CheckCircle2, Mail, Lock } from "lucide-react";
import { z } from "zod";
import logo from "@/assets/logo.avif";

const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "Fornavn er påkrævet").max(50, "Fornavn må max være 50 tegn"),
  lastName: z.string().trim().min(1, "Efternavn er påkrævet").max(50, "Efternavn må max være 50 tegn"),
  email: z.string().trim().email("Ugyldig email adresse").max(255, "Email må max være 255 tegn"),
  password: z.string().min(6, "Adgangskode skal være mindst 6 tegn").max(72, "Adgangskode må max være 72 tegn"),
});

const signInSchema = z.object({
  email: z.string().trim().email("Ugyldig email adresse"),
  password: z.string().min(1, "Adgangskode er påkrævet"),
});

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/profile");
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === "SIGNED_IN") {
        navigate("/profile");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = signUpSchema.parse(signUpData);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Denne email er allerede registreret", {
            description: "Prøv at logge ind i stedet.",
          });
        } else {
          toast.error("Kunne ikke oprette konto", {
            description: error.message,
          });
        }
      } else {
        toast.success("Velkommen til Billig Elektriker!", {
          description: "Din konto er blevet oprettet.",
        });
        navigate("/profile");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Ugyldige oplysninger", {
          description: error.errors[0].message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = signInSchema.parse(signInData);

      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Forkert email eller adgangskode", {
            description: "Tjek dine oplysninger og prøv igen.",
          });
        } else {
          toast.error("Kunne ikke logge ind", {
            description: error.message,
          });
        }
      } else {
        toast.success("Velkommen tilbage!");
        navigate("/profile");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Ugyldige oplysninger", {
          description: error.errors[0].message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 animate-gradient-shift" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.15),transparent_50%)]" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-all hover:gap-3 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Tilbage til forsiden</span>
          </Link>
          
          <Card className="w-full backdrop-blur-xl bg-card/95 border-border/50 shadow-2xl">
            <CardHeader className="text-center pb-6 space-y-4">
              <Link to="/" className="flex justify-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all" />
                  <img 
                    src={logo} 
                    alt="Billig Elektriker" 
                    className="relative h-16 w-auto group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Velkommen
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Opret en konto eller log ind for at komme i gang
                </CardDescription>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Sikker login</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  <span>Gratis at oprette</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
                  <TabsTrigger 
                    value="signin" 
                    className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
                  >
                    Log ind
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
                  >
                    Opret konto
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="mt-6 animate-in fade-in-50 duration-300">
                  <form onSubmit={handleSignIn} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-sm font-medium">
                        Email adresse
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="din@email.dk"
                          value={signInData.email}
                          onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                          required
                          disabled={loading}
                          className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="text-sm font-medium">
                        Adgangskode
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          value={signInData.password}
                          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                          required
                          disabled={loading}
                          className="pl-10 h-11 bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all"
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logger ind...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Log ind
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="mt-6 animate-in fade-in-50 duration-300">
                  <form onSubmit={handleSignUp} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstname" className="text-sm font-medium">
                          Fornavn
                        </Label>
                        <Input
                          id="firstname"
                          type="text"
                          placeholder="Anders"
                          value={signUpData.firstName}
                          onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                          required
                          disabled={loading}
                          className="h-11 bg-background/50 border-border/50 focus:border-secondary focus:bg-background transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastname" className="text-sm font-medium">
                          Efternavn
                        </Label>
                        <Input
                          id="lastname"
                          type="text"
                          placeholder="Jensen"
                          value={signUpData.lastName}
                          onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                          required
                          disabled={loading}
                          className="h-11 bg-background/50 border-border/50 focus:border-secondary focus:bg-background transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">
                        Email adresse
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="din@email.dk"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                          required
                          disabled={loading}
                          className="pl-10 h-11 bg-background/50 border-border/50 focus:border-secondary focus:bg-background transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">
                        Adgangskode
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Mindst 6 tegn"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                          required
                          disabled={loading}
                          className="pl-10 h-11 bg-background/50 border-border/50 focus:border-secondary focus:bg-background transition-all"
                        />
                      </div>
                      {signUpData.password.length > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <div className={`h-1 flex-1 rounded-full transition-all ${
                            signUpData.password.length < 6 ? 'bg-destructive/30' :
                            signUpData.password.length < 10 ? 'bg-yellow-500/50' :
                            'bg-secondary/50'
                          }`} />
                          <span className="text-muted-foreground">
                            {signUpData.password.length < 6 ? 'Svag' :
                             signUpData.password.length < 10 ? 'Middel' :
                             'Stærk'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="rounded-lg bg-secondary/5 border border-secondary/20 p-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Ved at oprette en konto accepterer du vores betingelser og får adgang til eksklusive tilbud og hurtigere booking.
                        </p>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Opretter konto...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Opret gratis konto
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}