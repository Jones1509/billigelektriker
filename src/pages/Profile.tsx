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
import { useTranslation } from "react-i18next";

type Order = Database['public']['Tables']['orders']['Row'];

const getProfileSchema = (t: any) => z.object({
  firstName: z.string().trim().min(1, t('profile.validation.firstNameRequired')).max(50, t('profile.validation.firstNameMax')),
  lastName: z.string().trim().min(1, t('profile.validation.lastNameRequired')).max(50, t('profile.validation.lastNameMax')),
  phone: z.string().trim().max(20, t('profile.validation.phoneMax')).optional(),
});

const getPasswordSchema = (t: any) => z.object({
  currentPassword: z.string().min(1, t('profile.validation.currentPasswordRequired')),
  newPassword: z.string().min(6, t('profile.validation.newPasswordMin')).max(72, t('profile.validation.newPasswordMax')),
  confirmPassword: z.string().min(1, t('profile.validation.confirmPasswordRequired')),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: t('profile.validation.passwordsNotMatch'),
  path: ["confirmPassword"],
});

export default function Profile() {
  const { t } = useTranslation();
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
        toast.error(t('profile.errors.fetchProfile'), {
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
      toast.error(t('profile.errors.fetchOrders'), {
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
      const validatedData = getProfileSchema(t).parse(profileData);

      if (!userId) throw new Error(t('profile.errors.noUserId'));

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          phone: validatedData.phone || null,
        })
        .eq("id", userId);

      if (error) throw error;

      toast.success(t('profile.success.profileUpdated'), {
        description: t('profile.success.profileUpdatedDesc'),
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(t('profile.errors.invalidData'), {
          description: error.errors[0].message,
        });
      } else {
        toast.error(t('profile.errors.updateProfile'), {
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
      const validatedData = getPasswordSchema(t).parse(passwordData);

      // Verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: validatedData.currentPassword,
      });

      if (signInError) {
        toast.error(t('profile.errors.wrongPassword'), {
          description: t('profile.errors.wrongPasswordDesc'),
        });
        setUpdating(false);
        return;
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: validatedData.newPassword,
      });

      if (error) throw error;

      toast.success(t('profile.success.passwordChanged'), {
        description: t('profile.success.passwordChangedDesc'),
      });
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(t('profile.errors.invalidData'), {
          description: error.errors[0].message,
        });
      } else {
        toast.error(t('profile.errors.changePassword'), {
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
    toast.success(t('profile.success.loggedOut'));
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
            <h1 className="text-3xl font-bold mb-2">{t('profile.title')}</h1>
            <p className="text-muted-foreground">{t('profile.subtitle')}</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('profile.tabs.profile')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                {t('profile.tabs.orders')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle>{t('profile.personalInfo.title')}</CardTitle>
                </div>
                <CardDescription>
                  {t('profile.personalInfo.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('profile.personalInfo.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">{t('profile.personalInfo.emailCannotChange')}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">{t('profile.personalInfo.firstName')}</Label>
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
                      <Label htmlFor="lastname">{t('profile.personalInfo.lastName')}</Label>
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
                    <Label htmlFor="phone">{t('profile.personalInfo.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t('profile.personalInfo.phonePlaceholder')}
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={updating}
                    />
                  </div>
                  <Button type="submit" disabled={updating}>
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('profile.personalInfo.saving')}
                      </>
                    ) : (
                      t('profile.personalInfo.saveChanges')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>{t('profile.password.title')}</CardTitle>
                </div>
                <CardDescription>
                  {t('profile.password.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">{t('profile.password.current')}</Label>
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
                    <Label htmlFor="new-password">{t('profile.password.new')}</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder={t('profile.password.newPlaceholder')}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                      disabled={updating}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t('profile.password.confirm')}</Label>
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
                        {t('profile.password.changing')}
                      </>
                    ) : (
                      t('profile.password.changeButton')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('profile.account.title')}</CardTitle>
                <CardDescription>
                  {t('profile.account.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={handleSignOut}>
                  {t('profile.account.logout')}
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
                        <h3 className="text-lg font-semibold mb-2">{t('profile.orders.noOrders')}</h3>
                        <p className="text-muted-foreground">
                          {t('profile.orders.noOrdersDesc')}
                        </p>
                      </div>
                      <Button onClick={() => navigate("/")} variant="outline">
                        {t('profile.orders.startShopping')}
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
                                {t('profile.orders.orderNumber', { number: order.order_number })}
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
                              {order.status === 'completed' ? t('profile.orders.status.completed') :
                               order.status === 'pending' ? t('profile.orders.status.pending') :
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
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('profile.orders.products')}</h4>
                                {order.items.map((item: any, idx: number) => (
                                  <div key={idx} className="flex justify-between text-sm py-1">
                                    <span>{item.title || item.name || t('profile.orders.product')} {item.quantity > 1 && `(${item.quantity}x)`}</span>
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