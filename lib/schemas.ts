import { z } from 'zod';

// Booking Search Schema
export const bookingSearchSchema = z.object({
  destination: z.string().min(2, 'Please enter a destination'),
  checkIn: z.date({
    required_error: 'Check-in date is required',
  }),
  checkOut: z.date({
    required_error: 'Check-out date is required',
  }),
  guests: z.number().min(1, 'At least 1 guest is required').max(16, 'Maximum 16 guests allowed'),
  rooms: z.number().min(1, 'At least 1 room is required').max(10, 'Maximum 10 rooms allowed'),
}).refine((data) => data.checkOut > data.checkIn, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'],
});

export type BookingSearchFormData = z.infer<typeof bookingSearchSchema>;

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Sign In Schema
export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// Sign Up Schema
export const signUpSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Property Listing Schema
export const propertyListingSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  propertyType: z.enum(['villa', 'cabin', 'studio', 'penthouse', 'beach', 'farm', 'apartment']),
  price: z.number().min(1, 'Price must be greater than 0'),
  bedrooms: z.number().min(0, 'Bedrooms cannot be negative'),
  bathrooms: z.number().min(0, 'Bathrooms cannot be negative'),
  maxGuests: z.number().min(1, 'At least 1 guest must be allowed'),
  address: z.string().min(10, 'Please enter a complete address'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),
});

export type PropertyListingFormData = z.infer<typeof propertyListingSchema>;
