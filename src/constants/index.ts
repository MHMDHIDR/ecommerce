export const { origin }: any = typeof window !== 'undefined' && window.location

export const ITEMS_PER_PAGE = 10

export const MAX_QUANTITY = 100

const url = {
  local: `localhost`,
  dev: `dev.com`
}

export const PROFILE_LINKS = [
  { label: 'البيانات الشخصية', to: 'edit' },
  { label: 'طلباتي', to: 'orders' },
  { label: 'المفضلة', to: 'favourites' },
  { label: 'عنوان التوصيل', to: 'shipping-address' },
  { label: 'الخصوصية', to: 'privacy-policy' },
  { label: 'سياسة الاستخدام', to: 'terms-and-conditions' }
]

export const CATEGORIES = [
  { label: 'الملابس', to: 'clothes', itemCount: 200 },
  { label: 'الجاكيتات', to: 'jakets', itemCount: 150 },
  { label: 'الجينز', to: 'jeans', itemCount: 300 },
  { label: 'الأحذية', to: 'shoes', itemCount: 50 },
  { label: 'النظارات', to: 'sunglasses', itemCount: 60 }
]

export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? origin?.includes(url.dev)
      ? `http://${url.dev}:3001`
      : `http://${url.local}:3001`
    : process.env.NEXT_PUBLIC_APP_PUBLIC_URL

export const API_URL = APP_URL + '/api'
