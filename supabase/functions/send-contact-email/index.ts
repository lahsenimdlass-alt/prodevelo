import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const formData: ContactFormData = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured. Email sending skipped.");
      return new Response(
        JSON.stringify({ success: true, message: "Form submitted successfully" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailHtml = `
      <h2>Nouvelle demande de contact - Prodevelo</h2>
      <p><strong>Nom:</strong> ${formData.name || 'Non renseigné'}</p>
      <p><strong>Email:</strong> ${formData.email || 'Non renseigné'}</p>
      <p><strong>Téléphone:</strong> ${formData.phone || 'Non renseigné'}</p>
      <p><strong>Entreprise:</strong> ${formData.company || 'Non renseigné'}</p>
      <p><strong>Service souhaité:</strong> ${formData.service || 'Non renseigné'}</p>
      <p><strong>Budget:</strong> ${formData.budget || 'Non renseigné'}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message || 'Aucun message'}</p>
    `;

    const emailSubject = formData.name ? `Nouvelle demande de contact - ${formData.name}` : 'Nouvelle demande de contact';

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Prodevelo <onboarding@resend.dev>",
        to: "contact@prodevelo.com",
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error("Failed to send email");
    }

    const data = await res.json();

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
