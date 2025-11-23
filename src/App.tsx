import { useState, useEffect } from 'react';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { MobileLayout } from './components/layout/MobileLayout';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import type { NavigationTab } from './types/navigation';
import type { Product } from './types/product';

// Import Order type
interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalPrice: number;
  deliveryFee: number;
  trackingCode?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Handle navigation to cart from modal
  useEffect(() => {
    const handleNavigateToCart = () => {
      setActiveTab('cart');
      setShowProductDetails(false);
      setSelectedProduct(null);
      setShowOrderDetails(false);
      setSelectedOrder(null);
    };

    window.addEventListener('navigateToCart', handleNavigateToCart);
    return () => {
      window.removeEventListener('navigateToCart', handleNavigateToCart);
    };
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleBackFromProductDetails = () => {
    setShowProductDetails(false);
    setSelectedProduct(null);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleBackFromOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    setShowProductDetails(false);
    setSelectedProduct(null);
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const renderPage = () => {
    // Show Order Details
    if (showOrderDetails && selectedOrder) {
      return <OrderDetailPage order={selectedOrder} onBack={handleBackFromOrderDetails} />;
    }

    // Show Product Details
    if (showProductDetails && selectedProduct) {
      return <ProductDetailsPage product={selectedProduct} onBack={handleBackFromProductDetails} />;
    }

    // Show Main Pages
    switch (activeTab) {
      case 'products':
        return <ProductsPage onProductClick={handleProductClick} />;
      case 'cart':
        return <CartPage />;
      case 'orders':
        return <OrdersPage onOrderClick={handleOrderClick} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <ProductsPage onProductClick={handleProductClick} />;
    }
  };

  const hideBottomNav = showProductDetails || showOrderDetails;

  return (
    <ThemeProvider>
      <CartProvider>
        <MobileLayout>
          {renderPage()}
          {!hideBottomNav && <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />}
        </MobileLayout>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
