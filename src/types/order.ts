import type { CartItem } from './product';
import type { Address } from './user';

export type OrderStatus =
  | 'pending'        // در انتظار تایید
  | 'confirmed'      // تایید شده
  | 'preparing'      // در حال آماده‌سازی
  | 'shipped'        // ارسال شده
  | 'delivered'      // تحویل داده شده
  | 'cancelled';     // لغو شده

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;        // جمع محصولات
  deliveryFee: number;     // هزینه ارسال
  totalPrice: number;      // مبلغ کل
  address: Address;
  paymentMethod: 'online' | 'cash_on_delivery';
  createdAt: string;
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  trackingCode?: string;   // کد رهگیری
  notes?: string;          // یادداشت سفارش
}

export interface OrderStatusInfo {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

export const orderStatusMap: Record<OrderStatus, OrderStatusInfo> = {
  pending: {
    label: 'در انتظار تایید',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    icon: '⏱️',
  },
  confirmed: {
    label: 'تایید شده',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: '✅',
  },
  preparing: {
    label: 'در حال آماده‌سازی',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    icon: '📦',
  },
  shipped: {
    label: 'ارسال شده',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    icon: '🚚',
  },
  delivered: {
    label: 'تحویل داده شده',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: '✓',
  },
  cancelled: {
    label: 'لغو شده',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: '✕',
  },
};
