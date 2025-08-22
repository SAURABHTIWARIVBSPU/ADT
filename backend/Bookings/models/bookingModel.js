import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    adventureId: { type: String, required: true },
    persons: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model('Booking', bookingSchema);
