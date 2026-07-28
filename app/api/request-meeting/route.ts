import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getVolunteerById } from "@/lib/volunteers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { volunteerId, studentName, studentEmail, activity, proposedTime, notes } =
      body ?? {};

    if (!volunteerId || !studentName || !studentEmail || !activity || !proposedTime) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(studentEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const volunteer = getVolunteerById(volunteerId);
    if (!volunteer) {
      return NextResponse.json(
        { error: "Volunteer not found." },
        { status: 404 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(
        "RESEND_API_KEY is not set. Add it to your environment variables."
      );
      return NextResponse.json(
        {
          error:
            "Email sending isn't configured yet. Please contact the site owner.",
        },
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
      to: volunteer.email,
      replyTo: studentEmail,
      subject: `New meeting request from ${studentName}`,
      html: `
        <p>Hi ${safe(volunteer.name)},</p>
        <p><strong>${safe(studentName)}</strong> would like to meet up with you!</p>
        <ul>
          <li><strong>Activity:</strong> ${safe(activity)}</li>
          <li><strong>Proposed time:</strong> ${safe(proposedTime)}</li>
          ${notes ? `<li><strong>Notes:</strong> ${safe(notes)}</li>` : ""}
        </ul>
        <p>Their email is <a href="mailto:${safe(studentEmail)}">${safe(
        studentEmail
      )}</a> &mdash; reply to this email to confirm the exact time and location.</p>
        <p style="color:#888;font-size:12px;">Sent via Volunteer Meetup</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send the request email. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Request handling error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
