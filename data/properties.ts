import { Property } from '@/components/PropertyCard';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse with City Views',
    location: 'Kilimani, Nairobi',
    price: 'KSH 25,000,000',
    type: 'Penthouse',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: '2,500 sq ft',
    image: '/src/assets/property1.jpg',
    featured: true
  },
  {
    id: '2',
    title: 'Modern Villa with Swimming Pool',
    location: 'Karen, Nairobi',
    price: 'KSH 180,000/month',
    type: 'Villa',
    status: 'For Rent',
    bedrooms: 5,
    bathrooms: 4,
    area: '4,200 sq ft',
    image: '/src/assets/property2.jpg',
    featured: true
  },
  {
    id: '3',
    title: 'Premium Office Space',
    location: 'Westlands, Nairobi',
    price: 'KSH 15,000,000',
    type: 'Commercial',
    status: 'For Sale',
    bedrooms: 0,
    bathrooms: 2,
    area: '1,800 sq ft',
    image: '/src/assets/property3.jpg'
  },
  {
    id: '4',
    title: 'Elegant Townhouse',
    location: 'Lavington, Nairobi',
    price: 'KSH 120,000/month',
    type: 'Townhouse',
    status: 'For Rent',
    bedrooms: 3,
    bathrooms: 2,
    area: '2,100 sq ft',
    image: '/src/assets/property1.jpg'
  },
  {
    id: '5',
    title: 'Luxury Apartment Complex',
    location: 'Kileleshwa, Nairobi',
    price: 'KSH 18,500,000',
    type: 'Apartment',
    status: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    area: '1,900 sq ft',
    image: '/src/assets/property2.jpg'
  },
  {
    id: '6',
    title: 'Executive Family Home',
    location: 'Karen, Nairobi',
    price: 'KSH 28,000,000',
    type: 'Villa',
    status: 'For Sale',
    bedrooms: 6,
    bathrooms: 5,
    area: '5,000 sq ft',
    image: '/src/assets/property3.jpg',
    featured: true
  }
];

export const locations = [
  'Kilimani',
  'Kileleshwa', 
  'Lavington',
  'Karen',
  'Westlands'
];

export const propertyTypes = [
  'All Types',
  'Apartment',
  'Villa',
  'Townhouse',
  'Penthouse',
  'Commercial',
  'Land'
];

export const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under 10M', min: 0, max: 10000000 },
  { label: '10M - 20M', min: 10000000, max: 20000000 },
  { label: '20M - 30M', min: 20000000, max: 30000000 },
  { label: 'Above 30M', min: 30000000, max: Infinity }
];