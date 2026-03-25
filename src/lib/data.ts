import type {
  FilterOption,
  GalleryItem,
  NavLink,
  Service,
  Testimonial,
} from "@/src/types";

export const navLinks: NavLink[] = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];

export const marqueePhrases: string[] = [
  "Weddings",
  "Corporate Events",
  "Cultural Ceremonies",
  "Birthday Celebrations",
  "Luxury Galas",
];

export const services: Service[] = [
  {
    num: "01",
    icon: "💍",
    name: "Weddings & Ceremonies",
    description:
      "From intimate nikah ceremonies to grand ballroom receptions, we craft weddings that reflect your unique love story with timeless elegance.",
    image: "/assets/wedding_service_placeholder_1774394639013.png",
    badge: "LEARNING & OPPORTUNITY", // Using image labels as reference
  },
  {
    num: "02",
    icon: "🏛️",
    name: "Corporate Galas",
    description:
      "Award nights, product launches, and executive retreats — delivered with impeccable professionalism and sophisticated design.",
    image: "/assets/corporate_gala_placeholder_1774394706885.png",
    badge: "YOUTH EMPOWERMENT",
  },
  {
    num: "03",
    icon: "🎂",
    name: "Birthdays & Milestones",
    description:
      "Celebrate every chapter in style. Milestone birthdays and anniversaries curated with personal touches that make moments unforgettable.",
    image: "/assets/birthday_celebration_placeholder_1774394721550.png",
    badge: "SKILLS EMPOWERMENT",
  },
  {
    num: "04",
    icon: "🌙",
    name: "Cultural & Religious",
    description:
      "Deeply rooted in tradition, our cultural event services honor heritage with reverence while weaving in contemporary luxury aesthetics.",
    image: "/assets/cultural_event_placeholder_1774394813361.png",
    badge: "HEALTH & WELL-BEING",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    stars: 5,
    quote:
      "Kandil Events turned our wedding into an absolute fairytale. Every detail was perfect — from the floral arrangements to the lighting. We couldn't have asked for more.",
    authorName: "Fatima & Omar Al-Hassan",
    authorInitial: "F",
    eventLabel: "Wedding · 2024",
  },
  {
    id: "2",
    stars: 5,
    quote:
      "Our annual corporate gala has never looked better. The Kandil team understood our brand vision perfectly and delivered a breathtaking evening that impressed our entire board.",
    authorName: "Rania Malik",
    authorInitial: "R",
    eventLabel: "Corporate Gala · 2024",
  },
  {
    id: "3",
    stars: 5,
    quote:
      "My mother's 60th birthday celebration was beyond anything we imagined. Kandil Events brought warmth, elegance, and joy to every single moment. Truly exceptional.",
    authorName: "Sara Qureshi",
    authorInitial: "S",
    eventLabel: "Birthday Celebration · 2023",
  },
];

export const galleryFilters: FilterOption[] = [
  { id: "all", label: "All Experiences" },
  { id: "taj", label: "Taj Lakefront" },
  { id: "jehan-numa", label: "Jehan Numa Palace" },
  { id: "marriott", label: "Courtyard by Marriott" },
  { id: "giovanni", label: "Giovanni Village" },
  { id: "akash", label: "Akash Retreat" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    location: "taj",
    title: "Luxe Event @ Taj Lakefront",
    imageSrc: "/assets/gallery-1.webp",
  },
  {
    id: "g2",
    location: "jehan-numa",
    title: "Royal Soirée @ Jehan Numa",
    imageSrc: "/assets/gallery-2.jpg",
  },
  {
    id: "g3",
    location: "marriott",
    title: "Chic Decor @ Marriott",
    imageSrc: "/assets/gallery-3.webp",
  },
  {
    id: "g4",
    location: "giovanni",
    title: "Vibrant Night @ Giovanni",
    imageSrc: "/assets/gallery-4.jpg",
  },
  {
    id: "g5",
    location: "akash",
    title: "Bespoke Gala @ Akash Retreat",
    imageSrc: "/assets/hero-bg.webp",
  },
  {
    id: "g6",
    location: "jehan-numa",
    title: "High-Tea @ Jehan Numa",
    imageSrc: "/assets/gallery-5.jpg",
    extra: true,
  },
  {
    id: "g7",
    location: "giovanni",
    title: "Poolside Party @ Giovanni",
    imageSrc: "/assets/gallery-6.png",
    extra: true,
  },
  {
    id: "g8",
    location: "marriott",
    title: "Roof-Top Reception @ Marriott",
    imageSrc: "/assets/gallery-7.webp",
    extra: true,
  },
  {
    id: "g9",
    location: "taj",
    title: "Lakeside Wedding @ Taj",
    imageSrc: "/assets/gallery-8.webp",
    extra: true,
  },
];

export const eventTypeOptions = [
  "Wedding & Ceremony",
  "Corporate Gala",
  "Birthday & Milestone",
  "Cultural & Religious",
] as const;
