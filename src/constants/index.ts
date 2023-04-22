export const { origin }: any = typeof window !== 'undefined' && window.location

export const ITEMS_PER_PAGE = 7

export const MAX_QUANTITY = 100

export const TIME_TO_EXECUTE = 3000

export const isSmallScreen = window.innerWidth < 768 ? true : false

export const url = {
  local: `localhost`,
  dev: `dev.com`
}

export const PROFILE_LINKS = [
  { label: 'البيانات الشخصية', to: 'edit' },
  { label: 'طلباتي', to: '/completed-orders' },
  { label: 'المفضلة', to: 'favourites' },
  { label: 'عنوان التوصيل', to: 'shipping-address' },
  { label: 'الخصوصية', to: '/privacy-policy' },
  { label: 'سياسة الاستخدام', to: '/terms-and-conditions' }
]

export const PRODUCT = (id: string) => {
  return {
    id,
    itemName: 'لابتوب ماك-بوك آير الجديد',
    imgUrl: '/assets/img/logo.png',
    discount: true,
    currentPrice: 249,
    oldPrice: 299,
    rating: 5.0,
    quantity: 1,
    category: 'shoes',
    description: `
    لابتوب ماك-بوك آير الجديد، سرعة فائقة وجودة كبيرة ... لابتوب ماك-بوك آير الجديد، سرعة فائقة وجودة كبيرة
    لابتوب ماك-بوك آير الجديد، سرعة فائقة وجودة كبيرة ... لابتوب ماك-بوك آير الجديد، سرعة فائقة وجودة كبيرة
    لابتوب ماك-بوك آير الجديد، سرعة فائقة وجودة كبيرة ... لابتوب ماك-بوك آير الجديد، سرعة فائقة وجودة كبيرة
    لابتوب ماك-بوك آير الجديد، سرعة فائقة وجودة كبيرة ... لابتوب ماك-بوك آير الجديد، سرعة فائقة وجودة كبيرة
    `,
    productStatus: 'open',
    orderId: '',
    createDate: '2023-03-01 18:23:19.000000',
    updateDate: '2023-03-19 18:23:19.000000'
  }
}

export const USER_DATA = {
  id: '',
  username: 'اسم المستخدم',
  firstname: '',
  lastname: '',
  gender: 'male',
  avatarUrl: '/assets/img/logo.jpg',
  phone: '0123 456 789',
  status: '',
  type: 'user',
  registerDate: ''
}

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? origin?.includes(url.dev)
      ? `http://${url.dev}:4000`
      : `http://${url.local}:4000`
    : `https://ecommerce-server-mhmdhidr.vercel.app`

export const CATEGORIES = [
  { ar_label: 'الملابس', en_label: 'clothes', itemCount: 200 },
  { ar_label: 'الجاكيتات', en_label: 'jakets', itemCount: 150 },
  { ar_label: 'الجينز', en_label: 'jeans', itemCount: 300 },
  { ar_label: 'الأحذية', en_label: 'shoes', itemCount: 50 },
  { ar_label: 'النظارات', en_label: 'sunglasses', itemCount: 60 },
  { ar_label: 'حقائب', en_label: 'bags', itemCount: 60 },
  { ar_label: 'إكسسوارات', en_label: 'accessories', itemCount: 100 },
  { ar_label: 'الكترونيات', en_label: 'electronics', itemCount: 100 }
]
