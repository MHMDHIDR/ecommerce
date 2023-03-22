export const { origin }: any = typeof window !== 'undefined' && window.location

export const ITEMS_PER_PAGE = 10

export const MAX_QUANTITY = 100

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
    description: `
    حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! ... حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك!
    حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! ... حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك!
    حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! ... حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك!
    حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! ... حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك! حذاء جديد بتصميم عصري وأنيق سيبدو رائع عليك!
    `,
    productStatus: 'open',
    productCreateDate: '2023-03-01 18:23:19.000000',
    productUpdateDate: '2023-03-19 18:23:19.000000'
  }
}

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
  orderStatus: 'accept',
  orderDate: '2023-03-01T17:46:22.908+00:00'
}
