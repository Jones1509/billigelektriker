import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CheckCircle2, Phone, Send, Zap } from "lucide-react";
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
    <section className="relative w-full py-16 overflow-hidden bg-white" style={{ marginTop: 0 }}>
      <div className="relative max-w-[1300px] mx-auto px-10">
        <div className="grid grid-cols-1 gap-16 items-stretch lg:grid-cols-[1.3fr_1fr] lg:gap-20" style={{ gridAutoRows: '1fr' }}>
          {/* LEFT SIDE - Content */}
          <div className="flex flex-col gap-5 h-full justify-between">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 bg-primary/8 border border-primary/15 rounded-full">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                Eksperthjælp Fra Certificerede Elektrikere
              </span>
            </div>
            
            {/* Heading */}
            <h2 className="text-4xl font-extrabold text-slate-900 leading-[1.15]">
              Få Professionel Rådgivning – 100% Gratis & Uforpligtende
            </h2>
            
            {/* Description */}
            <p className="text-base text-slate-600 leading-relaxed">
              Hos Billig Elektriker får du kvalificeret hjælp fra autoriserede fagfolk med over 15 års erfaring. Vi håndterer alt fra akutte fejl til komplette smart home-installationer – altid til fair priser.
            </p>
            
            {/* Features */}
            <div className="flex flex-col gap-3 my-1">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 flex-shrink-0" />
                <span className="text-[15px] font-medium text-slate-800">
                  Certificerede & forsikrede elektrikere
                </span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 flex-shrink-0" />
                <span className="text-[15px] font-medium text-slate-800">
                  Fast-pris tilbud uden skjulte gebyrer
                </span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500 flex-shrink-0" />
                <span className="text-[15px] font-medium text-slate-800">
                  Svar inden 2 timer på hverdage
                </span>
              </div>
            </div>
            
            {/* Guide til form */}
            <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-l-[3px] border-primary rounded-lg">
              <p className="text-sm font-semibold text-slate-700">
                📋 Beskriv dit projekt i formularen → Vi vender tilbage med et skræddersyet tilbud
              </p>
            </div>
            
            {/* Phone Box */}
            <div className="p-6 bg-gradient-to-br from-white to-slate-50 border-2 border-primary/20 rounded-xl mt-auto shadow-sm">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">
                🚨 Akut behov for elektriker?
              </p>
              <a 
                href="tel:71997171" 
                className="flex items-center gap-2.5 text-[28px] font-extrabold text-primary hover:text-primary/80 transition-colors w-fit"
              >
                <Phone className="w-6 h-6" />
                71 99 71 71
              </a>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Ring nu – Vi tager telefonen man-fre kl. 8-17
              </p>
            </div>
          </div>
          
          {/* RIGHT SIDE - Contact Form Card */}
          <div className="h-full flex flex-col">
            <div className="bg-white border border-slate-200 rounded-2xl px-7 py-9 shadow-lg h-full flex flex-col justify-between w-full max-w-[480px] mx-auto lg:ml-auto lg:mr-0">
              {/* Card Header */}
              <div className="text-center mb-7">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Få Dit Gratis Tilbud Nu
                </h3>
                <p className="text-xs text-slate-500">
                  Udfyld formularen – vi svarer inden 2 timer
                </p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1 flex flex-col justify-center">
                <div>
                  <Input
                    {...register("name")}
                    type="text"
                    placeholder="Dit fulde navn"
                    className="h-10 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-[3px] focus:ring-primary/8 transition-all rounded-[10px] text-[13px]"
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
                    className="h-10 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-[3px] focus:ring-primary/8 transition-all rounded-[10px] text-[13px]"
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
                    className="h-10 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-[3px] focus:ring-primary/8 transition-all rounded-[10px] text-[13px]"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>
                
                <div>
                  <Textarea
                    {...register("message")}
                    placeholder="Beskriv kort dit projekt eller behov..."
                    rows={3}
                    className="bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-[3px] focus:ring-primary/8 transition-all resize-y min-h-[80px] rounded-[10px] text-[13px]"
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2.5 h-11 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-[10px] transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sender..." : "Send Forespørgsel"}
                </button>
              </form>
              
              {/* Privacy text */}
              <div className="text-center mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2">
                  🔒 Dine oplysninger behandles 100% fortroligt
                </p>
                <p className="text-[11px] text-slate-400">
                  Vi deler aldrig dine data med tredjepart
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
