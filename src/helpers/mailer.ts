import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

// emailType: "VERIFY" | "RESET"
export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    if (!email || !userId) {
      throw new Error("Missing email or user ID");
    }

    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update token fields in user document
    const updateFields =
      emailType === "VERIFY"
        ? {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000, // 1 hour
          }
        : {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
          };

    await User.findByIdAndUpdate(userId, updateFields);

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,          // e.g., smtp.gmail.com or smtp.mailtrap.io
      port: Number(process.env.SMTP_PORT),  // e.g., 587 or 2525
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const route = emailType === "VERIFY" ? "verifyemail" : "resetpassword";
    const link = `${process.env.DOMAIN}/${route}?token=${hashedToken}`;

    const mailOptions = {
      from: process.env.SMTP_FROM || "no-reply@yourapp.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your Email" : "Reset Your Password",
      html: `
        <p>Click <a href="${link}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>
        <p>Or copy and paste this link into your browser:</p>
        <p>${link}</p>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    // Send mail
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Email sending error:", error);
    throw new Error(error.message || "Failed to send email");
  }
};
