import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, role, interest, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const interestLabels: Record<string, string> = {
      demo: "Scheduling a demo",
      pricing: "Pricing information",
      partnership: "Partnership opportunities",
      general: "General inquiry",
    };

    await getResend().emails.send({
      from: "Oppr.ai Website <noreply@oppr.ai>",
      to: ["info@oppr.ai"],
      replyTo: email,
      subject: `New Contact Form: ${interestLabels[interest] || "General inquiry"} from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E3A5F; border-bottom: 2px solid #E07A3D; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 10px 12px; color: #333;">${name}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Email</td>
              <td style="padding: 10px 12px; color: #333;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${company ? `<tr><td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Company</td><td style="padding: 10px 12px; color: #333;">${company}</td></tr>` : ""}
            ${role ? `<tr style="background: #f8fafc;"><td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Role</td><td style="padding: 10px 12px; color: #333;">${role}</td></tr>` : ""}
            ${interest ? `<tr><td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Interest</td><td style="padding: 10px 12px; color: #333;">${interestLabels[interest] || interest}</td></tr>` : ""}
          </table>

          ${
            message
              ? `<div style="margin: 20px 0;">
                  <h3 style="color: #1E3A5F; margin-bottom: 8px;">Message</h3>
                  <div style="background: #f8fafc; padding: 16px; border-radius: 8px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                </div>`
              : ""
          }

          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 12px;">
            Sent from the Oppr.ai contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
