import Booking from '../models/bookingModel.js';

export async function validateBooking(req, res, next) {
  const { userId, adventureId, persons, totalPrice } = req.body;
  if (!userId || !adventureId || !persons || !totalPrice) {
    return res.status(400).json({ message: 'Missing required booking fields' });
  }
  next();
}

export async function saveBooking(req, res, next) {
  try {
    const booking = await Booking.create(req.body);
    req.booking = booking;
    next();
  } catch (err) {
    console.error('Booking save error:', err);
    res.status(500).json({ message: 'Failed to save booking' });
  }
}

export async function getBookings(req, res) {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId: String(userId) } : {};
    const bookings = await Booking.find(filter).lean();
    res.json(bookings);
  } catch (err) {
    console.error('Booking fetch error:', err);
    res.status(500).json({ message: 'Failed to load bookings' });
  }
}
