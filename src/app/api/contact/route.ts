import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide name, email, and message",
        },
        { status: 400 }
      );
    }

    // Create a transporter using SMTP for Gmail
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT,
      replyTo: email,
      subject: subject || `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4f46e5; margin-bottom: 20px;">Pesan Baru Dari Submission Portfolio</h2>
          
          <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-radius: 4px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || "Not specified"}</p>
          </div>
          
          <div style="border-left: 4px solid #4f46e5; padding-left: 15px; margin-bottom: 20px;">
            <h3 style="color: #4b5563; margin-bottom: 10px;">Message:</h3>
            <p style="white-space: pre-line; color: #4b5563;">${message}</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send your message",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
