import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Loader2, User, Lock, ShoppingBag, Package, Calendar, CreditCard } from "lucide-react";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

type Order = Database['public']['Tables']['orders']['Row'];

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "Fornavn er påkrævet").max(50, "Fornavn må max være 50 tegn"),
  lastName: z.string().trim().min(1, "Efternavn er påkrævet").max(50, "Efternavn må max være 50 tegn"),
  phone: z.string().trim().max(20, "Telefonnummer må max være 20 tegn").optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Nuværende adgangskode er påkrævet"),
  newPassword: z.string().min(6, "Ny adgangskode skal være mindst 6 tegn").max(72, "Adgangskode må max være 72 tegn"),
  confirmPassword: z.string().min(1, "Bekræft din nye adgangskode"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Adgangskoderne matcher ikke",
  path: ["confirmPassword"],
});

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }

        setUserId(session.user.id);
        setEmail(session.user.email || "");

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProfileData({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            phone: data.phone || "",
          });
        }
      } catch (error: any) {
        toast.error("Kunne ikke hente profil", {
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    getProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchOrders = async () => {
    if (!userId) return;
    
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error: any) {
      toast.error("Kunne ikke hente ordrer", {
        description: error.message,
      });
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const validatedData = profileSchema.parse(profileData);

      if (!userId) throw new Error("Ingen bruger ID");

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          phone: validatedData.phone || null,
        })
        .eq("id", userId);

      if (error) throw error;

      toast.success("Profil opdateret!", {
        description: "Dine oplysninger er blevet gemt.",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error("Ugyldige oplysninger", {
          description: error.errors[0].message,
        });
      } else {
        toast.error("Kunne ikke opdatere profil", {
          description: error.message,
        });
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const validatedData = passwordSchema.parse(passwordData);

      // Verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: validatedData.currentPassword,
      });

      if (signInError) {
        toast.error("Forkert nuværende adgangskode", {
          description: "Tjek din adgangskode og prøv igen.",
        });
        setUpdating(false);
        return;
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: validatedData.newPassword,
      });

      if (error) throw error;

      toast.success("Adgangskode ændret!", {
        description: "Din nye adgangskode er nu aktiv.",
      });
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error("Ugyldige oplysninger", {
          description: error.errors[0].message,
        });
      } else {
        toast.error("Kunne ikke ændre adgangskode", {
          description: error.message,
        });
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Du er nu logget ud");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Min Profil</h1>
            <p className="text-muted-foreground">Administrer dine kontooplysninger og indstillinger</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Mine Ordrer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle>Personlige oplysninger</CardTitle>
                </div>
                <CardDescription>
                  Opdater dine personlige oplysninger her
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email kan ikke ændres</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">Fornavn</Label>
                      <Input
                        id="firstname"
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        required
                        disabled={updating}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Efternavn</Label>
                      <Input
                        id="lastname"
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        required
                        disabled={updating}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon (valgfrit)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+45 12 34 56 78"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={updating}
                    />
                  </div>
                  <Button type="submit" disabled={updating}>
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gemmer...
                      </>
                    ) : (
                      "Gem ændringer"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Skift adgangskode</CardTitle>
                </div>
                <CardDescription>
                  Opdater din adgangskode for at holde din konto sikker
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Nuværende adgangskode</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                      disabled={updating}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Ny adgangskode</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Mindst 6 tegn"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      disabled={updating}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Bekræft ny adgangskode</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                      disabled={updating}
                    />
                  </div>
                  <Button type="submit" disabled={updating}>
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Ændrer...
                      </>
                    ) : (
                      "Skift adgangskode"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Konto handlinger</CardTitle>
                <CardDescription>
                  Log ud eller administrer din konto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={handleSignOut}>
                  Log ud
                </Button>
              </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              {loadingOrders ? (
                <Card>
                  <CardContent className="py-12 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </CardContent>
                </Card>
              ) : orders.length === 0 ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Ingen ordrer endnu</h3>
                        <p className="text-muted-foreground">
                          Når du placerer en ordre, vil den blive vist her.
                        </p>
                      </div>
                      <Button onClick={() => navigate("/")} variant="outline">
                        Start med at handle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/30 border-b">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            <div>
                              <CardTitle className="text-base">
                                Ordre #{order.order_number}
                              </CardTitle>
                              <CardDescription className="text-xs mt-1">
                                {order.shopify_order_number && (
                                  <span className="mr-2">Shopify #{order.shopify_order_number}</span>
                                )}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className={`px-3 py-1 rounded-full font-medium ${
                              order.status === 'completed' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                              order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' :
                              'bg-gray-500/10 text-gray-700 dark:text-gray-400'
                            }`}>
                              {order.status === 'completed' ? 'Gennemført' :
                               order.status === 'pending' ? 'Afventer' :
                               order.status}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(order.created_at).toLocaleDateString('da-DK', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                            <div className="flex items-center gap-2 font-semibold text-lg">
                              <CreditCard className="h-5 w-5 text-primary" />
                              {order.total_amount.toFixed(2)} {order.currency_code}
                            </div>
                          </div>
                          
                          {order.items && Array.isArray(order.items) && order.items.length > 0 && (
                            <div>
                              <Separator className="my-3" />
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Produkter:</h4>
                                {order.items.map((item: any, idx: number) => (
                                  <div key={idx} className="flex justify-between text-sm py-1">
                                    <span>{item.title || item.name || 'Produkt'} {item.quantity > 1 && `(${item.quantity}x)`}</span>
                                    <span className="text-muted-foreground">
                                      {item.price ? `${parseFloat(item.price).toFixed(2)} ${order.currency_code}` : ''}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}