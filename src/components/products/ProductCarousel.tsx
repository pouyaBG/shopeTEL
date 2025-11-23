import React, { useRef } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../../types/product";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onViewAll?: () => void;
  maxItems?: number;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  onProductClick,
  onViewAll,
  maxItems = 15,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const displayProducts = products.slice(0, maxItems);

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg font-bold text-gray-800 m-0">{title}</h2>
        {onViewAll && products.length > maxItems && (
          <button
            onClick={onViewAll}
            className="text-sm font-semibold text-primary-start hover:text-primary-dark transition-colors border-none bg-transparent cursor-pointer">
            مشاهده همه
          </button>
        )}
      </div>

      {/* Carousel */}
      <div className="relative group">
        {/* Scroll buttons */}
        {displayProducts.length > 2 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-gray-50"
              aria-label="قبلی">
              <ArrowLeft size={20} weight="bold" className="text-gray-800" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-gray-50"
              aria-label="بعدی">
              <ArrowRight size={20} weight="bold" className="text-gray-800" />
            </button>
          </>
        )}

        {/* Products */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
          {displayProducts.map((product) => (
            <div key={product.id} className="shrink-0 w-40">
              <ProductCard product={product} onClick={onProductClick} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
