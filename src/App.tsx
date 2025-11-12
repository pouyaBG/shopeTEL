import { useState, useEffect } from 'react';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { MobileLayout } from './components/layout/MobileLayout';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProfilePage } from './pages/ProfilePage';
import { CartProvider } from './contexts/CartContext';
import type { NavigationTab } from './types/navigation';

function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('products');

  // Handle navigation to cart from modal
  useEffect(() => {
    const handleNavigateToCart = () => {
      setActiveTab('cart');
    };

    window.addEventListener('navigateToCart', handleNavigateToCart);
    return () => {
      window.removeEventListener('navigateToCart', handleNavigateToCart);
    };
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsPage />;
      case 'cart':
        return <CartPage />;
      case 'orders':
        return <OrdersPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <CartProvider>
      <MobileLayout>
        {renderPage()}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </MobileLayout>
    </CartProvider>
  );
}

export default App;
