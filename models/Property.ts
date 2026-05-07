import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  type: 'apartment' | 'house' | 'villa' | 'cabin';
  bedrooms: number;
  bathrooms: number;
  guests: number;
  description?: string;
  amenities?: string[];
  host?: mongoose.Types.ObjectId;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    reviews: {
      type: Number,
      default: 0,
      min: [0, 'Reviews cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Main image is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      required: [true, 'Property type is required'],
      enum: ['apartment', 'house', 'villa', 'cabin'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Number of bedrooms is required'],
      min: [0, 'Bedrooms cannot be negative'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Number of bathrooms is required'],
      min: [0, 'Bathrooms cannot be negative'],
    },
    guests: {
      type: Number,
      required: [true, 'Maximum guests is required'],
      min: [1, 'Must accommodate at least 1 guest'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search optimization
propertySchema.index({ title: 'text', location: 'text', description: 'text' });
propertySchema.index({ type: 1, available: 1 });
propertySchema.index({ price: 1 });

const Property: Model<IProperty> =
  mongoose.models.Property || mongoose.model<IProperty>('Property', propertySchema);

export default Property;
