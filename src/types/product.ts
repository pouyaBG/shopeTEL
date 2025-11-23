export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // تصاویر اضافی
  category: string;
  description: string;
  stock: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  specifications?: ProductSpecification[];
  features?: string[];
  reviews?: Review[];
  colors?: { name: string; hex: string; available: boolean }[];
  warranty?: string;
  seller?: string;
  sellerId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
