import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Adventure Triangle" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Welcome to Adventure Triangle 🧗',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <img src="https://yourdomain.com/logo1.svg" alt="Adventure Triangle" style="height: 50px;" />
          <h2>Thanks for Subscribing!</h2>
          <p>Welcome aboard, adventurer! We’ll keep you posted with exciting destinations and exclusive offers.</p>
          <p><strong>Adventure Triangle</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Subscription successful' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Error sending email' });
  }
});

export default router;
