import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar, CheckCircle2, Phone, Send, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Navn skal være mindst 2 tegn").max(100, "Navn må højst være 100 tegn"),
  email: z.string().email("Ugyldig email adresse").max(255, "Email må højst være 255 tegn"),
  phone: z.string().min(8, "Telefonnummer skal være mindst 8 cifre").max(20, "Telefonnummer må højst være 20 cifre"),
  message: z.string().min(10, "Besked skal være mindst 10 tegn").max(1000, "Besked må højst være 1000 tegn"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ConsultationSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual edge function when ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Contact form submitted:", data);
      
      toast.success("Tak! Vi kontakter dig inden for 24 timer.", {
        description: "Vi har modtaget din forespørgsel og vender tilbage hurtigst muligt."
      });
      
      reset();
    } catch (error) {
      toast.error("Noget gik galt", {
        description: "Ring til os på 71 99 71 71"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-slate-50/50">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT SIDE - Content */}
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Professionel Rådgivning
              </span>
            </div>
            
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[42px] font-extrabold text-foreground leading-tight">
              Vi Hjælper Dig Med Den Rigtige Løsning
            </h2>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              Book en gratis rådgivning med vores certificerede elektrikere. 
              Vi hjælper dig med alt fra fejlfinding til smart home-installationer.
            </p>
            
            {/* Features */}
            <div className="flex flex-col gap-4 my-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-base font-semibold text-foreground">
                  Certificerede elektrikere
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-base font-semibold text-foreground">
                  Ingen forpligtelser
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-base font-semibold text-foreground">
                  Svar samme dag
                </span>
              </div>
            </div>
            
            {/* Guide til form */}
            <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-lg">
              <p className="text-base font-semibold text-foreground">
                📝 Udfyld formularen til højre for at booke
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Vi kontakter dig inden for 24 timer
              </p>
            </div>
            
            {/* Phone Box */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 border border-primary/10 rounded-2xl">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-3">
                Har du det travlt? Ring nu:
              </p>
              <a 
                href="tel:71997171" 
                className="inline-flex items-center gap-3 text-3xl font-extrabold text-primary hover:text-primary/80 transition-all hover:translate-x-1"
              >
                <Phone className="w-7 h-7" />
                71 99 71 71
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                Tilgængelig mandag-fredag 8-17
              </p>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>✓ Ingen forpligtelser</span>
              <span>✓ Gratis rådgivning</span>
              <span>✓ 24/7 nødservice</span>
            </div>
          </div>
          
          {/* RIGHT SIDE - Contact Form Card */}
          <div className="lg:sticky lg:top-24 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-2xl">
              {/* Card Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Book Din Gratis Rådgivning
                </h3>
                <p className="text-muted-foreground">
                  Få svar inden for 24 timer
                </p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...register("name")}
                    type="text"
                    placeholder="Dit fulde navn"
                    className="h-12 bg-muted/50 border-2 focus:bg-background transition-colors"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Din email"
                    className="h-12 bg-muted/50 border-2 focus:bg-background transition-colors"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    {...register("phone")}
                    type="tel"
                    placeholder="Dit telefonnummer"
                    className="h-12 bg-muted/50 border-2 focus:bg-background transition-colors"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <Textarea
                    {...register("message")}
                    placeholder="Beskriv kort dit projekt eller problem"
                    rows={4}
                    className="bg-muted/50 border-2 focus:bg-background transition-colors resize-y"
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 gap-2 text-base font-bold shadow-lg hover:shadow-xl transition-all mt-6"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sender..." : "Send Forespørgsel"}
                </Button>
              </form>
              
              {/* Privacy text */}
              <p className="text-center text-sm text-muted-foreground mt-6">
                🔒 Dine oplysninger behandles fortroligt
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
