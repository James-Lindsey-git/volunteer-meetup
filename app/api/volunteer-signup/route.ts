import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, availability } = body ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { error: "Please fill in your name and email." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      console.error(
        "RESEND_API_KEY or ADMIN_EMAIL is not set. Add both to your environment variables."
      );
      return NextResponse.json(
        {
          error:
            `Debug: apiKey present = ${!!apiKey}, adminEmail present = ${!!adminEmail}`,
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Volunteer Meetup <onboarding@resend.dev>";

    const safe = (value: unknown) =>
      String(value ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      reply_to: email,
      subject: `New volunteer interview sign-up: ${name}`,
      html: `
        <p>New volunteer interview request:</p>
        <ul>
          <li><strong>Name:</strong> ${safe(name)}</li>
          <li><strong>Email:</strong> ${safe(email)}</li>
          ${availability ? `<li><strong>Availability:</strong> ${safe(availability)}</li>` : ""}
        </ul>
        <p>Reply to this email to reach them directly and schedule the interview.</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your sign-up. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Volunteer signup handling error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
