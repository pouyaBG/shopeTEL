import {
  CheckCircleIcon,
  ClockIcon,
  Eye,
  PackageIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import React from "react";

interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  items: OrderItem[];
  totalPrice: number;
  deliveryFee: number;
  trackingCode?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "1402/11/15",
    status: "delivered",
    trackingCode: "1234567890",
    items: [
      {
        id: "1",
        productName: "هدفون بلوتوثی Sony WH-1000XM5",
        productImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&auto=format",
        quantity: 1,
        price: 15500000,
      },
      {
        id: "2",
        productName: "پاور بانک Anker 20000mAh",
        productImage:
          "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop&auto=format",
        quantity: 2,
        price: 1800000,
      },
    ],
    totalPrice: 19100000,
    deliveryFee: 50000,
  },
  {
    id: "ORD-002",
    date: "1402/11/20",
    status: "processing",
    trackingCode: "0987654321",
    items: [
      {
        id: "3",
        productName: "کیبورد مکانیکی Keychron K8",
        productImage:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop&auto=format",
        quantity: 1,
        price: 4500000,
      },
    ],
    totalPrice: 4500000,
    deliveryFee: 50000,
  },
  {
    id: "ORD-003",
    date: "1402/11/22",
    status: "pending",
    items: [
      {
        id: "4",
        productName: "موس گیمینگ Logitech G502",
        productImage:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop&auto=format",
        quantity: 1,
        price: 2800000,
      },
    ],
    totalPrice: 2800000,
    deliveryFee: 50000,
  },
];

interface OrdersPageProps {
  onOrderClick: (order: Order) => void;
}

export const OrdersPage: React.FC<OrdersPageProps> = ({ onOrderClick }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const getStatusConfig = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return {
          icon: <ClockIcon size={20} weight="fill" />,
          text: "در انتظار پردازش",
          color: "bg-yellow-100 text-yellow-600",
          borderColor: "border-yellow-200",
        };
      case "processing":
        return {
          icon: <PackageIcon size={20} weight="fill" />,
          text: "در حال پردازش",
          color: "bg-blue-100 text-blue-600",
          borderColor: "border-blue-200",
        };
      case "delivered":
        return {
          icon: <CheckCircleIcon size={20} weight="fill" />,
          text: "تحویل داده شد",
          color: "bg-green-100 text-green-600",
          borderColor: "border-green-200",
        };
      case "cancelled":
        return {
          icon: <XCircleIcon size={20} weight="fill" />,
          text: "لغو شده",
          color: "bg-red-100 text-red-600",
          borderColor: "border-red-200",
        };
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <header className="bg-linear-to-br from-primary-start to-primary-end text-white px-5 py-5 md:py-4">
          <h1 className="m-0 text-xl md:text-lg font-bold mb-1">سفارشات من</h1>
          <p className="m-0 text-xs opacity-90">{mockOrders.length} سفارش</p>
        </header>
      </div>

      {/* Orders Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        {mockOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-[80px] mb-5 opacity-70">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              سفارشی یافت نشد
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed">
              هنوز سفارشی ثبت نکرده‌اید
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mockOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                    <div>
                      <p className="text-sm font-bold text-gray-800 m-0 mb-1">
                        سفارش #{order.id}
                      </p>
                      <p className="text-xs text-gray-500 m-0">{order.date}</p>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${statusConfig.color}`}>
                      {statusConfig.icon}
                      <span className="text-xs font-semibold">
                        {statusConfig.text}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 mb-3">
                    {order.items.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">
                            {item.productName}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              تعداد: {item.quantity}
                            </span>
                            <span className="text-sm font-bold text-primary-start">
                              {formatPrice(item.price * item.quantity)} تومان
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-gray-500 text-center py-1">
                        و {order.items.length - 2} محصول دیگر
                      </p>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 m-0 mb-1">مبلغ کل:</p>
                      <p className="text-base font-bold text-gray-800 m-0">
                        {formatPrice(order.totalPrice + order.deliveryFee)}{" "}
                        تومان
                      </p>
                    </div>
                    <button
                      onClick={() => onOrderClick(order)}
                      className="px-4 py-2 bg-primary-start text-white rounded-lg text-sm font-semibold border-none cursor-pointer hover:bg-primary-end transition-colors flex items-center gap-2">
                      <Eye size={18} weight="bold" />
                      <span>جزئیات</span>
                    </button>
                  </div>

                  {/* Tracking Code */}
                  {order.trackingCode && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                        <span className="text-xs text-gray-600">
                          کد رهگیری:
                        </span>
                        <span className="text-sm font-mono font-bold text-gray-800">
                          {order.trackingCode}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
