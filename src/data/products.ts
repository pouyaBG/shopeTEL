import type { Product } from "../types/product";


export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'هدفون بلوتوثی Sony WH-1000XM5',
    price: 15500000,
    originalPrice: 18000000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'لوازم جانبی',
    description: 'هدفون بی‌سیم با کیفیت صدای عالی و قابلیت حذف نویز',
    stock: 15,
    discount: 14,
    rating: 4.8,
    reviewCount: 234
  },
  {
    id: '2',
    name: 'ساعت هوشمند Apple Watch Series 9',
    price: 22000000,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop',
    category: 'ساعت هوشمند',
    description: 'ساعت هوشمند با امکانات پیشرفته سلامتی و تناسب اندام',
    stock: 8,
    rating: 4.9,
    reviewCount: 567
  },
  {
    id: '3',
    name: 'کیبورد مکانیکی Keychron K8',
    price: 4500000,
    originalPrice: 5200000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    category: 'لوازم جانبی',
    description: 'کیبورد مکانیکی بی‌سیم با کلیدهای Hot-Swappable',
    stock: 22,
    discount: 13,
    rating: 4.7,
    reviewCount: 189
  },
  {
    id: '4',
    name: 'موس گیمینگ Logitech G502',
    price: 2800000,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'لوازم جانبی',
    description: 'موس گیمینگ حرفه‌ای با سنسور HERO و وزن قابل تنظیم',
    stock: 30,
    rating: 4.6,
    reviewCount: 445
  },
  {
    id: '5',
    name: 'پاور بانک Anker 20000mAh',
    price: 1800000,
    originalPrice: 2100000,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    category: 'لوازم جانبی',
    description: 'پاور بانک با ظرفیت بالا و شارژ سریع',
    stock: 45,
    discount: 14,
    rating: 4.5,
    reviewCount: 678
  },
  {
    id: '6',
    name: 'هندزفری بی‌سیم AirPods Pro 2',
    price: 12500000,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&h=500&fit=crop',
    category: 'لوازم جانبی',
    description: 'هندزفری بی‌سیم با قابلیت حذف نویز فعال و صدای فضایی',
    stock: 12,
    rating: 4.9,
    reviewCount: 892
  },
  {
    id: '7',
    name: 'وب‌کم Logitech C920 HD Pro',
    price: 3200000,
    originalPrice: 3800000,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop',
    category: 'لوازم جانبی',
    description: 'وب‌کم با کیفیت Full HD برای استریمینگ و ویدیو کنفرانس',
    stock: 18,
    discount: 16,
    rating: 4.4,
    reviewCount: 321
  },
  {
    id: '8',
    name: 'مانیتور گیمینگ ASUS ROG 27"',
    price: 18500000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
    category: 'مانیتور',
    description: 'مانیتور گیمینگ 144Hz با پنل IPS و زمان پاسخ 1ms',
    stock: 6,
    rating: 4.8,
    reviewCount: 156
  }
];
