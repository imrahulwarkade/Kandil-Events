export type LocationId =
  | "taj"
  | "jehan-numa"
  | "marriott"
  | "giovanni"
  | "akash";

export type GalleryItem = {
  id: string;
  location: LocationId;
  title: string;
  imageSrc: string;
  extra?: boolean;
};

export type Service = {
  num: string;
  icon: string;
  name: string;
  description: string;
  image: string;
  badge: string;
};

export type Testimonial = {
  id: string;
  stars: number;
  quote: string;
  authorName: string;
  authorInitial: string;
  eventLabel: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type ContactFormValues = {
  name: string;
  email: string;
  eventType: string;
  eventDate: string;
  message: string;
};

export type FilterOption = {
  id: "all" | LocationId;
  label: string;
};
