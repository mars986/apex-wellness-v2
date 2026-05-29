import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMagicLinkEmail(email: string, magicLink: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log("DEV MAGIC LINK:", magicLink);
    return;
  }

  await resend.emails.send({
    from: "Apex Wellness <onboarding@resend.dev>",
    to: email,
    subject: "Your Apex Wellness login link",
    html: `
      <p>Click below to sign in:</p>
      <p><a href="${magicLink}">Sign in to Apex Wellness</a></p>
      <p>This link expires soon. If you did not request it, ignore this email.</p>
    `,
  });
}
