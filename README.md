# Volunteer Meetup

A simple web tool that lets high school students with disabilities browse
volunteer profiles and request a meeting activity + proposed time. The
request is emailed directly to the volunteer, who replies to the student's
email to lock in the final time and place.

## MVP scope

- Browse volunteer profiles (`/`)
- View a volunteer's profile and activities (`/volunteer/[id]`)
- Submit a meeting request (activity + proposed time + notes) which emails
  the volunteer, with the student's email set as the reply-to address

Volunteers are stored in `data/volunteers.json` — no database required yet.

## Running locally

```bash
npm install
cp .env.example .env.local   # then add your Resend API key
npm run dev
```

Visit `http://localhost:3000`.

## Adding or editing volunteers

Edit `data/volunteers.json`. Each volunteer needs:

```json
{
  "id": "unique-url-slug",
  "name": "Full Name",
  "email": "volunteer@example.com",
  "photo": "https://... (any image URL)",
  "tagline": "Short one-liner",
  "bio": "A few sentences about them",
  "activities": ["Activity 1", "Activity 2"]
}
```

## Email setup (Resend)

1. Create a free account at [resend.com](https://resend.com).
2. Grab an API key from the dashboard.
3. Add it as `RESEND_API_KEY` in `.env.local` (for local dev) and in your
   Vercel project's Environment Variables (for production).
4. By default, emails send from Resend's shared test address
   (`onboarding@resend.dev`), which works immediately but is best for
   testing. For production, verify your own domain in Resend and set
   `RESEND_FROM_EMAIL` accordingly.

## Deploying

See the step-by-step GitHub + Vercel walkthrough your Claude conversation
provided, or the official [Vercel docs](https://vercel.com/docs) /
[Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## Roadmap ideas (not in MVP)

- Persist requests in a database and show a dashboard
- Add/edit volunteer profiles through a form (instead of editing JSON)
- Confirmation emails to the student
- Availability calendars instead of free-text proposed times
