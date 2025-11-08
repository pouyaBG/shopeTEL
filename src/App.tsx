import { useState } from 'react';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { MobileLayout } from './components/layout/MobileLayout';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProfilePage } from './pages/ProfilePage';
import type { NavigationTab } from './types/navigation';

function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('products');

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
    <MobileLayout>
      {renderPage()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </MobileLayout>
  );
}

export default App;
