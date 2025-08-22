import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import subscribeRoute from './Subscribe/routes/subscribeRoute.js';
import bookingRoute from './Bookings/routes/bookingRoute.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('📦 Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/subscribe', subscribeRoute);
app.use('/api/bookings', bookingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
