export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',  href: '#contact' },
];

export const SERVICES = [
  {
    id: 'weddings',
    icon: '💍',
    title: 'Weddings',
    description:
      'From intimate ceremonies to grand celebrations, we craft weddings that mirror the unique love story of every couple — every detail immaculate, every moment unforgettable.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    id: 'corporate',
    icon: '🏛',
    title: 'Corporate Events',
    description:
      'Conferences, galas, product launches — we bring your brand vision to life with precision logistics and sophisticated aesthetics that leave a lasting impression.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
  {
    id: 'social',
    icon: '🥂',
    title: 'Social Galas',
    description:
      'Birthday milestones, anniversary soirées, charity events — we design evenings that sparkle with warmth, elegance, and your personal signature.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  },
  {
    id: 'destination',
    icon: '✈️',
    title: 'Destination Events',
    description:
      'Let the world be your venue. We coordinate flawlessly across borders, turning dream locations into extraordinary realities for you and your guests.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  },
];

export const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Curated simplicity',
    price: '₹75,000',
    features: [
      'Full-day event coordination',
      'Venue sourcing & liaison',
      'Vendor management (up to 5)',
      'Décor concept & execution',
      'Day-of timeline & run sheet',
    ],
    highlight: false,
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Our most beloved',
    price: '₹1,50,000',
    features: [
      'Everything in Essential',
      'Catering management',
      'Guest invitation design',
      'Photography brief & direction',
      'Entertainment booking',
      'Welcome & farewell experience',
    ],
    highlight: true,
  },
  {
    id: 'prestige',
    name: 'Prestige',
    tagline: 'Flawlessly unlimited',
    price: 'Custom',
    features: [
      'Everything in Signature',
      'Destination coordination',
      'Luxury transportation',
      'Bespoke floral & styling',
      'Live performance curation',
      'Post-event wrap & gifting',
    ],
    highlight: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya & Arjun Mehta',
    event: 'Wedding — December 2024',
    quote:
      'Cornerstone turned our dream wedding into a reality beyond imagination. Every single detail was thought through, and we were able to truly enjoy our day.',
    avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&q=80',
  },
  {
    id: 2,
    name: 'Ravi Sharma',
    event: 'Corporate Gala — March 2025',
    quote:
      'The product launch exceeded every expectation. 400 guests, flawless execution, and the room absolutely buzzed with energy. Our partners were thoroughly impressed.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
  {
    id: 3,
    name: 'Meera Nair',
    event: 'Anniversary Soirée — July 2025',
    quote:
      'I simply handed them my vision board and they delivered something more beautiful than I could have imagined. The attention to detail was extraordinary.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
  },
];

export const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80', label: 'Wedding Ceremony' },
  { id: 2, src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80', label: 'Floral Design' },
  { id: 3, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80', label: 'Gala Evening' },
  { id: 4, src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=900&q=80', label: 'Table Settings' },
  { id: 5, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80', label: 'Corporate Event' },
  { id: 6, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80', label: 'Reception Décor' },
];

export const STATS = [
  { value: '500+', label: 'Events Delivered' },
  { value: '12',   label: 'Years of Excellence' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '30+',  label: 'Cities Covered' },
];