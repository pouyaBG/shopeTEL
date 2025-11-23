import React, { useRef, useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../../types/product";
import { Lightning, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface AmazingOffersProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const AmazingOffers: React.FC<AmazingOffersProps> = ({
  products,
  onProductClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="relative py-4 bg-linear-to-br from-red-500 via-red-600 to-pink-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Lightning size={24} weight="fill" className="text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white m-0">
                پیشنهادات شگفت‌انگیز
              </h2>
              <p className="text-xs text-white/90 m-0">
                تا پایان فرصت باقیمانده
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex gap-1 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
            <div className="flex flex-col items-center min-w-8">
              <span className="text-white text-lg font-bold leading-none">
                {formatTime(timeLeft.hours)}
              </span>
              <span className="text-white/70 text-[10px]">ساعت</span>
            </div>
            <span className="text-white text-lg font-bold">:</span>
            <div className="flex flex-col items-center min-w-8">
              <span className="text-white text-lg font-bold leading-none">
                {formatTime(timeLeft.minutes)}
              </span>
              <span className="text-white/70 text-[10px]">دقیقه</span>
            </div>
            <span className="text-white text-lg font-bold">:</span>
            <div className="flex flex-col items-center min-w-8">
              <span className="text-white text-lg font-bold leading-none">
                {formatTime(timeLeft.seconds)}
              </span>
              <span className="text-white/70 text-[10px]">ثانیه</span>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Scroll buttons */}
          {products.length > 2 && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full shadow-lg border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-white/40"
                aria-label="قبلی">
                <ArrowLeft size={20} weight="bold" className="text-white" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full shadow-lg border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-white/40"
                aria-label="بعدی">
                <ArrowRight size={20} weight="bold" className="text-white" />
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
            {products.map((product) => (
              <div key={product.id} className="shrink-0 w-40">
                <ProductCard product={product} onClick={onProductClick} />
              </div>
            ))}
          </div>
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
