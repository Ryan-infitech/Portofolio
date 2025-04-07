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

    // Check if environment variables are set
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASSWORD ||
      !process.env.EMAIL_RECIPIENT
    ) {
      console.error("Missing email configuration environment variables");
      return NextResponse.json(
        {
          success: false,
          message: "Email service not properly configured",
          error: "Missing configuration",
        },
        { status: 500 }
      );
    }

    console.log("Setting up email transport...");

    // Create a transporter using SMTP for Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Using direct SMTP host instead of 'service'
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false,
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

    console.log("Attempting to send email...");

    // Verify SMTP connection
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.error("SMTP verification error:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

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
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
