import { UserType } from '@/types'

export const { origin }: any = typeof window !== 'undefined' && window.location

export const ITEMS_PER_PAGE = 10

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
    CreateDate: '2023-03-01 18:23:19.000000',
    UpdateDate: '2023-03-19 18:23:19.000000'
  }
}

export const USER_DATA = {
  id: '',
  username: 'اسم المستخدم',
  firstname: '',
  lastname: '',
  gender: 'male',
  avatarUrl: '/assets/img/profile.jpg',
  phone: '0123 456 789',
  status: '',
  type: 'user',
  registerDate: ''
}

export const OrderItems = [
  {
    id: '9662bc11-7dfe-43f8-9ff3-70d5a02dd439',
    addedById: '00522efe-fbf8-4180-84bc-787f4d3adfd9',
    itemName: 'سامسونج-اس-22-الترا',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/ecommerce-online-app.appspot.com/o/products%2F9662bc11-7dfe-43f8-9ff3-70d5a02dd439%2F9662bc11-7dfe-43f8-9ff3-70d5a02dd439_samsung-galaxy-s22-ultra-burgundy.webp?alt=media&token=82081c44-8601-41c3-9e7f-8606da9d14',
    discount: 0,
    currentPrice: 20000,
    oldPrice: 20000,
    rating: 0,
    quantity: 4,
    category: 'electronics',
    description:
      'جهاز سامسونج اس 22 الترا الجديد كلياً ... جهاز سامسونج اس 22 الترا الجديد كلياً ... جهاز سامسونج اس 22 الترا الجديد كلياً ... جهاز سامسونج اس 22 الترا الجديد كلياً ... جهاز سامسونج اس 22 الترا الجديد كلياً ... جهاز سامسونج اس 22 الترا الجديد كلياً ... جها',
    productStatus: 'close',
    CreateDate: '2023-04-04T15:26:21.000Z',
    UpdateDate: '2023-04-04T15:26:21.000Z',
    itemTotal: 80000
  },
  {
    id: 'c12d16ac-4787-465c-8afa-cf0c423a7c17',
    addedById: '00522efe-fbf8-4180-84bc-787f4d3adfd9',
    itemName: 'لابتوب-ماك-بوك-اير-الجديد',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/ecommerce-online-app.appspot.com/o/products%2Fc12d16ac-4787-465c-8afa-cf0c423a7c17%2Fc12d16ac-4787-465c-8afa-cf0c423a7c17_macbook_air_m1.webp?alt=media&token=2249ae0c-89de-40be-863f-23b9e02b2a44',
    discount: 0,
    currentPrice: 10000,
    oldPrice: 10000,
    rating: 0,
    quantity: 3,
    category: 'electronics',
    description:
      'لابتوب ماك بوك اير \r\nبمعالج M1 الجديد ذو السرعة الفائقة\r\n\r\nالجهاز بمواصفات احترافية للأشخاص المحترفين',
    productStatus: 'close',
    CreateDate: '2023-03-24T11:16:48.000Z',
    UpdateDate: '2023-04-01T17:29:06.000Z',
    itemTotal: 30000
  },
  {
    id: '5855aab9-67cb-47d1-b03b-aa06ac80063d',
    addedById: '32d52a64-769c-4c54-8c4b-2a1d368d1160',
    itemName: 'حاسوب-مكتبي',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/ecommerce-online-app.appspot.com/o/products%2F5855aab9-67cb-47d1-b03b-aa06ac80063d%2F5855aab9-67cb-47d1-b03b-aa06ac80063d_computer.png?alt=media&token=9c45a0b6-e14b-4182-8a1b-e18e61aad4bf',
    discount: 0,
    currentPrice: 1200,
    oldPrice: 1200,
    rating: 0,
    quantity: 2,
    category: 'electronics',
    description:
      'حاسوب مكتبي سطح مكتب جديد بقوة كبيرة\r\n\r\nينفع للألعاب ، للطلاب ، وحتى للأعمال',
    productStatus: 'open',
    CreateDate: '2023-03-24T18:47:39.000Z',
    UpdateDate: '2023-03-31T19:21:47.000Z',
    itemTotal: 2400
  },
  {
    id: '6dd42b59-ddc3-4660-99e8-47fdcd22d496',
    addedById: '10361edf-d394-4ece-a37e-0ff1a42b0694',
    itemName: 'آيفون-14-برو',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/ecommerce-online-app.appspot.com/o/products%2F6dd42b59-ddc3-4660-99e8-47fdcd22d496%2F6dd42b59-ddc3-4660-99e8-47fdcd22d496_iphone.png?alt=media&token=f29ed93e-a8ee-4f96-8cf5-0268e30dcfb6',
    discount: 0,
    currentPrice: 15000,
    oldPrice: 15000,
    rating: 0,
    quantity: 1,
    category: 'electronics',
    description:
      'شاشة Super Retina XDR فائقة السطوع مقاس 6.1 بوصات تتميز بالتشغيل الدائم ، والتي تبقي معلوماتك في لمح البصر\r\nDynamic Island ، طريقة سحرية جديدة للتفاعل مع iPhone\r\nميزة الطوارئ SOS عبر القمر الصناعي\r\nواكتشاف الأعطال - ميزات رائدة مصممة لإنقاذ الأرواح\r\nكامير',
    productStatus: 'open',
    CreateDate: '2023-03-26T16:36:24.000Z',
    UpdateDate: '2023-03-26T16:58:39.000Z',
    itemTotal: 15000
  }
]

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? origin?.includes(url.dev)
      ? `http://${url.dev}:4000`
      : `http://${url.local}:4000`
    : `https://ecommerce-server-mhmdhidr.vercel.app`

export const ORDER = {
  _id: '63ff8ff8b',
  orderId: '7ae07a76-7674-4c05-9d0c-c3332a292690',
  userId: 'undefined',
  userEmail: 'soft.eng.mohammed@gmail.com',
  personName: 'مستر محمد',
  personPhone: '12312311',
  personAddress: '12312311',
  personNotes: '',
  orderItems: [
    {
      cItemId: '63e7381d0466a1d3fb2bbeba',
      cHeading: 'حقيبة نسائية',
      cImg: [
        {
          foodImgDisplayName: 'caa8fbbd-3f3f-4cd0-97d9-c851581bf8faburger.webp',
          foodImgDisplayPath:
            'https://mhmdhidr-uploads.s3.amazonaws.com/caa8fbbd-3f3f-4cd0-97d9-c851581bf8faburger.webp'
        },
        {
          foodImgDisplayName: 'bb21ee9a-9caa-434b-a50f-d675f427dd1fburger2.webp',
          foodImgDisplayPath:
            'https://mhmdhidr-uploads.s3.amazonaws.com/bb21ee9a-9caa-434b-a50f-d675f427dd1fburger2.webp'
        },
        {
          foodImgDisplayName: '9be71fc1-d6b4-4190-bd34-51d817aeb395burger3.webp',
          foodImgDisplayPath:
            'https://mhmdhidr-uploads.s3.amazonaws.com/9be71fc1-d6b4-4190-bd34-51d817aeb395burger3.webp'
        }
      ],
      cPrice: 25,
      cCategory: 'حقائب',
      cDesc:
        'برجر مشوي، مخلل، جبنة شيدر صفراء، بصل ناضج، طماطم ناضجة، لولو أخضر وصوص مايونيز بلسميك',
      cQuantity: 1
    }
  ],
  grandPrice: 39,
  orderStatus: 'pending',
  orderDate: '2023-03-01T17:46:22.908+00:00'
}

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
