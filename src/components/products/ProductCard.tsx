import React from 'react';
import type { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { Plus, Minus, Trash } from '@phosphor-icons/react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onRequestRemove?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onRequestRemove }) => {
  const { items, increaseQuantity, decreaseQuantity } = useCart();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const cartItem = items.find(item => item.id === product.id);
  const inCart = !!cartItem;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-0.5">
      <div className="relative w-full pt-[100%] overflow-hidden bg-linear-to-br from-gray-100 to-gray-300">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {product.discount && (
          <div className="absolute top-3 right-3 bg-linear-to-br from-pink-400 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_8px_rgba(245,87,108,0.3)] z-2">
            {product.discount}% تخفیف
          </div>
        )}
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded-full text-[11px] font-semibold z-2">
            فقط {product.stock} عدد
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-[11px] font-semibold z-2">
            ناموجود
          </div>
        )}
      </div>

      <div className="p-4 md:p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-[15px] md:text-sm font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[42px]">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 m-0">{product.category}</p>

        {product.rating && (
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="leading-none text-sm">
              {'⭐'.repeat(Math.round(product.rating))}
            </span>
            <span className="text-yellow-500 font-semibold">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-gray-400 text-xs">({product.reviewCount} نظر)</span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1 mt-auto pt-2">
          {product.originalPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              {formatPrice(product.originalPrice)} تومان
            </span>
          )}
          <span className="text-base font-bold text-primary-start">
            {formatPrice(product.price)} تومان
          </span>
        </div>

        {!inCart ? (
          <button
            className="w-full px-3 py-3 md:py-2.5 bg-linear-to-br from-primary-start to-primary-end text-white border-none rounded-xl text-sm md:text-[13px] font-semibold cursor-pointer transition-all duration-300 mt-2 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'ناموجود' : 'افزودن به سبد'}
          </button>
        ) : (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => {
                  if (cartItem.quantity === 1) {
                    onRequestRemove?.(product);
                  } else {
                    decreaseQuantity(product.id);
                  }
                }}
                className="flex-1 h-10 flex items-center justify-center bg-white rounded-lg border-none cursor-pointer transition-all duration-200 hover:bg-gray-50"
              >
                {cartItem.quantity === 1 ? (
                  <Trash size={18} weight="bold" className="text-red-500" />
                ) : (
                  <Minus size={18} weight="bold" className="text-gray-700" />
                )}
              </button>
              <span className="text-sm font-bold text-gray-800 min-w-[28px] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(product.id)}
                disabled={cartItem.quantity >= product.stock}
                className="flex-1 h-10 flex items-center justify-center bg-white rounded-lg border-none cursor-pointer transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={18} weight="bold" className="text-gray-700" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
