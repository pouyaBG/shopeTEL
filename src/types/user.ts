export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  avatar?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  title: string;
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  postalCode: string;
  address: string;
  receiverName: string;
  receiverPhone: string;
  isDefault: boolean;
}

export interface Province {
  id: string;
  name: string;
  isActive: boolean;
}

export interface City {
  id: string;
  name: string;
  provinceId: string;
  isActive: boolean;
}
