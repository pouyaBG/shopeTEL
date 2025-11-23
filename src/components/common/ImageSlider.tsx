import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface Slide {
  id: string;
  image: string;
  title?: string;
  description?: string;
  link?: string;
}

interface ImageSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  slides,
  autoPlay = true,
  interval = 3000,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      timeoutRef.current = setTimeout(goToNext, interval);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [currentIndex, autoPlay, interval, goToNext, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrev();
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="relative h-48 select-none overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides container with transition */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative shrink-0 w-full h-full px-3"
            >
              <div className="relative h-full w-full">
                <img
                  src={slide.image}
                  alt={slide.title || `Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                {index === currentIndex && (slide.title || slide.description) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                    {slide.title && (
                      <h3 className="text-white text-base font-bold mb-1 m-0">
                        {slide.title}
                      </h3>
                    )}
                    {slide.description && (
                      <p className="text-white/90 text-xs line-clamp-2 m-0">
                        {slide.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                index === currentIndex
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
