import nodemailer from 'nodemailer';

interface SendEmailProps {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}

export default async function sendEmail({ email, emailType, userId }: SendEmailProps) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Link here for ${emailType}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email send failed:', error);
    throw new Error('Email send failed');
  }
}
