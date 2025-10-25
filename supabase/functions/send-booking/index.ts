import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  package: string;
  customerType: string;
  timeSlot: string;
  hasSubscription: boolean;
  taskDescription: string;
  estimatedPrice: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingRequest = await req.json();

    console.log("Received booking request:", bookingData);

    const packageNames = {
      standard: "Standard Service",
      premium: "Premium Pakke",
      exclusive: "Eksklusiv Pakke"
    };

    const timeSlotLabels = {
      dag: "Dagtid (07-16)",
      aften: "Aften (16-22)",
      nat: "Nat (22-07)",
      akut: "Akut (samme dag)"
    };

    const customerTypeLabel = bookingData.customerType === "privat" ? "Privat" : "Erhverv";

    // Send email to business using Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      throw new Error("Email service not configured");
    }

    // Email to business
    const businessEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Billig Elektriker <onboarding@resend.dev>",
        to: ["kontakt@billigelektriker.dk"], // Change to actual business email
        subject: `NY BOOKING - ${packageNames[bookingData.package as keyof typeof packageNames]} - ${bookingData.name}`,
        html: `
          <h1>NY BOOKING ANMODNING</h1>
          
          <h2>Pakke Information</h2>
          <ul>
            <li><strong>Pakke:</strong> ${packageNames[bookingData.package as keyof typeof packageNames]}</li>
            <li><strong>Kunde type:</strong> ${customerTypeLabel}</li>
            <li><strong>Tidspunkt:</strong> ${timeSlotLabels[bookingData.timeSlot as keyof typeof timeSlotLabels]}</li>
            <li><strong>Abonnement:</strong> ${bookingData.hasSubscription ? "Ja (-20%)" : "Nej"}</li>
            <li><strong>Estimeret timepris:</strong> ${bookingData.estimatedPrice} kr</li>
          </ul>

          <h2>Kunde Information</h2>
          <ul>
            <li><strong>Navn:</strong> ${bookingData.name}</li>
            <li><strong>Email:</strong> ${bookingData.email}</li>
            <li><strong>Telefon:</strong> ${bookingData.phone}</li>
            <li><strong>Adresse:</strong> ${bookingData.address}</li>
          </ul>

          <h2>Opgave Beskrivelse</h2>
          <p>${bookingData.taskDescription}</p>

          <hr>
          <p><strong>VIGTIGT:</strong> Ring til kunde på ${bookingData.phone} inden for 2 timer for at bekræfte tid og give præcis pris.</p>
        `,
      }),
    });

    if (!businessEmailResponse.ok) {
      const error = await businessEmailResponse.text();
      console.error("Failed to send business email:", error);
      throw new Error("Failed to send email to business");
    }

    // Confirmation email to customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Billig Elektriker <onboarding@resend.dev>",
        to: [bookingData.email],
        subject: "✓ Din booking er modtaget - Billig Elektriker",
        html: `
          <h1>Hej ${bookingData.name},</h1>
          
          <p>Tak for din booking anmodning hos Billig Elektriker!</p>

          <h2>Din Booking</h2>
          <ul>
            <li><strong>Pakke:</strong> ${packageNames[bookingData.package as keyof typeof packageNames]}</li>
            <li><strong>Tidspunkt:</strong> ${timeSlotLabels[bookingData.timeSlot as keyof typeof timeSlotLabels]}</li>
            <li><strong>Estimeret pris:</strong> ${bookingData.estimatedPrice} kr/time ${bookingData.customerType === "privat" ? "(inkl. moms)" : "(ekskl. moms)"}</li>
          </ul>

          <p><strong>Vi ringer til dig snarest på ${bookingData.phone}</strong> for at bekræfte tid og give dig en præcis pris på opgaven.</p>

          <p>På hverdage kan du forvente opkald inden for 2 timer.</p>

          <hr>
          
          <p>Med venlig hilsen<br>
          <strong>Billig Elektriker</strong><br>
          71 99 71 71<br>
          kontakt@billigelektriker.dk</p>
        `,
      }),
    });

    if (!customerEmailResponse.ok) {
      const error = await customerEmailResponse.text();
      console.error("Failed to send customer email:", error);
      // Don't throw error here as business email was sent successfully
    }

    console.log("Booking emails sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Booking received successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to process booking"
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
