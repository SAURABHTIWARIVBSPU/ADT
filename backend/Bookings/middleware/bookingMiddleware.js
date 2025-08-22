import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/bookings.json');

export async function validateBooking(req, res, next) {
  const { userId, adventureId, persons, totalPrice } = req.body;
  if (!userId || !adventureId || !persons || !totalPrice) {
    return res.status(400).json({ message: 'Missing required booking fields' });
  }
  next();
}

export async function saveBooking(req, res, next) {
  try {
    const booking = {
      ...req.body,
      id: Date.now(),
      bookingDate: new Date().toISOString()
    };
    let bookings = [];
    try {
      const data = await fs.readFile(DATA_PATH, 'utf-8');
      bookings = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    bookings.push(booking);
    await fs.writeFile(DATA_PATH, JSON.stringify(bookings, null, 2));
    req.booking = booking;
    next();
  } catch (err) {
    console.error('Booking save error:', err);
    res.status(500).json({ message: 'Failed to save booking' });
  }
}
