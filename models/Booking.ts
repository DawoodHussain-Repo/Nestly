import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBooking extends Document {
  propertyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  serviceFee: number;
  grandTotal: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  bookingReference: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property ID is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required'],
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'At least 1 guest is required'],
    },
    nights: {
      type: Number,
      required: [true, 'Number of nights is required'],
      min: [1, 'At least 1 night is required'],
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Price per night is required'],
      min: [0, 'Price cannot be negative'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative'],
    },
    serviceFee: {
      type: Number,
      required: [true, 'Service fee is required'],
      min: [0, 'Service fee cannot be negative'],
    },
    grandTotal: {
      type: Number,
      required: [true, 'Grand total is required'],
      min: [0, 'Grand total cannot be negative'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      default: 'mock_payment',
    },
    bookingReference: {
      type: String,
      required: [true, 'Booking reference is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ propertyId: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ bookingReference: 1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
