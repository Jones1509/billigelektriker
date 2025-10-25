import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Check, Zap, Crown, Star, Phone, Mail } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedPackage = searchParams.get('package') as 'standard' | 'premium' | 'exclusive' | null;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    package: preSelectedPackage || "standard",
    customerType: "privat",
    timeSlot: "dag",
    hasSubscription: false,
    taskDescription: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState(510);

  // Base prices
  const basePrices = {
    standard: { privat: 510, erhverv: 550 },
    premium: { privat: 650, erhverv: 700 },
    exclusive: { privat: 850, erhverv: 900 }
  };

  // Time surcharges
  const timeSurcharges = {
    dag: 0,
    aften: 200,
    nat: 600,
    akut: 400
  };

  // Calculate price live
  useEffect(() => {
    const basePrice = basePrices[formData.package as keyof typeof basePrices][formData.customerType as 'privat' | 'erhverv'];
    const surcharge = timeSurcharges[formData.timeSlot as keyof typeof timeSurcharges];
    let calculatedPrice = basePrice + surcharge;
    
    // Apply subscription discount
    if (formData.hasSubscription) {
      calculatedPrice = calculatedPrice * 0.8;
    }
    
    setPrice(Math.round(calculatedPrice));
  }, [formData.package, formData.customerType, formData.timeSlot, formData.hasSubscription]);

  const packageInfo = {
    standard: {
      name: "Standard Service",
      icon: Phone,
      color: "bg-slate-100 text-slate-900"
    },
    premium: {
      name: "Premium Pakke",
      icon: Zap,
      color: "bg-gradient-to-br from-primary to-primary/90 text-white"
    },
    exclusive: {
      name: "Eksklusiv Pakke",
      icon: Crown,
      color: "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement email sending via Supabase edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: price
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send booking');
      }

      toast.success("✓ Booking modtaget!", {
        description: `Tak for din anmodning, ${formData.name}. Vi ringer til dig inden for 2 timer på ${formData.phone}.`,
        position: "top-center",
        duration: 5000
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        package: "standard",
        customerType: "privat",
        timeSlot: "dag",
        hasSubscription: false,
        taskDescription: ""
      });

      // Navigate to confirmation
      setTimeout(() => {
        navigate('/?booking=success');
      }, 2000);

    } catch (error) {
      console.error('Booking error:', error);
      toast.error("Kunne ikke sende booking", {
        description: "Prøv venligst igen eller ring til os på 71 99 71 71",
        position: "top-center"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const CurrentIcon = packageInfo[formData.package as keyof typeof packageInfo].icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-blue-600 to-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="container relative z-10 px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Book Din <span className="text-secondary">El-Service</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/95">
                Udfyld formularen nedenfor og vi ringer til dig inden for 2 timer
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl">
                
                {/* Selected Package Display */}
                <div className={`mb-8 p-6 rounded-xl ${packageInfo[formData.package as keyof typeof packageInfo].color}`}>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <CurrentIcon className="w-8 h-8" />
                      <div>
                        <h3 className="text-xl font-bold">
                          Du har valgt: {packageInfo[formData.package as keyof typeof packageInfo].name}
                        </h3>
                        <p className={`text-sm ${formData.package === 'standard' ? 'text-slate-600' : 'opacity-90'}`}>
                          {basePrices[formData.package as keyof typeof basePrices].privat} kr/time (privat) · {basePrices[formData.package as keyof typeof basePrices].erhverv} kr/time (erhverv)
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/#pakker')}
                      className={formData.package === 'standard' ? '' : 'border-white/30 text-white hover:bg-white/10'}
                    >
                      Skift pakke
                    </Button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Package Selection */}
                  <div>
                    <Label htmlFor="package" className="text-base font-semibold mb-3 block">
                      Vælg pakke
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {Object.entries(packageInfo).map(([key, info]) => (
                        <label
                          key={key}
                          className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.package === key
                              ? 'border-primary bg-primary/5'
                              : 'border-slate-200 hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="package"
                            value={key}
                            checked={formData.package === key}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <info.icon className="w-6 h-6 mb-2 text-primary" />
                          <span className="font-semibold text-sm text-center">{info.name}</span>
                          {formData.package === key && (
                            <Check className="absolute top-2 right-2 w-5 h-5 text-primary" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Customer Type & Time Slot in Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="customerType" className="text-base font-semibold mb-2 block">
                        Kunde type
                      </Label>
                      <select
                        id="customerType"
                        name="customerType"
                        value={formData.customerType}
                        onChange={handleChange}
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="privat">Privat</option>
                        <option value="erhverv">Erhverv</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="timeSlot" className="text-base font-semibold mb-2 block">
                        Tidspunkt
                      </Label>
                      <select
                        id="timeSlot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="dag">Dagtid (07-16)</option>
                        <option value="aften">Aften (16-22)</option>
                        <option value="nat">Nat (22-07)</option>
                        <option value="akut">Akut (samme dag)</option>
                      </select>
                    </div>
                  </div>

                  {/* Subscription Checkbox */}
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <input
                      type="checkbox"
                      id="hasSubscription"
                      name="hasSubscription"
                      checked={formData.hasSubscription}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="hasSubscription" className="text-sm font-medium cursor-pointer">
                      Jeg har et abonnement (-20% rabat)
                    </Label>
                  </div>

                  {/* Live Price Display */}
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Din estimerede timepris</p>
                      <p className="text-5xl font-black text-primary mb-1">{price} kr</p>
                      <p className="text-xs text-muted-foreground">
                        {formData.customerType === 'privat' ? 'Inkl. moms' : 'Ekskl. moms'} · Endelig pris efter besigtigelse
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold">Kontaktinformation</h3>
                    
                    <div>
                      <Label htmlFor="name">Navn *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Dit fulde navn"
                        className="h-12 mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="din@email.dk"
                        className="h-12 mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="12 34 56 78"
                        className="h-12 mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Vej 1, 2000 København"
                        className="h-12 mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="taskDescription">Beskriv din el-opgave *</Label>
                      <Textarea
                        id="taskDescription"
                        name="taskDescription"
                        required
                        value={formData.taskDescription}
                        onChange={handleChange}
                        placeholder="Beskriv kort hvad du skal have lavet. F.eks. 'Skal have installeret 3 stikkontakter i stue'"
                        className="min-h-[120px] mt-2"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full shadow-lg hover:shadow-xl text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sender...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-5 w-5" />
                        Send booking anmodning
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Ved at sende denne formular accepterer du vores behandling af dine data. 
                    Vi ringer til dig inden for 2 timer på hverdage.
                  </p>
                </form>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Vi ringer inden 2 timer</p>
                    <p className="text-xs text-muted-foreground">På hverdage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Check className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Gratis uforpligtende tilbud</p>
                    <p className="text-xs text-muted-foreground">Ingen skjulte omkostninger</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Autoriseret elektriker</p>
                    <p className="text-xs text-muted-foreground">Kvalitet garanteret</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Booking;
