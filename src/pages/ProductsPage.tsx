import {
  MagnifyingGlassIcon,
  SlidersHorizontalIcon
} from "@phosphor-icons/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import { Drawer } from "../components/common/Drawer";
import { ImageSlider, type Slide } from "../components/common/ImageSlider";
import { AmazingOffers } from "../components/products/AmazingOffers";
import { ProductCard } from "../components/products/ProductCard";
import { ProductCarousel } from "../components/products/ProductCarousel";
import { mockProducts } from "../data/products";
import type { Product } from "../types/product";

interface ProductsPageProps {
  onProductClick: (product: Product) => void;
}

// نمونه اسلایدها
const heroSlides: Slide[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop",
    title: "جدیدترین محصولات تکنولوژی",
    description: "تا 50% تخفیف ویژه",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=600&fit=crop",
    title: "لوازم جانبی گیمینگ",
    description: "بهترین قیمت‌ها در بازار",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=1200&h=600&fit=crop",
    title: "ساعت‌های هوشمند",
    description: "پیشنهاد ویژه امروز",
  },
];

// نمونه بنر
const promoText = "ارسال رایگان برای خریدهای بالای 5 میلیون تومان";

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onProductClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // دسته‌بندی‌ها
  const categories = [
    { id: "all", name: "همه محصولات", icon: "🏪" },
    { id: "لوازم جانبی", name: "لوازم جانبی", icon: "🎧" },
    { id: "ساعت هوشمند", name: "ساعت هوشمند", icon: "⌚" },
    { id: "مانیتور", name: "مانیتور", icon: "🖥️" },
  ];

  // بازه قیمت
  const priceRanges = [
    { id: "all", name: "همه قیمت‌ها" },
    { id: "0-5", name: "زیر 5 میلیون" },
    { id: "5-10", name: "5 تا 10 میلیون" },
    { id: "10-20", name: "10 تا 20 میلیون" },
    { id: "20+", name: "بالای 20 میلیون" },
  ];

  // گزینه‌های مرتب‌سازی
  const sortOptions = [
    { id: "newest", name: "جدیدترین" },
    { id: "price-low", name: "ارزان‌ترین" },
    { id: "price-high", name: "گران‌ترین" },
    { id: "popular", name: "محبوب‌ترین" },
  ];

  // فیلتر محصولات
  const getFilteredProducts = () => {
    let filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      let matchesPrice = true;
      if (selectedPriceRange !== "all") {
        const price = product.price / 1000000; // تبدیل به میلیون
        if (selectedPriceRange === "0-5") matchesPrice = price < 5;
        else if (selectedPriceRange === "5-10")
          matchesPrice = price >= 5 && price < 10;
        else if (selectedPriceRange === "10-20")
          matchesPrice = price >= 10 && price < 20;
        else if (selectedPriceRange === "20+") matchesPrice = price >= 20;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // مرتب‌سازی
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const amazingProducts = mockProducts.filter(
    (p) => p.discount && p.discount >= 20
  );
  const newProducts = mockProducts.slice(0, 15);
  const popularProducts = mockProducts
    .filter((p) => p.rating && p.rating >= 4.5)
    .slice(0, 15);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSortBy("newest");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedPriceRange !== "all" ||
    sortBy !== "newest";

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Search Bar - Fixed */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="px-4 py-3 flex gap-2">
          <div className="flex-1 relative flex items-center bg-gray-100 rounded-xl px-4 py-2.5 transition-all duration-300 focus-within:bg-gray-200">
            <MagnifyingGlassIcon
              size={20}
              weight="bold"
              className="text-gray-500 ml-2"
            />
            <input
              type="text"
              placeholder="جستجو در محصولات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-none bg-transparent text-sm outline-none text-gray-800 placeholder:text-gray-400"
            />
            {searchTerm && (
              <button
                className="bg-transparent border-none cursor-pointer p-1 flex items-center justify-center transition-colors duration-200"
                onClick={() => setSearchTerm("")}
                aria-label="پاک کردن جستجو">
                <XIcon
                  size={20}
                  weight="bold"
                  className="text-gray-400 hover:text-primary-start"
                />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-200 hover:border-primary-start hover:text-primary-start relative">
            <SlidersHorizontalIcon size={20} weight="bold" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {/* Promo Banner - Small at top */}
        <div className="bg-linear-to-r from-blue-100 to-blue-50">
          <div className="px-4 py-2 flex items-center justify-center gap-2">
            <span className="text-sm font-semibold text-gray-800">🎉 پیشنهاد ویژه:</span>
            <span className="text-xs text-gray-600">{promoText}</span>
          </div>
        </div>

        {/* Hero Slider */}
        <div className="px-0">
          <ImageSlider slides={heroSlides} />
        </div>

        {/* Categories Quick Filter */}
        <div className="px-0 pt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-xl border-2 transition-all duration-200 cursor-pointer text-sm font-medium whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-primary-start text-white border-primary-start"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary-start"
                }`}>
                <span className="ml-1">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Amazing Offers */}
        {amazingProducts.length > 0 && (
          <AmazingOffers
            products={amazingProducts}
            onProductClick={onProductClick}
          />
        )}

        {/* New Products */}
        <ProductCarousel
          title="جدیدترین محصولات"
          products={newProducts}
          onProductClick={onProductClick}
          maxItems={15}
        />

        {/* Popular Products */}
        {popularProducts.length > 0 && (
          <ProductCarousel
            title="محبوب‌ترین محصولات"
            products={popularProducts}
            onProductClick={onProductClick}
            maxItems={15}
          />
        )}

        {/* All Products */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 m-0">همه محصولات</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors border-none bg-transparent cursor-pointer">
                پاک کردن فیلترها
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
              <div className="text-6xl mb-4 opacity-50">📦</div>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                محصولی یافت نشد
              </p>
              <p className="text-sm text-gray-400 m-0">
                لطفاً جستجو یا فیلتر خود را تغییر دهید
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={onProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Drawer */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="فیلتر و مرتب‌سازی">
        <div className="flex flex-col gap-6">
          {/* Sort */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">مرتب‌سازی</h3>
            <div className="flex flex-col gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`w-full text-right px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    sortBy === option.id
                      ? "bg-primary-start text-white border-primary-start font-semibold"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary-start hover:bg-gray-50"
                  }`}>
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">دسته‌بندی</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-right px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-primary-start text-white border-primary-start font-semibold"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary-start hover:bg-gray-50"
                  }`}>
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              محدوده قیمت
            </h3>
            <div className="flex flex-col gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedPriceRange(range.id)}
                  className={`w-full text-right px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    selectedPriceRange === range.id
                      ? "bg-primary-start text-white border-primary-start font-semibold"
                      : "bg-white text-gray-700 border-gray-200 hover:border-primary-start hover:bg-gray-50"
                  }`}>
                  {range.name}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="w-full px-6 py-3 bg-primary-start text-white rounded-xl font-semibold border-none cursor-pointer hover:bg-primary-dark transition-colors">
            اعمال فیلترها
          </button>
        </div>
      </Drawer>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
