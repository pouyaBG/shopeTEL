import React, { useState } from 'react';
import { mockOrders } from '../data/orders';
import { orderStatusMap, type OrderStatus, type Order } from '../types/order';
import { Drawer } from '../components/common/Drawer';
import {
  Package,
  MapPin,
  Calendar,
  CreditCard,
  Barcode,
  FadersHorizontal,
  X,
} from '@phosphor-icons/react';

export const OrdersPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // فیلتر سفارشات
  const filteredOrders = mockOrders.filter(
    (order) => selectedStatus === 'all' || order.status === selectedStatus
  );

  // محاسبه تعداد سفارشات هر وضعیت
  const statusCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === 'pending').length,
    confirmed: mockOrders.filter((o) => o.status === 'confirmed').length,
    preparing: mockOrders.filter((o) => o.status === 'preparing').length,
    shipped: mockOrders.filter((o) => o.status === 'shipped').length,
    delivered: mockOrders.filter((o) => o.status === 'delivered').length,
    cancelled: mockOrders.filter((o) => o.status === 'cancelled').length,
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  // کامپوننت Order Timeline
  const OrderTimeline: React.FC<{ order: Order }> = ({ order }) => {
    const steps = [
      { key: 'pending', label: 'ثبت سفارش', date: order.createdAt },
      { key: 'confirmed', label: 'تایید شده', date: order.confirmedAt },
      { key: 'preparing', label: 'آماده‌سازی', date: order.createdAt },
      { key: 'shipped', label: 'ارسال شده', date: order.shippedAt },
      { key: 'delivered', label: 'تحویل داده شده', date: order.deliveredAt },
    ];

    const statusOrder = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);

    if (order.status === 'cancelled') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-xl">✕</span>
            </div>
            <div>
              <p className="font-bold text-red-600 m-0">سفارش لغو شده</p>
              {order.cancelledAt && (
                <p className="text-xs text-red-500 m-0 mt-1">
                  {formatDate(order.cancelledAt)}
                </p>
              )}
              {order.notes && (
                <p className="text-xs text-red-600 m-0 mt-2">{order.notes}</p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="flex gap-3">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-primary-start border-primary-start text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-primary-start/20' : ''}`}
                >
                  {isCompleted ? (
                    <span className="text-lg">✓</span>
                  ) : (
                    <span className="text-lg">○</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-8 ${
                      isCompleted ? 'bg-primary-start' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 pb-8">
                <p
                  className={`font-semibold text-sm m-0 ${
                    isCompleted ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>
                {step.date && isCompleted && (
                  <p className="text-xs text-gray-500 m-0 mt-1">
                    {formatDate(step.date)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (mockOrders.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-10 bg-linear-to-b from-gray-50 to-white">
        <div className="text-center max-w-xs">
          <div className="text-[80px] mb-5 opacity-70">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            هنوز سفارشی ندارید
          </h2>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            بعد از ثبت اولین سفارش، اینجا نمایش داده می‌شود
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-linear-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <header className="bg-linear-to-br from-primary-start to-primary-end text-white px-5 py-5 md:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="m-0 text-xl md:text-lg font-bold mb-1">
                سفارشات من
              </h1>
              <p className="m-0 text-xs opacity-90">
                {filteredOrders.length} سفارش
              </p>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="px-4 py-2 bg-white/20 text-white rounded-xl flex items-center gap-2 border-none cursor-pointer transition-all duration-200 hover:bg-white/30"
            >
              <FadersHorizontal size={20} weight="bold" />
              <span className="text-sm font-medium">فیلتر</span>
            </button>
          </div>
        </header>

        {/* Selected Filter Indicator */}
        {selectedStatus !== 'all' && (
          <div className="px-4 py-2">
            <div className="inline-flex items-center gap-2 bg-primary-start/10 text-primary-start px-3 py-1.5 rounded-full text-xs font-medium">
              <span>فیلتر: {orderStatusMap[selectedStatus].label}</span>
              <button
                onClick={() => setSelectedStatus('all')}
                className="bg-transparent border-none cursor-pointer p-0"
              >
                <X size={14} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-6xl mb-4 opacity-50">📦</div>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              سفارشی یافت نشد
            </p>
            <p className="text-sm text-gray-400 m-0">
              لطفاً فیلتر خود را تغییر دهید
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredOrders.map((order) => {
              const statusInfo = orderStatusMap[order.status];
              return (
                <div
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-800 m-0">
                        {order.orderNumber}
                      </h3>
                      <p className="text-xs text-gray-500 m-0 mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`${statusInfo.bgColor} ${statusInfo.color} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}
                    >
                      <span>{statusInfo.icon}</span>
                      <span>{statusInfo.label}</span>
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-600 text-xs">
                      <Package size={16} weight="bold" />
                      <span>{order.items.length} محصول</span>
                    </div>
                    <div className="text-sm font-bold text-primary-start">
                      {formatPrice(order.totalPrice)} تومان
                    </div>
                  </div>

                  {/* Tracking Code */}
                  {order.trackingCode && (
                    <div className="mt-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Barcode size={16} className="text-blue-600" />
                        <span className="text-xs text-blue-600 font-medium">
                          کد رهگیری: {order.trackingCode}
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

      {/* Filter Drawer */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="فیلتر وضعیت سفارش"
      >
        <div className="flex flex-col gap-2">
          {/* All Orders */}
          <button
            onClick={() => {
              setSelectedStatus('all');
              setIsFilterOpen(false);
            }}
            className={`w-full text-right px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              selectedStatus === 'all'
                ? 'bg-primary-start text-white border-primary-start font-semibold'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary-start hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>📦 همه سفارشات</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {statusCounts.all}
              </span>
            </div>
          </button>

          {/* Status Filters */}
          {(Object.keys(orderStatusMap) as OrderStatus[]).map((status) => {
            const info = orderStatusMap[status];
            const count = statusCounts[status];

            return (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(status);
                  setIsFilterOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-primary-start text-white border-primary-start font-semibold'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-start hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    {info.icon} {info.label}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Drawer>

      {/* Order Detail Drawer */}
      <Drawer
        isOpen={isOrderDetailOpen}
        onClose={() => {
          setIsOrderDetailOpen(false);
          setSelectedOrder(null);
        }}
        title="جزئیات سفارش"
      >
        {selectedOrder && (
          <div className="space-y-4">
            {/* Order Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 m-0">
                  {selectedOrder.orderNumber}
                </h3>
                <span
                  className={`${
                    orderStatusMap[selectedOrder.status].bgColor
                  } ${
                    orderStatusMap[selectedOrder.status].color
                  } px-3 py-1 rounded-full text-xs font-medium`}
                >
                  {orderStatusMap[selectedOrder.status].icon}{' '}
                  {orderStatusMap[selectedOrder.status].label}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} weight="bold" />
                  <span>تاریخ ثبت: {formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CreditCard size={16} weight="bold" />
                  <span>
                    روش پرداخت:{' '}
                    {selectedOrder.paymentMethod === 'online'
                      ? 'پرداخت آنلاین'
                      : 'پرداخت در محل'}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="text-sm font-bold text-gray-800 mb-4">
                پیگیری سفارش
              </h4>
              <OrderTimeline order={selectedOrder} />
            </div>

            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="text-sm font-bold text-gray-800 mb-3">
                محصولات ({selectedOrder.items.length})
              </h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-gray-800 line-clamp-2 m-0">
                        {item.name}
                      </h5>
                      <div className="flex items-center justify-between mt-2">
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
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} weight="bold" className="text-primary-start" />
                <h4 className="text-sm font-bold text-gray-800 m-0">
                  آدرس تحویل
                </h4>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-semibold text-gray-800 m-0">
                  {selectedOrder.address.title}
                </p>
                <p className="m-0">{selectedOrder.address.address}</p>
                <p className="m-0">
                  {selectedOrder.address.cityName}،{' '}
                  {selectedOrder.address.provinceName}
                </p>
                <p className="m-0">
                  کد پستی: {selectedOrder.address.postalCode}
                </p>
                <p className="m-0">
                  گیرنده: {selectedOrder.address.receiverName} -{' '}
                  {selectedOrder.address.receiverPhone}
                </p>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-sm font-bold text-gray-800 mb-3">
                خلاصه مالی
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">جمع محصولات:</span>
                  <span className="font-semibold text-gray-800">
                    {formatPrice(selectedOrder.subtotal)} تومان
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">هزینه ارسال:</span>
                  <span className="font-semibold text-gray-800">
                    {formatPrice(selectedOrder.deliveryFee)} تومان
                  </span>
                </div>
                <div className="h-px bg-gray-300 my-2" />
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">مبلغ کل:</span>
                  <span className="font-bold text-primary-start text-base">
                    {formatPrice(selectedOrder.totalPrice)} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
