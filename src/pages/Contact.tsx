import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tak for din besked!", {
      description: "Vi vender tilbage til dig hurtigst muligt.",
      position: "top-center"
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-20 md:py-28 lg:py-32 bg-gradient-to-br from-primary via-blue-600 to-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="container relative z-10 px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Kontakt <span className="text-secondary">os</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/95">
                Vi er klar til at hjælpe dig – kontakt os i dag for en uforpligtende snak
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6">Send os en besked</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('contact.name')} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.namePlaceholder')}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('contact.email')} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t('contact.phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.phonePlaceholder')}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contact.message')} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.messagePlaceholder')}
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full shadow-lg hover:shadow-xl">
                    {t('contact.sendMessage')}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Kontaktinformation</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Du er altid velkommen til at kontakte os. Vi svarer hurtigst muligt på alle henvendelser.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <p className="text-muted-foreground">+45 XX XX XX XX</p>
                      <p className="text-sm text-muted-foreground mt-1">Man-Fre: 8:00-16:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">kontakt@billigelektriker.dk</p>
                      <p className="text-sm text-muted-foreground mt-1">Vi svarer inden for 24 timer</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Adresse</h3>
                      <p className="text-muted-foreground">København og omegn</p>
                      <p className="text-sm text-muted-foreground mt-1">Vi dækker hele hovedstadsområdet</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <Clock className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Åbningstider</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Mandag - Fredag: 8:00 - 16:00</p>
                        <p>Weekend: Efter aftale</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20">
                  <h3 className="font-semibold mb-2">Akut service?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Har du brug for akut hjælp? Ring til os på telefon, så hjælper vi dig hurtigst muligt.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Ring nu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
