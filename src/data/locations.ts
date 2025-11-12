import type { Province, City } from '../types/user';

export const mockProvinces: Province[] = [
  { id: '1', name: 'آذربایجان شرقی', isActive: true },
  { id: '2', name: 'آذربایجان غربی', isActive: true },
  { id: '3', name: 'اصفهان', isActive: true },
  { id: '4', name: 'البرز', isActive: true },
  { id: '5', name: 'ایلام', isActive: true },
  { id: '6', name: 'خراسان رضوی', isActive: true },
  { id: '7', name: 'خوزستان', isActive: true },
  { id: '8', name: 'تهران', isActive: true },
  { id: '9', name: 'فارس', isActive: true },
  { id: '10', name: 'گیلان', isActive: true },
  { id: '11', name: 'مازندران', isActive: true },
  { id: '12', name: 'یزد', isActive: true },
];

export const mockCities: City[] = [
  // تهران
  { id: '301', name: 'تهران', provinceId: '8', isActive: true },
  { id: '302', name: 'شمیرانات', provinceId: '8', isActive: true },
  { id: '303', name: 'ری', provinceId: '8', isActive: true },
  { id: '304', name: 'ورامین', provinceId: '8', isActive: true },
  { id: '305', name: 'پردیس', provinceId: '8', isActive: true },

  // اصفهان
  { id: '101', name: 'اصفهان', provinceId: '3', isActive: true },
  { id: '102', name: 'کاشان', provinceId: '3', isActive: true },
  { id: '103', name: 'نجف‌آباد', provinceId: '3', isActive: true },
  { id: '104', name: 'خمینی‌شهر', provinceId: '3', isActive: true },

  // خراسان رضوی
  { id: '201', name: 'مشهد', provinceId: '6', isActive: true },
  { id: '202', name: 'نیشابور', provinceId: '6', isActive: true },
  { id: '203', name: 'سبزوار', provinceId: '6', isActive: true },

  // فارس
  { id: '401', name: 'شیراز', provinceId: '9', isActive: true },
  { id: '402', name: 'مرودشت', provinceId: '9', isActive: true },
  { id: '403', name: 'کازرون', provinceId: '9', isActive: true },

  // آذربایجان شرقی
  { id: '501', name: 'تبریز', provinceId: '1', isActive: true },
  { id: '502', name: 'مراغه', provinceId: '1', isActive: true },

  // البرز
  { id: '601', name: 'کرج', provinceId: '4', isActive: true },
  { id: '602', name: 'محمدشهر', provinceId: '4', isActive: true },

  // خوزستان
  { id: '701', name: 'اهواز', provinceId: '7', isActive: true },
  { id: '702', name: 'آبادان', provinceId: '7', isActive: true },

  // گیلان
  { id: '801', name: 'رشت', provinceId: '10', isActive: true },
  { id: '802', name: 'بندر انزلی', provinceId: '10', isActive: true },

  // مازندران
  { id: '901', name: 'ساری', provinceId: '11', isActive: true },
  { id: '902', name: 'بابل', provinceId: '11', isActive: true },
  { id: '903', name: 'آمل', provinceId: '11', isActive: true },

  // یزد
  { id: '1001', name: 'یزد', provinceId: '12', isActive: true },
  { id: '1002', name: 'میبد', provinceId: '12', isActive: true },
];

export const getCitiesByProvince = (provinceId: string): City[] => {
  return mockCities.filter(city => city.provinceId === provinceId && city.isActive);
};
