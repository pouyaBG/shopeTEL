import React from "react";
import { Storefront, ShoppingCart, Package, User } from "@phosphor-icons/react";
import type { NavigationTab } from "../../types/navigation";
import { useCart } from "../../contexts/CartContext";

interface BottomNavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

const navigationItems = [
  { id: "products" as NavigationTab, label: "محصولات", Icon: Storefront },
  { id: "cart" as NavigationTab, label: "سبد خرید", Icon: ShoppingCart },
  { id: "orders" as NavigationTab, label: "سفارشات", Icon: Package },
  { id: "profile" as NavigationTab, label: "پروفایل", Icon: User },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { totalItems } = useCart();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-100">
      <div className="flex justify-around items-center py-2 max-w-[480px] mx-auto">
        {navigationItems.map((item) => {
          const IconComponent = item.Icon;
          const showBadge = item.id === "cart" && totalItems > 0;

          return (
            <button
              key={item.id}
              className={`
                flex flex-col items-center justify-center gap-1 px-3 py-1.5
                bg-transparent border-none cursor-pointer transition-all duration-300
                rounded-xl min-w-[70px] md:min-w-[60px] md:px-2 md:py-1
                hover:bg-gray-50 relative
                ${
                  activeTab === item.id
                    ? "text-primary-start font-semibold"
                    : "text-gray-600"
                }
              `}
              onClick={() => onTabChange(item.id)}
              aria-label={item.label}>
              <div className="relative">
                <IconComponent
                  size={24}
                  weight={activeTab === item.id ? "fill" : "regular"}
                  className={`transition-transform duration-300 ${
                    activeTab === item.id ? "scale-110" : ""
                  }`}
                />
                {showBadge && (
                  <div className="absolute -top-1 -left-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-md">
                    {totalItems > 99 ? '99+' : totalItems}
                  </div>
                )}
              </div>
              <span className="text-xs md:text-[11px] transition-colors duration-300">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
