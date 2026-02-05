import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      company,
      role,
      companySize,
      interest,
      notes,
    } = body;

    if (!firstName || !lastName || !email || !company) {
      return NextResponse.json(
        { error: "First name, last name, email, and company are required." },
        { status: 400 }
      );
    }

    const interestLabels: Record<string, string> = {
      capture: "Capturing operator knowledge",
      "root-cause": "Faster root cause analysis",
      expertise: "Preserving expertise before retirement",
      ci: "Continuous improvement infrastructure",
      insights: "Oppr Insights strategic feedback",
      full: "Full platform evaluation",
      other: "Other",
    };

    await resend.emails.send({
      from: "Oppr.ai Website <noreply@oppr.ai>",
      to: ["info@oppr.ai"],
      replyTo: email,
      subject: `Demo Request from ${firstName} ${lastName} at ${company}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1E3A5F; border-bottom: 2px solid #E07A3D; padding-bottom: 12px;">
            New Demo Request
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 10px 12px; color: #333;">${firstName} ${lastName}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Email</td>
              <td style="padding: 10px 12px; color: #333;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Company</td>
              <td style="padding: 10px 12px; color: #333;">${company}</td>
            </tr>
            ${role ? `<tr style="background: #f8fafc;"><td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Role</td><td style="padding: 10px 12px; color: #333;">${role}</td></tr>` : ""}
            ${companySize ? `<tr><td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Company Size</td><td style="padding: 10px 12px; color: #333;">${companySize}</td></tr>` : ""}
            ${interest ? `<tr style="background: #f8fafc;"><td style="padding: 10px 12px; font-weight: 600; color: #1E3A5F; vertical-align: top;">Primary Interest</td><td style="padding: 10px 12px; color: #333;">${interestLabels[interest] || interest}</td></tr>` : ""}
          </table>

          ${
            notes
              ? `<div style="margin: 20px 0;">
                  <h3 style="color: #1E3A5F; margin-bottom: 8px;">Additional Notes</h3>
                  <div style="background: #f8fafc; padding: 16px; border-radius: 8px; color: #333; line-height: 1.6; white-space: pre-wrap;">${notes}</div>
                </div>`
              : ""
          }

          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 12px;">
            Sent from the Oppr.ai demo request form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo form error:", error);
    return NextResponse.json(
      { error: "Failed to send request. Please try again." },
      { status: 500 }
    );
  }
}
