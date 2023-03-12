export const { origin }: any = typeof window !== 'undefined' && window.location

export const ITEMS_PER_PAGE = 10

export const MAX_QUANTITY = 100

const url = {
  local: `localhost`,
  dev: `dev.com`
}

export const PROFILE_LINKS = [
  { label: 'البيانات الشخصية', to: 'edit' },
  { label: 'طلباتي', to: '/completed-orders' },
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

export const PRODUCT = (id: string) => {
  return {
    id: id!,
    name: 'حذاء نايك ام-اكس سوبر 5000',
    imgUrl:
      'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D',
    discount: true,
    currentPrice: 249,
    oldPrice: 299,
    rating: 5.0,
    quantity: 1,
    description: `حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو
            رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري
            وأنيق سيبدو رائع عليك!`
  }
}

export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? origin?.includes(url.dev)
      ? `http://${url.dev}:3001`
      : `http://${url.local}:3001`
    : process.env.NEXT_PUBLIC_APP_PUBLIC_URL

export const API_URL = APP_URL + '/api'
