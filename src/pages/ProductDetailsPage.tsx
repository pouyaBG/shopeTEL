import {
  ArrowRightIcon,
  CheckIcon,
  HeartIcon,
  MinusCircleIcon,
  PackageIcon,
  PlusIcon,
  ShareIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  Star,
  StarIcon,
  TruckIcon
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { Modal } from "../components/common/Modal";
import { useCart } from "../contexts/CartContext";
import type { Product } from "../types/product";

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  onBack,
}) => {
  const {
    items,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [showAddedModal, setShowAddedModal] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);
  const inCart = !!cartItem;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product);
    setShowAddedModal(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        size={16}
        weight={i < rating ? "fill" : "regular"}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-none bg-transparent cursor-pointer shrink-0">
            <ArrowRightIcon size={24} weight="bold" className="text-gray-800" />
          </button>
          <h1 className="text-sm font-semibold text-gray-800 flex-1 text-center mx-2 line-clamp-1">
            {product.name}
          </h1>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-none bg-transparent cursor-pointer">
              <HeartIcon
                size={22}
                weight={isFavorite ? "fill" : "regular"}
                className={isFavorite ? "text-red-500" : "text-gray-800"}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-none bg-transparent cursor-pointer">
              <ShareIcon size={22} weight="bold" className="text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Image Gallery */}
        <div className="bg-gray-50 p-4">
          <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden shadow-md">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                {product.discount}% تخفیف
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-transparent ${
                    selectedImage === idx
                      ? "border-primary-start shadow-md"
                      : "border-gray-200 opacity-60"
                  }`}>
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          {product.brand && (
            <p className="text-sm text-gray-500 mb-3">برند: {product.brand}</p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {renderStars(Math.round(product.rating))}
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {product.rating}
              </span>
              {product.reviewCount && (
                <span className="text-sm text-gray-500">
                  ({product.reviewCount} نظر)
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through block mb-1">
                    {formatPrice(product.originalPrice)} تومان
                  </span>
                )}
                <span className="text-2xl font-bold text-primary-start">
                  {formatPrice(product.price)} تومان
                </span>
              </div>
              {product.discount && (
                <div className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-sm font-bold">
                  {product.discount}% تخفیف
                </div>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-3">
            {product.stock > 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckIcon size={20} weight="bold" />
                <span className="text-sm font-medium">
                  {product.stock < 5
                    ? `تنها ${product.stock} عدد موجود است`
                    : "موجود در انبار"}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-sm font-medium">ناموجود</span>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3">
              <ShieldCheckIcon
                size={24}
                className="text-blue-600"
                weight="fill"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800 m-0">
                  گارانتی اصالت کالا
                </p>
                <p className="text-xs text-gray-500 m-0">
                  {product.warranty || "18 ماه گارانتی"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
              <TruckIcon size={24} className="text-green-600" weight="fill" />
              <div>
                <p className="text-sm font-semibold text-gray-800 m-0">
                  ارسال سریع
                </p>
                <p className="text-xs text-gray-500 m-0">
                  ارسال از 1 تا 3 روز کاری
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-3">
              <PackageIcon size={24} className="text-orange-600" weight="fill" />
              <div>
                <p className="text-sm font-semibold text-gray-800 m-0">
                  7 روز ضمانت بازگشت
                </p>
                <p className="text-xs text-gray-500 m-0">در صورت عدم رضایت</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex-1 px-4 py-3 text-sm font-semibold border-none cursor-pointer transition-colors ${
                activeTab === "description"
                  ? "text-primary-start border-b-2 border-primary-start bg-blue-50/50"
                  : "text-gray-500 bg-transparent"
              }`}>
              توضیحات
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`flex-1 px-4 py-3 text-sm font-semibold border-none cursor-pointer transition-colors ${
                activeTab === "specifications"
                  ? "text-primary-start border-b-2 border-primary-start bg-blue-50/50"
                  : "text-gray-500 bg-transparent"
              }`}>
              مشخصات
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 px-4 py-3 text-sm font-semibold border-none cursor-pointer transition-colors ${
                activeTab === "reviews"
                  ? "text-primary-start border-b-2 border-primary-start bg-blue-50/50"
                  : "text-gray-500 bg-transparent"
              }`}>
              نظرات ({product.reviewCount || 0})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "description" && (
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-3">
                توضیحات محصول
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <>
                  <h4 className="text-sm font-bold text-gray-800 mb-2 mt-4">
                    ویژگی‌های کلیدی:
                  </h4>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckIcon
                          size={20}
                          className="text-green-600 shrink-0 mt-0.5"
                          weight="bold"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === "specifications" && (
            <div>
              <h3 className="text-base font-bold text-gray-800 mb-3">
                مشخصات فنی
              </h3>
              {product.specifications && product.specifications.length > 0 ? (
                <div className="space-y-2">
                  {product.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">مشخصات فنی موجود نیست</p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-800">
                  نظرات کاربران
                </h3>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-4 py-2 bg-primary-start text-white rounded-lg text-sm font-semibold border-none cursor-pointer hover:bg-primary-end transition-colors">
                  ثبت نظر
                </button>
              </div>

              {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-primary-start/20 flex items-center justify-center text-primary-start font-bold">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800 m-0">
                              {review.userName}
                            </p>
                            <p className="text-xs text-gray-500 m-0">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mt-2">
                        {review.comment}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button className="text-xs text-gray-500 hover:text-primary-start transition-colors border-none bg-transparent cursor-pointer">
                          مفید ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">
                    هنوز نظری ثبت نشده است
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    اولین نفری باشید که نظر می‌دهد
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 pb-16">
        <div className="max-w-[480px] mx-auto px-4 py-3">
          {!inCart ? (
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full px-6 py-4 bg-linear-to-br from-primary-start to-primary-end text-white border-none rounded-xl text-base font-bold cursor-pointer transition-all duration-300 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2">
              <ShoppingCartIcon size={24} weight="fill" />
              <span>
                {product.stock === 0 ? "ناموجود" : "افزودن به سبد خرید"}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-2 flex-1">
                <button
                  onClick={() => {
                    if (cartItem.quantity === 1) {
                      removeFromCart(product.id);
                    } else {
                      decreaseQuantity(product.id);
                    }
                  }}
                  className="flex-1 h-12 flex items-center justify-center bg-white rounded-lg border-none cursor-pointer transition-all duration-200 hover:bg-gray-50">
                  <MinusCircleIcon size={20} weight="bold" className="text-gray-700" />
                </button>
                <span className="text-lg font-bold text-gray-800 min-w-8 text-center">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  disabled={cartItem.quantity >= product.stock}
                  className="flex-1 h-12 flex items-center justify-center bg-white rounded-lg border-none cursor-pointer transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <PlusIcon size={20} weight="bold" className="text-gray-700" />
                </button>
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500">جمع کل</div>
                <div className="text-lg font-bold text-primary-start">
                  {formatPrice(product.price * cartItem.quantity)} تومان
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart Success Modal */}
      <Modal
        isOpen={showAddedModal}
        onClose={() => setShowAddedModal(false)}
        title="افزوده شد!"
        message="محصول با موفقیت به سبد خرید شما اضافه شد"
        primaryButton={{
          label: "مشاهده سبد خرید",
          onClick: () => {
            setShowAddedModal(false);
            window.dispatchEvent(new CustomEvent("navigateToCart"));
          },
        }}
        secondaryButton={{
          label: "ادامه خرید",
          onClick: () => {
            setShowAddedModal(false);
            onBack();
          },
        }}
      />

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="ثبت نظر"
        message={
          <div className="space-y-4 text-right">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                امتیاز شما:
              </label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="border-none bg-transparent cursor-pointer p-1">
                    <Star
                      size={32}
                      weight={rating <= newReview.rating ? "fill" : "regular"}
                      className={
                        rating <= newReview.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                نظر شما:
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="نظر خود را بنویسید..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                rows={4}
              />
            </div>
          </div>
        }
        primaryButton={{
          label: "ثبت نظر",
          onClick: () => {
            console.log("Review submitted:", newReview);
            setShowReviewModal(false);
            setNewReview({ rating: 5, comment: "" });
          },
        }}
        secondaryButton={{
          label: "انصراف",
          onClick: () => {
            setShowReviewModal(false);
            setNewReview({ rating: 5, comment: "" });
          },
        }}
      />
    </div>
  );
};
