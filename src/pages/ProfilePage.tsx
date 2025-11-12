import React, { useState } from 'react';
import {
  User,
  Camera,
  PencilSimple,
  Lock,
  MapPin,
  Plus,
  SignOut,
  Trash,
  Check,
} from '@phosphor-icons/react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Drawer } from '../components/common/Drawer';
import { mockUser } from '../data/user';
import { mockAddresses } from '../data/addresses';
import { mockProvinces, getCitiesByProvince } from '../data/locations';
import type { Address } from '../types/user';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [addresses, setAddresses] = useState(mockAddresses);

  // Drawer states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAddressesOpen, setIsAddressesOpen] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    username: user.username,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    title: '',
    provinceId: '',
    cityId: '',
    postalCode: '',
    address: '',
    receiverName: '',
    receiverPhone: '',
  });

  const handleUpdateProfile = () => {
    setUser({ ...user, ...editForm });
    setIsEditProfileOpen(false);
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('رمز عبور و تکرار آن یکسان نیستند');
      return;
    }
    alert('رمز عبور با موفقیت تغییر کرد');
    setIsChangePasswordOpen(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
  };

  const handleAddAddress = () => {
    if (!newAddress.title || !newAddress.address) {
      alert('لطفاً تمام فیلدهای الزامی را پر کنید');
      return;
    }

    const province = mockProvinces.find(p => p.id === newAddress.provinceId);
    const cities = getCitiesByProvince(newAddress.provinceId!);
    const city = cities.find(c => c.id === newAddress.cityId);

    const address: Address = {
      id: Date.now().toString(),
      title: newAddress.title!,
      provinceId: newAddress.provinceId!,
      provinceName: province?.name || '',
      cityId: newAddress.cityId!,
      cityName: city?.name || '',
      postalCode: newAddress.postalCode || '',
      address: newAddress.address!,
      receiverName: newAddress.receiverName!,
      receiverPhone: newAddress.receiverPhone!,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, address]);
    setIsAddAddressOpen(false);
    setNewAddress({
      title: '',
      provinceId: '',
      cityId: '',
      postalCode: '',
      address: '',
      receiverName: '',
      receiverPhone: '',
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-linear-to-b from-gray-50 to-white overflow-y-auto">
      {/* Header با آواتار */}
      <div className="bg-linear-to-br from-primary-start to-primary-end text-white px-5 py-8 text-center">
        <div className="relative inline-block mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 border-4 border-white shadow-lg">
            {user.avatar ? (
              <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={48} weight="fill" />
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-primary-start rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors border-none cursor-pointer">
            <Camera size={18} weight="bold" />
          </button>
        </div>
        <h2 className="text-xl font-bold m-0">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm opacity-90 m-0 mt-1">@{user.username}</p>
      </div>

      {/* منوی پروفایل */}
      <div className="p-4 pb-24">
        {/* اطلاعات کاربری */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
            <User size={20} weight="bold" />
            اطلاعات کاربری
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">نام و نام خانوادگی</span>
              <span className="font-medium text-gray-800">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">شماره تلفن</span>
              <span className="font-medium text-gray-800 dir-ltr">{user.phone}</span>
            </div>
            {user.email && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">ایمیل</span>
                <span className="font-medium text-gray-800">{user.email}</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={() => setIsEditProfileOpen(true)}
            className="mt-3"
          >
            <PencilSimple size={18} weight="bold" />
            ویرایش اطلاعات
          </Button>
        </div>

        {/* دکمه‌های اصلی */}
        <div className="space-y-2">
          <Button
            variant="primary"
            fullWidth
            onClick={() => setIsAddressesOpen(true)}
          >
            <MapPin size={20} weight="bold" />
            مدیریت آدرس‌ها ({addresses.length})
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => setIsChangePasswordOpen(true)}
          >
            <Lock size={20} weight="bold" />
            تغییر رمز عبور
          </Button>

          <Button variant="danger" fullWidth>
            <SignOut size={20} weight="bold" />
            خروج از حساب کاربری
          </Button>
        </div>
      </div>

      {/* Drawer ویرایش پروفایل */}
      <Drawer
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="ویرایش اطلاعات"
      >
        <div className="space-y-4">
          <Input
            label="نام"
            value={editForm.firstName}
            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
            placeholder="نام خود را وارد کنید"
          />
          <Input
            label="نام خانوادگی"
            value={editForm.lastName}
            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
            placeholder="نام خانوادگی خود را وارد کنید"
          />
          <Input
            label="نام کاربری"
            value={editForm.username}
            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
            placeholder="نام کاربری خود را وارد کنید"
          />
          <Input
            label="شماره تلفن"
            type="tel"
            value={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            placeholder="09123456789"
          />
          <Button variant="primary" fullWidth onClick={handleUpdateProfile}>
            ذخیره تغییرات
          </Button>
        </div>
      </Drawer>

      {/* Drawer تغییر رمز */}
      <Drawer
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        title="تغییر رمز عبور"
      >
        <div className="space-y-4">
          <Input
            label="رمز عبور فعلی"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            placeholder="رمز عبور فعلی"
            rightIcon={<Lock size={18} />}
          />
          <Input
            label="رمز عبور جدید"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            placeholder="رمز عبور جدید (حداقل 8 کاراکتر)"
            rightIcon={<Lock size={18} />}
          />
          <Input
            label="تکرار رمز عبور جدید"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            placeholder="تکرار رمز عبور جدید"
            rightIcon={<Lock size={18} />}
          />
          <Button variant="primary" fullWidth onClick={handleChangePassword}>
            تغییر رمز عبور
          </Button>
        </div>
      </Drawer>

      {/* Drawer لیست آدرس‌ها */}
      <Drawer
        isOpen={isAddressesOpen}
        onClose={() => setIsAddressesOpen(false)}
        title="آدرس‌های من"
      >
        <div className="space-y-3">
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              setIsAddressesOpen(false);
              setIsAddAddressOpen(true);
            }}
            disabled={addresses.length >= 10}
          >
            <Plus size={20} weight="bold" />
            افزودن آدرس جدید {addresses.length >= 10 && '(حداکثر 10 آدرس)'}
          </Button>

          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 rounded-xl border-2 ${
                address.isDefault
                  ? 'border-primary-start bg-primary-start/5'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={18} weight="bold" className="text-primary-start" />
                  <span className="font-bold text-gray-800">{address.title}</span>
                  {address.isDefault && (
                    <span className="text-xs bg-primary-start text-white px-2 py-0.5 rounded-full">
                      پیش‌فرض
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer p-1"
                >
                  <Trash size={18} weight="bold" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{address.address}</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p className="m-0">{address.cityName}، {address.provinceName}</p>
                <p className="m-0">کد پستی: {address.postalCode}</p>
                <p className="m-0">گیرنده: {address.receiverName} - {address.receiverPhone}</p>
              </div>
              {!address.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => handleSetDefaultAddress(address.id)}
                  className="mt-2"
                >
                  <Check size={16} weight="bold" />
                  انتخاب به عنوان پیش‌فرض
                </Button>
              )}
            </div>
          ))}
        </div>
      </Drawer>

      {/* Drawer افزودن آدرس */}
      <Drawer
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        title="افزودن آدرس جدید"
      >
        <div className="space-y-4">
          <Input
            label="عنوان آدرس *"
            value={newAddress.title}
            onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
            placeholder="مثال: خانه، محل کار"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">استان *</label>
            <select
              value={newAddress.provinceId}
              onChange={(e) => setNewAddress({ ...newAddress, provinceId: e.target.value, cityId: '' })}
              className="w-full px-4 py-2.5 bg-gray-100 border-2 border-transparent rounded-xl text-sm outline-none focus:bg-white focus:border-primary-start"
            >
              <option value="">انتخاب استان</option>
              {mockProvinces.filter(p => p.isActive).map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          {newAddress.provinceId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">شهر *</label>
              <select
                value={newAddress.cityId}
                onChange={(e) => setNewAddress({ ...newAddress, cityId: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-100 border-2 border-transparent rounded-xl text-sm outline-none focus:bg-white focus:border-primary-start"
              >
                <option value="">انتخاب شهر</option>
                {getCitiesByProvince(newAddress.provinceId).map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Input
            label="کد پستی"
            value={newAddress.postalCode}
            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
            placeholder="1234567890"
            maxLength={10}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">آدرس کامل *</label>
            <textarea
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              placeholder="آدرس کامل خود را وارد کنید..."
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-100 border-2 border-transparent rounded-xl text-sm outline-none focus:bg-white focus:border-primary-start resize-none"
            />
          </div>

          <Input
            label="نام گیرنده *"
            value={newAddress.receiverName}
            onChange={(e) => setNewAddress({ ...newAddress, receiverName: e.target.value })}
            placeholder="نام و نام خانوادگی گیرنده"
          />

          <Input
            label="شماره تلفن گیرنده *"
            type="tel"
            value={newAddress.receiverPhone}
            onChange={(e) => setNewAddress({ ...newAddress, receiverPhone: e.target.value })}
            placeholder="09123456789"
          />

          <Button variant="primary" fullWidth onClick={handleAddAddress}>
            <Plus size={20} weight="bold" />
            افزودن آدرس
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
