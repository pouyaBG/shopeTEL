import React from 'react';

export const CartPage: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-10 bg-linear-to-b from-gray-50 to-white">
      <div className="text-center max-w-xs">
        <div className="text-[80px] mb-5 opacity-70">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">سبد خرید</h2>
        <p className="text-[15px] text-gray-500 leading-relaxed">این بخش به زودی راه‌اندازی می‌شود</p>
      </div>
    </div>
  );
};
