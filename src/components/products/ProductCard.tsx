import React from 'react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full hover:shadow-md hover:-translate-y-1 cursor-pointer border border-gray-100">
      <div className="relative w-full pt-[100%] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
            {product.discount}%
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2 min-h-9">
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-xs">★</span>
            <span className="text-xs font-medium text-gray-600">{product.rating}</span>
          </div>
        )}

        <div className="flex flex-col gap-0.5 mt-auto">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-800">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500">تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
};
