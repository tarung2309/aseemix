import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prefix,
      name,
      company,
      designation,
      email,
      countryCode,
      mobile,
      location,
      message,
      recaptchaToken
    } = body;

    // Verify recaptcha
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      console.error('reCAPTCHA failed:', recaptchaData['error-codes']);
      return NextResponse.json(
        { error: `reCAPTCHA verification failed: ${(recaptchaData['error-codes'] || []).join(', ')}` },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Aseemix Website" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.TO_EMAIL,
      subject: `New Demo Request from Aseemix Website - ${company}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Prefix:</strong> ${prefix}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company/Hospital:</strong> ${company}</p>
        <p><strong>Designation:</strong> ${designation}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${countryCode} ${mobile}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error in /api/contact:', msg);
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 });
  }
}