import React, { useState } from "react";
import { ProductCard } from "../components/products/ProductCard";
import { Drawer } from "../components/common/Drawer";
import { mockProducts } from "../data/products";
import type { Product } from "../types/product";
import { FadersIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // استخراج دسته‌بندی‌های منحصر به فرد
  const categories = [
    "all",
    ...Array.from(new Set(mockProducts.map((p) => p.category))),
  ];

  // فیلتر محصولات
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
    // TODO: اضافه کردن به سبد خرید
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsFilterDrawerOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-linear-to-b from-gray-50 to-white">
      {/* Fixed Header با Search و Filter */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        {/* Header */}
        <header className="bg-linear-to-br from-primary-start to-primary-end text-white px-5 py-5 md:py-4 text-center">
          <h1 className="m-0 text-xl md:text-lg font-bold mb-1">
            فروشگاه تلگرامی
          </h1>
          <p className="m-0 text-xs opacity-90">
            بهترین محصولات با بهترین قیمت
          </p>
        </header>

        {/* Search Bar */}
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

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="px-4 py-2.5 bg-primary-start text-white rounded-xl flex items-center gap-2 border-none cursor-pointer transition-all duration-200 hover:bg-primary-end shadow-sm">
            <FadersIcon size={20} weight="bold" />
            <span className="text-sm font-medium hidden sm:inline">فیلتر</span>
          </button>
        </div>

        {/* Selected Category Indicator */}
        {selectedCategory !== "all" && (
          <div className="px-4 pb-2">
            <div className="inline-flex items-center gap-2 bg-primary-start/10 text-primary-start px-3 py-1.5 rounded-full text-xs font-medium">
              <span>فیلتر: {selectedCategory}</span>
              <button
                onClick={() => setSelectedCategory("all")}
                className="bg-transparent border-none cursor-pointer p-0">
                <XIcon size={14} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
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
          <>
            <div className="mb-3">
              <span className="text-sm text-gray-600 font-medium">
                {filteredProducts.length} محصول
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Filter Drawer */}
      <Drawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="فیلتر دسته‌بندی">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`
                w-full text-right px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
                ${
                  selectedCategory === category
                    ? "bg-primary-start text-white border-primary-start font-semibold"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary-start hover:bg-gray-50"
                }
              `}>
              {category === "all" ? "🏪 همه محصولات" : `📂 ${category}`}
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
