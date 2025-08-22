import express from 'express';
import { validateBooking, saveBooking } from '../middleware/bookingMiddleware.js';

const router = express.Router();

router.post('/', validateBooking, saveBooking, (req, res) => {
  res.status(201).json({ message: 'Booking created', booking: req.booking });
});

export default router;
