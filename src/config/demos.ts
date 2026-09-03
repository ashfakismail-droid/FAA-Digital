import type { Demo } from "@/types";

export const demos: Demo[] = [
  {
    slug: "external-website",
    title: "LUXORA — Luxury Fashion & Lifestyle",
    category: "New category",
    industry: "New industry",
    description: "LUXORA — curated luxury fashion and lifestyle essentials.",
    features: [],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    palette: [
      "#10131f",
      "#5f5ce6"
    ],
    icon: "Sparkles",
    status: "live",
    publishState: "published",
    visibility: "public",
    source: {
      type: "external",
      url: "https://e-commerce-me.netlify.app/",
      detectedType: "unknown"
    },
    tags: [],
    order: 1,
    thumbnail: "/demos/external-website/assets/studio-thumbnail.png?v=1785349168138",
    logo: "https://e-commerce-me.netlify.app/images/misc/favicon.svg",
    seoTitle: "LUXORA — Luxury Fashion & Lifestyle",
    seoDescription: "LUXORA — curated luxury fashion and lifestyle essentials.",
    popular: true,
    featuredHero: true
  },
  {
    slug: "bella-vista",
    title: "Bella Vista Ristorante",
    category: "Restaurant",
    description: "Authentic Italian Dining — warm, editorial restaurant template with immersive menus, table reservations, and private dining enquiries.",
    features: [
      "Online reservations",
      "Menu showcase",
      "Private dining",
      "Events calendar"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0b0906",
      "#C98A4B"
    ],
    icon: "UtensilsCrossed",
    status: "live",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
    tags: [
      "restaurant",
      "italian",
      "hospitality"
    ],
    visibility: "public",
    notes: "First restaurant demo, featured in case studies",
    lastActivity: "2024-02-10",
    order: 2,
    industry: "Restaurant",
    publishState: "published",
    featuredHero: false,
    source: {
      type: "local",
      folder: "bella-vista",
      detectedType: "html"
    }
  },
  {
    slug: "luxora",
    title: "Luxora",
    category: "E-Commerce",
    description: "Luxury Fashion & Lifestyle — curated luxury fashion and lifestyle essentials with a premium shopping experience.",
    features: [
      "Product catalogue",
      "Cart & checkout",
      "Wishlist",
      "Compare products",
      "Order tracking",
      "Admin dashboard"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#141414",
      "#C9A86A"
    ],
    icon: "ShoppingBag",
    popular: false,
    status: "live",
    thumbnail: "/demos/luxora/images/misc/luxora-preview.jpg",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
    tags: [
      "ecommerce",
      "fashion",
      "luxury"
    ],
    visibility: "public",
    notes: "High-performing product showcase with advanced filtering",
    lastActivity: "2024-03-20",
    order: 3,
    industry: "E-Commerce",
    publishState: "published",
    source: {
      type: "local",
      folder: "luxora",
      detectedType: "html"
    },
    featuredHero: false
  },
  {
    slug: "grand-horizon-hotel",
    title: "Grand Horizon Hotel",
    category: "Hotel & Resort",
    description: "Luxury 5-star retreat with signature suites, fine dining, spa rituals, and breathtaking views.",
    features: [
      "Booking engine",
      "Room galleries",
      "Spa & dining",
      "Guest experiences"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0E1C22",
      "#5FB3A8"
    ],
    icon: "Hotel",
    status: "live",
    thumbnail: "/demos/grand-horizon-hotel/images/hero/hero-suite.svg",
    createdAt: "2024-01-25",
    updatedAt: "2024-03-15",
    tags: [
      "hotel",
      "luxury",
      "resort"
    ],
    visibility: "public",
    lastActivity: "2024-03-15",
    order: 4,
    industry: "Hotel & Resort",
    publishState: "published",
    source: {
      type: "local",
      folder: "grand-horizon-hotel",
      detectedType: "html"
    },
    featuredHero: false
  },
  {
    slug: "dealership",
    title: "Prestige Motors",
    category: "Car Dealership",
    description: "Luxury & Performance Automobiles — the definitive destination for luxury and performance automobiles.",
    features: [
      "Vehicle inventory",
      "Test-drive booking",
      "Finance calculator",
      "Trade-in valuation"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0F1418",
      "#C8B08A"
    ],
    icon: "Car",
    status: "live",
    thumbnail: "/demos/dealership/assets/studio-thumbnail.png?v=1785423057389",
    createdAt: "2024-01-30",
    updatedAt: "2024-03-10",
    tags: [
      "automotive",
      "luxury",
      "dealership"
    ],
    visibility: "public",
    lastActivity: "2024-03-10",
    order: 5,
    industry: "Car Dealership",
    publishState: "published",
    source: {
      type: "local",
      folder: "dealership",
      detectedType: "html"
    },
    featuredHero: false,
    popular: true
  },
  {
    slug: "gym",
    title: "Titan Fitness",
    category: "Gym & Fitness",
    description: "Premium gym & fitness center with world-class training, elite coaches, and memberships built for results.",
    features: [
      "Class timetables",
      "Membership plans",
      "Trainer profiles",
      "Trial booking"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0a0a0a",
      "#E05538"
    ],
    icon: "Dumbbell",
    status: "live",
    createdAt: "2024-02-05",
    updatedAt: "2024-02-20",
    tags: [
      "fitness",
      "gym",
      "health"
    ],
    visibility: "public",
    lastActivity: "2024-02-20",
    order: 6,
    industry: "Gym & Fitness",
    publishState: "published",
    source: {
      type: "local",
      folder: "gym",
      detectedType: "html"
    },
    featuredHero: false
  },
  {
    slug: "hotel",
    title: "Aurora Grand Resort",
    category: "Hotel & Resort",
    description: "Where elegance meets the horizon — luxury rooms, world-class dining, and unforgettable experiences.",
    features: [
      "Room booking",
      "Restaurant menu",
      "Gallery showcase",
      "Contact & locations"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#121418",
      "#D4A05B"
    ],
    icon: "Hotel",
    status: "live",
    thumbnail: "/demos/hotel/images/hero.jpg",
    createdAt: "2024-01-20",
    updatedAt: "2024-03-05",
    tags: [
      "hotel",
      "resort",
      "luxury"
    ],
    visibility: "public",
    lastActivity: "2024-03-05",
    order: 7,
    industry: "Hotel & Resort",
    publishState: "published",
    source: {
      type: "local",
      folder: "hotel",
      detectedType: "html"
    },
    featuredHero: false,
    popular: true
  },
  {
    slug: "pub",
    title: "PUB SOCIAL CLUB",
    category: "Bar & Lounge",
    description: "Elite luxury sanctuary where high-end cinematic design meets immersive night culture.",
    features: [
      "Event calendar",
      "Menu showcase",
      "Photo gallery",
      "Reservation system"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#0d050a",
      "#D4AF37"
    ],
    icon: "Wine",
    status: "live",
    createdAt: "2024-02-12",
    updatedAt: "2024-02-12",
    tags: [
      "bar",
      "nightlife",
      "lounge"
    ],
    visibility: "public",
    lastActivity: "2024-02-12",
    order: 8,
    industry: "Bar & Lounge",
    publishState: "published",
    source: {
      type: "local",
      folder: "pub",
      detectedType: "html"
    },
    featuredHero: false,
    thumbnail: "/demos/pub/assets/studio-thumbnail.png?v=1785422939417"
  },
  {
    slug: "real-estate",
    title: "PrimeNest Realty",
    category: "Real Estate",
    description: "Premium real estate agency with verified listings, trusted agents, and luxury properties.",
    features: [
      "Listing search",
      "Map discovery",
      "Property details",
      "Lead capture",
      "Mortgage calculator"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#101820",
      "#8FAADC"
    ],
    icon: "Building2",
    status: "live",
    createdAt: "2024-01-28",
    updatedAt: "2024-03-08",
    tags: [
      "real-estate",
      "property",
      "luxury"
    ],
    visibility: "public",
    lastActivity: "2024-03-08",
    order: 9,
    industry: "Real Estate",
    publishState: "published",
    source: {
      type: "local",
      folder: "real-estate",
      detectedType: "html"
    },
    featuredHero: false
  },
  {
    slug: "urban-brew",
    title: "Urban Brew Café",
    category: "Café & Bakery",
    description: "Craft coffee, fresh bakery and a cozy workspace — explore our menu, seasonal specials, and loyalty rewards.",
    features: [
      "Menu showcase",
      "Online ordering",
      "Locations map",
      "Loyalty program"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design"
    ],
    palette: [
      "#17110b",
      "#D4A05B"
    ],
    icon: "Coffee",
    status: "live",
    createdAt: "2024-02-08",
    updatedAt: "2024-02-08",
    tags: [
      "cafe",
      "coffee",
      "bakery"
    ],
    visibility: "public",
    lastActivity: "2024-02-08",
    order: 10,
    industry: "Café & Bakery",
    publishState: "published",
    source: {
      type: "local",
      folder: "urban-brew",
      detectedType: "html"
    },
    featuredHero: false
  },
  {
    slug: "ai-saas",
    title: "NovaAI | Intelligent Automation Platform",
    category: "New category",
    industry: "New industry",
    description: "NovaAI - Next-generation AI platform that transforms how you work, create, and innovate with intelligent automation.",
    features: [],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    palette: [
      "#10131f",
      "#5f5ce6"
    ],
    icon: "Sparkles",
    status: "live",
    publishState: "published",
    visibility: "public",
    source: {
      type: "local",
      folder: "ai-saas",
      detectedType: "html"
    },
    tags: [],
    order: 11,
    featuredHero: false
  }
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}

export function getDemosByCategory(category: string) {
  return demos.filter((d) => d.category === category);
}

export function getDemosByTag(tag: string) {
  return demos.filter((d) => d.tags?.includes(tag));
}

export function getPopularDemos() {
  return demos.filter((d) => d.popular);
}

export function getLiveDemos() {
  return demos.filter((d) => d.status === "live");
}

export function getActiveDemos() {
  return demos.filter((d) => d.status !== "archived" && d.visibility !== "private");
}

export function searchDemos(query: string) {
  const lower = query.toLowerCase();
  return demos.filter(
    (d) =>
      d.title.toLowerCase().includes(lower) ||
      d.description.toLowerCase().includes(lower) ||
      d.category.toLowerCase().includes(lower) ||
      d.tags?.some((t) => t.toLowerCase().includes(lower))
  );
}

export function getDemosByStatus(status: "live" | "coming-soon" | "in-progress" | "archived") {
  return demos.filter((d) => d.status === status);
}

export function getDemosByVisibility(visibility: "public" | "private") {
  return demos.filter((d) => d.visibility === visibility);
}

export function getAllCategories() {
  const categories = new Set(demos.map((d) => d.category));
  return Array.from(categories).sort();
}