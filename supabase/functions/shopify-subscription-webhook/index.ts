import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-shopify-topic, x-shopify-hmac-sha256',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const topic = req.headers.get('x-shopify-topic');
    const payload = await req.json();

    console.log('Received webhook:', topic, payload);

    switch (topic) {
      case 'subscription_contracts/create':
        await handleSubscriptionCreate(supabase, payload);
        break;
      
      case 'subscription_billing_attempts/success':
        await handleBillingSuccess(supabase, payload);
        break;
      
      case 'subscription_contracts/cancel':
        await handleSubscriptionCancel(supabase, payload);
        break;
      
      default:
        console.log('Unhandled webhook topic:', topic);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

async function handleSubscriptionCreate(supabase: any, payload: any) {
  console.log('Creating subscription:', payload);

  const { customer, id: subscriptionId, nextBillingDate } = payload;
  
  // Create or update user subscription
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      shopify_subscription_id: subscriptionId,
      customer_email: customer.email,
      subscription_type: determineSubscriptionType(payload),
      status: 'active',
      next_billing_date: nextBillingDate,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }

  // TODO: Send welcome email
}

async function handleBillingSuccess(supabase: any, payload: any) {
  console.log('Billing success:', payload);

  const { subscriptionContractId, nextBillingDate } = payload;

  const { error } = await supabase
    .from('subscriptions')
    .update({
      next_billing_date: nextBillingDate,
      last_payment_date: new Date().toISOString(),
    })
    .eq('shopify_subscription_id', subscriptionContractId);

  if (error) {
    console.error('Error updating billing:', error);
    throw error;
  }

  // TODO: Send payment confirmation email
}

async function handleSubscriptionCancel(supabase: any, payload: any) {
  console.log('Cancelling subscription:', payload);

  const { id: subscriptionId } = payload;

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
    })
    .eq('shopify_subscription_id', subscriptionId);

  if (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }

  // TODO: Send cancellation confirmation email
}

function determineSubscriptionType(payload: any): string {
  // Determine if it's privat or erhverv based on product variant or metadata
  const lineItems = payload.lines?.edges || [];
  if (lineItems.length > 0) {
    const productTitle = lineItems[0].node.title.toLowerCase();
    if (productTitle.includes('privat')) return 'privat';
    if (productTitle.includes('erhverv')) return 'erhverv';
  }
  return 'unknown';
}
