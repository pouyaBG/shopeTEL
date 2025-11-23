import React, { useState } from 'react';
import { ArrowRight, Package, Clock, CheckCircle, XCircle, Truck, WarningCircle } from '@phosphor-icons/react';
import { Modal } from '../components/common/Modal';

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
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalPrice: number;
  deliveryFee: number;
  trackingCode?: string;
}

interface OrderDetailPageProps {
  order: Order;
  onBack: () => void;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ order, onBack }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [returnReason, setReturnReason] = useState('');

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock size={24} weight="fill" />,
          text: 'در انتظار پردازش',
          color: 'bg-yellow-100 text-yellow-600',
          borderColor: 'border-yellow-200',
        };
      case 'processing':
        return {
          icon: <Package size={24} weight="fill" />,
          text: 'در حال پردازش',
          color: 'bg-blue-100 text-blue-600',
          borderColor: 'border-blue-200',
        };
      case 'delivered':
        return {
          icon: <CheckCircle size={24} weight="fill" />,
          text: 'تحویل داده شد',
          color: 'bg-green-100 text-green-600',
          borderColor: 'border-green-200',
        };
      case 'cancelled':
        return {
          icon: <XCircle size={24} weight="fill" />,
          text: 'لغو شده',
          color: 'bg-red-100 text-red-600',
          borderColor: 'border-red-200',
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const canCancel = order.status === 'pending' || order.status === 'processing';
  const canReturn = order.status === 'delivered';

  const handleCancelOrder = () => {
    console.log('Cancel order:', order.id, 'Reason:', cancelReason);
    setShowCancelModal(false);
    setCancelReason('');
    // اینجا باید API برای لغو سفارش صدا بزنیم
  };

  const handleReturnOrder = () => {
    console.log('Return order:', order.id, 'Reason:', returnReason);
    setShowReturnModal(false);
    setReturnReason('');
    // اینجا باید API برای مرجوعی صدا بزنیم
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-none bg-transparent cursor-pointer shrink-0"
          >
            <ArrowRight size={24} weight="bold" className="text-gray-800" />
          </button>
          <h1 className="text-base font-bold text-gray-800 mr-3">
            جزئیات سفارش #{order.id}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Status Card */}
        <div className="bg-white p-4 mb-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">وضعیت سفارش:</p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${statusConfig.color}`}>
                {statusConfig.icon}
                <span className="text-sm font-bold">{statusConfig.text}</span>
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">تاریخ ثبت</p>
              <p className="text-sm font-semibold text-gray-800">{order.date}</p>
            </div>
          </div>

          {/* Tracking Code */}
          {order.trackingCode && (
            <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-primary-start" />
                <span className="text-sm text-gray-600">کد رهگیری:</span>
              </div>
              <span className="text-sm font-mono font-bold text-gray-800">
                {order.trackingCode}
              </span>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white p-4 mb-2">
          <h2 className="text-base font-bold text-gray-800 mb-3">محصولات سفارش</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                    {item.productName}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">تعداد: {item.quantity}</span>
                    <span className="text-sm font-bold text-gray-800">
                      {formatPrice(item.price * item.quantity)} تومان
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white p-4 mb-2">
          <h2 className="text-base font-bold text-gray-800 mb-3">اطلاعات پرداخت</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">جمع محصولات:</span>
              <span className="text-sm font-semibold text-gray-800">
                {formatPrice(order.totalPrice)} تومان
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">هزینه ارسال:</span>
              <span className="text-sm font-semibold text-gray-800">
                {formatPrice(order.deliveryFee)} تومان
              </span>
            </div>
            <div className="flex items-center justify-between py-3 bg-gray-50 rounded-xl px-3 mt-2">
              <span className="text-base font-bold text-gray-800">مبلغ کل:</span>
              <span className="text-lg font-bold text-primary-start">
                {formatPrice(order.totalPrice + order.deliveryFee)} تومان
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Timeline */}
        {order.status === 'processing' && (
          <div className="bg-white p-4 mb-2">
            <h2 className="text-base font-bold text-gray-800 mb-3">مراحل ارسال</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle size={20} className="text-green-600" weight="fill" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">سفارش ثبت شد</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Package size={20} className="text-blue-600" weight="fill" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">در حال پردازش</p>
                  <p className="text-xs text-gray-500">در حال آماده‌سازی</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <Truck size={20} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-400">ارسال شده</p>
                  <p className="text-xs text-gray-400">در انتظار ارسال</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Warning for Cancel/Return */}
        {(canCancel || canReturn) && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mx-4 mb-4">
            <div className="flex items-start gap-3">
              <WarningCircle size={20} className="text-orange-600 shrink-0 mt-0.5" weight="fill" />
              <div>
                <p className="text-sm font-semibold text-orange-800 mb-1">توجه</p>
                <p className="text-xs text-orange-700 leading-relaxed">
                  {canCancel && 'درصورت لغو سفارش، مبلغ پرداختی ظرف 48 ساعت به حساب شما بازگردانده می‌شود.'}
                  {canReturn && 'درخواست مرجوعی تا 7 روز بعد از تحویل امکان‌پذیر است.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      {(canCancel || canReturn) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 pb-16">
          <div className="max-w-[480px] mx-auto px-4 py-3 flex gap-2">
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="flex-1 px-6 py-3 bg-white text-red-600 border-2 border-red-600 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 hover:bg-red-50"
              >
                لغو سفارش
              </button>
            )}
            {canReturn && (
              <button
                onClick={() => setShowReturnModal(true)}
                className="flex-1 px-6 py-3 bg-orange-500 text-white border-none rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 hover:bg-orange-600"
              >
                درخواست مرجوعی
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="لغو سفارش"
        message={
          <div className="text-right space-y-4">
            <p className="text-sm text-gray-600">
              آیا مطمئن هستید که می‌خواهید این سفارش را لغو کنید؟
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                دلیل لغو (اختیاری):
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="دلیل لغو خود را بنویسید..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                rows={3}
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                مبلغ پرداختی شما ظرف 48 ساعت به حساب بانکی بازگردانده می‌شود.
              </p>
            </div>
          </div>
        }
        primaryButton={{
          label: 'تایید لغو',
          onClick: handleCancelOrder,
        }}
        secondaryButton={{
          label: 'انصراف',
          onClick: () => setShowCancelModal(false),
        }}
      />

      {/* Return Modal */}
      <Modal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        title="درخواست مرجوعی"
        message={
          <div className="text-right space-y-4">
            <p className="text-sm text-gray-600">
              لطفاً دلیل مرجوعی کالا را مشخص کنید:
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                دلیل مرجوعی:
              </label>
              <textarea
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                placeholder="دلیل مرجوعی (مثلاً: کالا معیوب است، با تصویر مطابقت ندارد و...)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                rows={4}
                required
              />
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-xs text-orange-800 leading-relaxed">
                • کالا باید در بسته‌بندی اصلی و بدون استفاده باشد<br />
                • حداکثر 7 روز پس از تحویل امکان مرجوعی وجود دارد<br />
                • هزینه ارسال مرجوعی به عهده فروشگاه است
              </p>
            </div>
          </div>
        }
        primaryButton={{
          label: 'ثبت درخواست',
          onClick: handleReturnOrder,
        }}
        secondaryButton={{
          label: 'انصراف',
          onClick: () => setShowReturnModal(false),
        }}
      />
    </div>
  );
};
