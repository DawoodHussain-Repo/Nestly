// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    SIGNIN: '/api/auth/signin',
  },
  LISTINGS: '/api/listings',
  MESSAGES: '/api/messages',
} as const

// Validation constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
} as const

// UI / Pagination
export const UI = {
  DEBOUNCE_DELAY_MS: 300,
  NAVBAR_HEIGHT_PX: 72,
  MESSAGES_NAVBAR_HEIGHT_PX: 80,
  MAX_CONTENT_WIDTH: '80rem',
  GRID_GAP: '1.5rem',
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  LISTINGS: '/listings',
  MESSAGES: '/messages',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  HOW_IT_WORKS: '/how-it-works',
} as const

// Property types for filters
export const PROPERTY_TYPES = [
  'All Types',
  'Studio',
  'Cabin',
  'Villa',
  'Beach',
  'Penthouse',
] as const

// Price ranges
export const PRICE_RANGES = [
  'Price: Any',
  '$0 - $100',
  '$100 - $300',
  '$300 - $600',
  '$600+',
] as const

// Category filters
export const CATEGORY_FILTERS = [
  { name: 'Beach', icon: 'beach_access' },
  { name: 'City', icon: 'location_city' },
  { name: 'Mountains', icon: 'landscape' },
  { name: 'Villa', icon: 'villa' },
  { name: 'Cabin', icon: 'cabin' },
  { name: 'Studio', icon: 'apartment' },
  { name: 'Penthouse', icon: 'domain' },
  { name: 'Farm', icon: 'agriculture' },
] as const
