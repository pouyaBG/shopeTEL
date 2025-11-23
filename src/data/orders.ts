import type { Order } from '../types/order';
import { mockProducts } from './products';
import { mockAddresses } from './addresses';

// تبدیل محصولات به CartItem برای استفاده در سفارشات
const createCartItem = (productId: string, quantity: number) => {
  const product = mockProducts.find(p => p.id === productId);
  if (!product) throw new Error(`Product ${productId} not found`);
  return { ...product, quantity };
};

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    status: 'delivered',
    items: [
      createCartItem('1', 1),
      createCartItem('3', 1),
    ],
    subtotal: 20000000,
    deliveryFee: 50000,
    totalPrice: 20050000,
    address: mockAddresses[0],
    paymentMethod: 'online',
    createdAt: '2024-11-15T10:30:00Z',
    confirmedAt: '2024-11-15T11:00:00Z',
    shippedAt: '2024-11-16T09:00:00Z',
    deliveredAt: '2024-11-18T14:30:00Z',
    trackingCode: 'TRK-98765432',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    status: 'shipped',
    items: [
      createCartItem('2', 1),
    ],
    subtotal: 22000000,
    deliveryFee: 50000,
    totalPrice: 22050000,
    address: mockAddresses[0],
    paymentMethod: 'cash_on_delivery',
    createdAt: '2024-11-20T14:20:00Z',
    confirmedAt: '2024-11-20T15:00:00Z',
    shippedAt: '2024-11-21T10:00:00Z',
    trackingCode: 'TRK-87654321',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    status: 'preparing',
    items: [
      createCartItem('4', 2),
      createCartItem('5', 1),
    ],
    subtotal: 7400000,
    deliveryFee: 50000,
    totalPrice: 7450000,
    address: mockAddresses[1],
    paymentMethod: 'online',
    createdAt: '2024-11-22T09:15:00Z',
    confirmedAt: '2024-11-22T10:00:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    status: 'confirmed',
    items: [
      createCartItem('6', 1),
      createCartItem('7', 1),
    ],
    subtotal: 15700000,
    deliveryFee: 50000,
    totalPrice: 15750000,
    address: mockAddresses[0],
    paymentMethod: 'online',
    createdAt: '2024-11-23T08:00:00Z',
    confirmedAt: '2024-11-23T08:30:00Z',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    status: 'pending',
    items: [
      createCartItem('8', 1),
    ],
    subtotal: 18500000,
    deliveryFee: 50000,
    totalPrice: 18550000,
    address: mockAddresses[2],
    paymentMethod: 'cash_on_delivery',
    createdAt: '2024-11-23T11:00:00Z',
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-006',
    status: 'cancelled',
    items: [
      createCartItem('1', 1),
    ],
    subtotal: 15500000,
    deliveryFee: 50000,
    totalPrice: 15550000,
    address: mockAddresses[0],
    paymentMethod: 'online',
    createdAt: '2024-11-10T16:00:00Z',
    confirmedAt: '2024-11-10T16:30:00Z',
    cancelledAt: '2024-11-11T10:00:00Z',
    notes: 'لغو شده به درخواست مشتری',
  },
];
