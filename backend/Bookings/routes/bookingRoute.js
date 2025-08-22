import express from 'express';
import { validateBooking, saveBooking, getBookings } from '../middleware/bookingMiddleware.js';

const router = express.Router();

router.get('/', getBookings);

router.post('/', validateBooking, saveBooking, (req, res) => {
  res.status(201).json({ message: 'Booking created', booking: req.booking });
});

export default router;
