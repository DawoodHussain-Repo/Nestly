export interface Property {
  id: string
  title: string
  location: string
  price: number
  rating: number
  reviews: number
  image: string
  type: 'apartment' | 'house' | 'villa' | 'cabin'
  bedrooms: number
  bathrooms: number
  guests: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  verified: boolean
  joinDate: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  receiverId: string
  propertyId: string
  propertyTitle: string
  content: string
  timestamp: string
  read: boolean
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    location: 'New York, NY',
    price: 250,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
  },
  {
    id: '2',
    title: 'Coastal Villa with Ocean View',
    location: 'Malibu, CA',
    price: 550,
    rating: 4.95,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
  },
  {
    id: '3',
    title: 'Rustic Mountain Cabin',
    location: 'Aspen, CO',
    price: 180,
    rating: 4.85,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=500&h=400&fit=crop',
    type: 'cabin',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
  },
  {
    id: '4',
    title: 'Parisian Apartment',
    location: 'Paris, France',
    price: 180,
    rating: 4.88,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
  },
  {
    id: '5',
    title: 'Tokyo Contemporary Home',
    location: 'Tokyo, Japan',
    price: 200,
    rating: 4.92,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
  },
  {
    id: '6',
    title: 'London Georgian Townhouse',
    location: 'London, UK',
    price: 220,
    rating: 4.87,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=500&h=400&fit=crop',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
  },
]

export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  verified: true,
  joinDate: '2022-01-15',
}

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'user-2',
    senderName: 'James Wilson',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    receiverId: 'user-1',
    propertyId: '1',
    propertyTitle: 'Modern Downtown Loft',
    content: 'Hi Sarah, is this property still available for next month?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'msg-2',
    senderId: 'user-3',
    senderName: 'Emma Davis',
    senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    receiverId: 'user-1',
    propertyId: '2',
    propertyTitle: 'Coastal Villa with Ocean View',
    content: 'Your villa looks amazing! Can we arrange a video tour?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'msg-3',
    senderId: 'user-2',
    senderName: 'James Wilson',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    receiverId: 'user-1',
    propertyId: '1',
    propertyTitle: 'Modern Downtown Loft',
    content: 'Thank you! Yes, I confirmed the dates with my team.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'msg-4',
    senderId: 'user-4',
    senderName: 'Michael Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    receiverId: 'user-1',
    propertyId: '3',
    propertyTitle: 'Rustic Mountain Cabin',
    content: 'Is there any discount for weekly stays?',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
  },
]
