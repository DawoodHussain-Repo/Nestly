import connectDB from './mongodb';
import Property from '@/models/Property';
import User from '@/models/User';

const properties = [
  {
    title: 'Modern Downtown Loft',
    location: 'New York, NY',
    price: 250,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    ],
    type: 'apartment' as const,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    description: 'Experience luxury and comfort in this beautifully designed apartment. Perfect for families or groups, this property offers modern amenities and stunning views.',
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 'TV', 'Washer'],
    available: true,
  },
  {
    title: 'Coastal Villa with Ocean View',
    location: 'Malibu, CA',
    price: 550,
    rating: 4.95,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    ],
    type: 'villa' as const,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    description: 'Stunning beachfront villa with panoramic ocean views. Features a private pool, outdoor dining area, and direct beach access.',
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Air Conditioning', 'Parking'],
    available: true,
  },
  {
    title: 'Rustic Mountain Cabin',
    location: 'Aspen, CO',
    price: 180,
    rating: 4.85,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop',
    ],
    type: 'cabin' as const,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    description: 'Cozy mountain retreat surrounded by nature. Perfect for skiing in winter and hiking in summer. Features a fireplace and mountain views.',
    amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Heating', 'Parking', 'Mountain View'],
    available: true,
  },
  {
    title: 'Parisian Apartment',
    location: 'Paris, France',
    price: 180,
    rating: 4.88,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    type: 'apartment' as const,
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    description: 'Charming Parisian apartment in the heart of the city. Walking distance to major attractions and authentic French cafes.',
    amenities: ['WiFi', 'Kitchen', 'Heating', 'Elevator'],
    available: true,
  },
  {
    title: 'Tokyo Contemporary Home',
    location: 'Tokyo, Japan',
    price: 200,
    rating: 4.92,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop',
    type: 'house' as const,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    description: 'Modern Japanese home blending traditional and contemporary design. Located in a quiet neighborhood with easy access to public transport.',
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Washer', 'Garden'],
    available: true,
  },
  {
    title: 'London Georgian Townhouse',
    location: 'London, UK',
    price: 220,
    rating: 4.87,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=500&h=400&fit=crop',
    type: 'house' as const,
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
    description: 'Historic Georgian townhouse with modern amenities. Located in a prestigious London neighborhood near parks and museums.',
    amenities: ['WiFi', 'Kitchen', 'Heating', 'Fireplace', 'Garden'],
    available: true,
  },
  {
    title: 'Santorini Cliffside Villa',
    location: 'Santorini, Greece',
    price: 320,
    rating: 4.96,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&h=400&fit=crop',
    type: 'villa' as const,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    description: 'Breathtaking cliffside villa with infinity pool and sunset views. Traditional Cycladic architecture with luxury amenities.',
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Air Conditioning', 'Sea View', 'Terrace'],
    available: true,
  },
  {
    title: 'Dubai Luxury Penthouse',
    location: 'Dubai, UAE',
    price: 450,
    rating: 4.93,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=500&h=400&fit=crop',
    type: 'apartment' as const,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    description: 'Ultra-modern penthouse with panoramic city views. Features high-end finishes, smart home technology, and access to building amenities.',
    amenities: ['WiFi', 'Pool', 'Gym', 'Kitchen', 'Air Conditioning', 'Parking', 'Concierge'],
    available: true,
  },
];

export async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await Property.deleteMany({});
    console.log('🗑️  Cleared existing properties');

    // Insert properties
    const insertedProperties = await Property.insertMany(properties);
    console.log(`✅ Seeded ${insertedProperties.length} properties`);

    // Create a demo user if doesn't exist
    const existingUser = await User.findOne({ email: 'demo@nestly.com' });
    if (!existingUser) {
      await User.create({
        name: 'Demo User',
        email: 'demo@nestly.com',
        password: 'Demo123!',
        verified: true,
      });
      console.log('✅ Created demo user (email: demo@nestly.com, password: Demo123!)');
    }

    return { success: true, count: insertedProperties.length };
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
}
