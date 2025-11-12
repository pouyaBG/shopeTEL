import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Trash, Plus, Minus, ShoppingCartSimple } from '@phosphor-icons/react';
import { Modal } from '../components/common/Modal';

export const CartPage: React.FC = () => {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, totalPrice } = useCart();
  const [showClearModal, setShowClearModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const deliveryFee = 50000; // هزینه ارسال ثابت
  const finalPrice = items.length > 0 ? totalPrice + deliveryFee : 0;

  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-10 bg-linear-to-b from-gray-50 to-white">
        <div className="text-center max-w-xs">
          <div className="text-[80px] mb-5 opacity-70">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">سبد خرید خالی است</h2>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید
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
              <h1 className="m-0 text-xl md:text-lg font-bold mb-1">سبد خرید</h1>
              <p className="m-0 text-xs opacity-90">{items.length} محصول</p>
            </div>
            <button
              onClick={() => setShowClearModal(true)}
              className="px-4 py-2 bg-white/20 text-white rounded-xl text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-white/30"
            >
              پاک کردن همه
            </button>
          </div>
        </header>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            >
              <div className="flex gap-3">
                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border-none cursor-pointer transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus size={16} weight="bold" className="text-gray-700" />
                      </button>
                      <span className="text-sm font-bold text-gray-800 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        disabled={item.quantity >= item.stock}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border-none cursor-pointer transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} weight="bold" className="text-gray-700" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-left">
                      <div className="text-sm font-bold text-primary-start">
                        {formatPrice(item.price * item.quantity)} تومان
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-gray-400">
                          {formatPrice(item.price)} × {item.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    setItemToRemove(item.id);
                    setShowRemoveModal(true);
                  }}
                  className="self-start p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-red-50"
                >
                  <Trash size={20} weight="bold" className="text-red-500" />
                </button>
              </div>

              {/* Stock Warning */}
              {item.quantity >= item.stock && (
                <div className="mt-3 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-xs text-orange-600 m-0">
                    حداکثر موجودی این محصول {item.stock} عدد است
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Summary - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 pb-16">
        <div className="max-w-[480px] mx-auto px-4 py-4">
          {/* Price Details */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">جمع کل محصولات:</span>
              <span className="font-semibold text-gray-800">{formatPrice(totalPrice)} تومان</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">هزینه ارسال:</span>
              <span className="font-semibold text-gray-800">{formatPrice(deliveryFee)} تومان</span>
            </div>
            <div className="h-px bg-gray-200 my-1" />
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-gray-800">مبلغ قابل پرداخت:</span>
              <span className="text-lg font-bold text-primary-start">{formatPrice(finalPrice)} تومان</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="w-full px-6 py-4 bg-linear-to-br from-primary-start to-primary-end text-white border-none rounded-xl text-base font-bold cursor-pointer transition-all duration-300 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
            <ShoppingCartSimple size={24} weight="fill" />
            <span>تکمیل خرید</span>
          </button>
        </div>
      </div>

      {/* Remove Item Confirmation Modal */}
      <Modal
        isOpen={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false);
          setItemToRemove(null);
        }}
        title="حذف از سبد خرید"
        message="آیا مطمئن هستید که می‌خواهید این محصول را از سبد خرید حذف کنید؟"
        primaryButton={{
          label: "بله، حذف کن",
          onClick: () => {
            if (itemToRemove) {
              removeFromCart(itemToRemove);
            }
            setShowRemoveModal(false);
            setItemToRemove(null);
          },
        }}
        secondaryButton={{
          label: "انصراف",
          onClick: () => {
            setShowRemoveModal(false);
            setItemToRemove(null);
          },
        }}
      />

      {/* Clear Cart Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="پاک کردن سبد خرید"
        message="آیا مطمئن هستید که می‌خواهید تمام محصولات را از سبد خرید حذف کنید؟"
        primaryButton={{
          label: "بله، پاک کن",
          onClick: () => {
            clearCart();
            setShowClearModal(false);
          },
        }}
        secondaryButton={{
          label: "انصراف",
          onClick: () => setShowClearModal(false),
        }}
      />
    </div>
  );
};
