import type { Product } from "@/types";

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smart Kitchen Scale",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    description: "Precision digital kitchen scale with smart app connectivity.",
    category: "kitchen",
  },
  {
    id: "2",
    name: "Automatic Soap Dispenser",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    description: "Touchless soap dispenser with motion sensor.",
    category: "bathroom",
  },
  {
    id: "3",
    name: "Smart LED Light Bulb",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    description: "Color-changing smart bulb with voice control compatibility.",
    category: "living-room",
  },
  {
    id: "4",
    name: "Robot Vacuum Cleaner",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    description: "Automated vacuum with mapping technology and app control.",
    category: "cleaning",
  },
  {
    id: "5",
    name: "Minimalist Wall Clock",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    description: "Modern design wall clock with silent movement.",
    category: "home-decor",
  },
  {
    id: "6",
    name: "Smart Power Strip",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    description: "Wi-Fi enabled power strip with individual outlet control.",
    category: "electronics",
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    description: "Fast wireless charging pad for smartphones and earbuds.",
    category: "electronics",
  },
  {
    id: "8",
    name: "Air Purifier",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    description: "HEPA air purifier with air quality monitoring.",
    category: "home-decor",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all products
export async function getProducts(): Promise<Product[]> {
  await delay(1000); // Simulate network delay
  return mockProducts;
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  await delay(800);
  const product = mockProducts.find((p) => p.id === id);
  return product || null;
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  await delay(1000);
  return mockProducts.filter((p) => p.category === category);
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  await delay(1000);
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter((p) => p.name.toLowerCase().includes(lowercaseQuery) || p.description.toLowerCase().includes(lowercaseQuery));
}
