import { MouseEventHandler, ReactNode, KeyboardEvent } from 'react'

export type UserProps = {
  token?: string
  userAccountType?: string
  userEmail?: string
  userFullName: string
  _id?: string
  LoggedIn?: number
  message?: string
}

export type ModalProps = {
  msg?: string
  extraComponents?: ReactNode
  status?: ReactNode
  modalHidden?: string
  classes?: string
  redirectLink?: string
  redirectTime?: number
  btnName?: string
  btnLink?: string
  ctaConfirmBtns?: string[]
  ctaSpecialBtns?: string[]
  fullscreen?: boolean
}

export type DotButtonProps = {
  selected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export type PrevNextButtonProps = {
  enabled: boolean
  onClick: DotButtonProps['onClick']
}

export type EmblaThumbProps = DotButtonProps & {
  imgSrc: string
  alt: string
}

export type CartProps = {
  items: any[]
  setItems: any
  addToCart: any
  removeFromCart: any
  setGrandPrice: any
  grandPrice: number
}

export type FileUploadProps = {
  file: File[]
  fileURLs: string[]
  setFileURLs(fileURLs: string[]): void
  onFileAdd: (e: { target: { files: any } }) => void
  onFileRemove(fileUrl: string, fileName: string): void
}

export type FileUploadComponentProps = {
  data: {
    id?: string
    Name: string
    defaultImg: {
      ImgDisplayName: string
      ImgDisplayPath: string
      websiteLogoDisplayName?: string
    }[]
  }
  ignoreDelete?: boolean
}

export type uploadurlDataProps = {
  data: {
    fields: {
      'Content-Type': string
      'PolicyX-Amz-Algorithm': string
      'X-Amz-Credential': string
      'X-Amz-Date': string
      'X-Amz-Signature': string
      bucket: string
      key: string
    }
    url: string
  }[]
}

export type orderMsgProps = {
  Success: string
  Failure: string
}

export type DividerProps = {
  thickness?: number
  style?: 'dashed'
  marginY?: number
}

export type settingsProps = {
  appName: string
  websiteLogoDisplayPath: string
  appDesc: string
  whatsAppNumber: string
  instagramAccount: string
  twitterAccount: string
}

export type headerProps = {
  appTagline: string
  websiteLogoDisplayPath: string
}

export type MyLinkProps = {
  children: ReactNode
  to?: string
  className?: string
}

export type NavMenuPros = {
  children: ReactNode
  isOptions?: boolean
  label?: string
  className?: string
  src?: string
}

export type orderInfoProps = {
  order?: Object | null
  id?: string
  status: string
  email: string
}

export type PaginationProps = {
  routeName: string
  pageNum: number
  numberOfPages: number
  count: number
  foodId?: string
  itemsPerPage?: number
  category?: string
  loaction?: string
}

export type ArrowProps = {
  width?: string
  height?: string
  toLeft?: boolean
  className?: string
}

export type LogoProps = {
  width?: string | number
  height?: string | number
  className?: string
  color?: 'white' | 'black' | ''
}

export type SearchContextProps = {
  setSearch: (search: string) => void
  search: string
  searchResults: any[]
  setSearchFor: (searchFor: string) => void
  setFoodCategory: (foodCategory: string) => void
  loading: boolean
  error: any
}

export type TagsProps = {
  tags: string[]
  setTags: (tags: string[]) => void
  removeTags: (index: number) => void
  addTag: (e: KeyboardEvent<HTMLInputElement>) => void
  saveSelectedTags: (id: number, tags: string[]) => void
  removeSelectedTags: (id: number) => any
  selectedTags: { id: string; tags: string[] }[]
}

export type AddTagsProps = {
  key: string
  preventDefault: () => void
  target: { value: string } | any
}

export type removeSelectedTagsProps = {
  id: number
}

export type ThemeProps = {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
  getLocalStorageTheme: () => boolean
}

export type ImgsProps = {
  ImgDisplayPath: string
  ImgDisplayName: string
}

export type NoItemsProps = {
  msg?: string
  links: {
    to: string
    label: string
  }[]
  className?: string
}

export type cCategory = {
  foods: number
  drinks: number
  sweets: number
}

export type notificationProps = {
  sendStatus: number
  sendStatusMsg: string
}

export type mediaProps = {
  foodId?: string
  foodImgDisplayPath: string
  foodName: string
  _id?: string
  foodPrice?: number
}[]

export type axiosProps = {
  url: string
  method?: string
  body?: string | null
  headers?: string | null
}

export type authUserRequestProps = {
  user: {
    _id: string
    userEmail: string
    userAccountType: string
  }
}

export type fileRequestProps = {
  key: string
  type: string
}

export type ButtonProps = {
  children: JSX.Element
  color?: string
}

export type deleteFoodEventListenerProps = {
  target: {
    id: string
    dataset: {
      imgName: string
      name: string
    }
  }
}

export type Item = {
  [key: string]: any
  id: string
  currentPrice: number
  oldPrice: number
  name: string
  imgUrl: string
  description: string
  quantity: number
  itemTotal?: number
  discount?: boolean
  rating?: number
}

export type InitialState = {
  id: string
  items: Item[]
  isEmpty: boolean
  totalItems: number
  totalUniqueItems: number
  cartTotal: number
}

export type CartProviderState = InitialState & {
  addItem: (item: Item, quantity?: number) => void
  removeItem: (id: Item['id']) => void
  updateItem: (id: Item['id'], payload: object) => void
  setItems: (items: Item[]) => void
  updateItemQuantity: (id: Item['id'], quantity: number) => void
  emptyCart: () => void
  getItem: (id: Item['id']) => any | undefined
  inCart: (id: Item['id']) => boolean
}

export type Actions =
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; id: Item['id'] }
  | {
      type: 'UPDATE_ITEM'
      id: Item['id']
      payload: object
    }
  | { type: 'EMPTY_CART' }

export type DashboardHomeProps = {
  orderItemsCount: number
  menuItemsCount: number
}

export type ControlBtnProps = {
  className?: string
  label?: string
  onClick?: () => void
}
