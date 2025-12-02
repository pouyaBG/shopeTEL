import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.css";

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
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={
          autoPlay && slides.length > 1
            ? {
                delay: interval,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={
          showIndicators && slides.length > 1
            ? {
                clickable: true,
                bulletClass:
                  "swiper-pagination-bullet !w-1.5 !h-1.5 !rounded-full !bg-white/50 !border-none !opacity-100 transition-all duration-300",
                bulletActiveClass:
                  "swiper-pagination-bullet-active !w-6 !bg-white",
              }
            : false
        }
        className="h-48 select-none ">
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="px-3">
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
              {(slide.title || slide.description) && (
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
