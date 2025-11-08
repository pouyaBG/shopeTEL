export type NavigationTab = 'products' | 'cart' | 'profile' | 'orders';

export interface NavigationItem {
  id: NavigationTab;
  label: string;
  icon: string;
}
