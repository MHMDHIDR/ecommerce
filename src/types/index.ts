import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react'

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
  onClick?: () => void
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

export type FileUploadProps = {
  file: File[]
  fileURLs: string[]
  setFileURLs(fileURLs: string[]): void
  onFileAdd: (e: { target: { files: any } }) => void
  onFileRemove(fileUrl: string, fileName: string): void
}

export type PaginationProps = {
  routeName: string
  pageNum: number
  numberOfPages: number
  count: number
  Id?: string
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
  fill?: string
  width?: string | number
  height?: string | number
  className?: string
}

export type SearchContextProps = {
  setSearch: (search: string) => void
  search: string
  searchResults: any[]
  setSearchFor: (searchFor: string) => void
  setCategory: (itemCategory: string) => void
  // loading: boolean
  // error: any
}

export type SearchResultsProps = {
  itemName: string
  itemCategories: string[]
}

export type ThemeProps = {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
  setHtmlToDark: (isDark: boolean) => void
  getLocalStorageTheme: () => boolean
  setLocalStorageTheme: (isDark: boolean) => void
}

export type NavMenuPros = {
  children: React.ReactNode
  isOptions?: boolean
  label?: string
  className?: string
  src?: string
}

export type MenuItem = {
  item: {
    label: string
    to: string
    icon: ({
      className,
      onClick
    }: {
      className?: string | undefined
      onClick?: (() => void) | undefined
    }) => JSX.Element
  }
}

export type AppSettingsProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
  setSidebarOpen: (isSidebarOpen: boolean) => void
  menuToggler: () => void
  setLocalStorageUser: (user: UserType) => void
  getLocalStorageUser: () => string
  user: UserType
  setUser: Dispatch<SetStateAction<UserType>>
}

export type ImgsProps = {
  ImgDisplayPath: string
  ImgDisplayName: string
}

export type NoItemsProps = {
  icon?: JSX.Element
  msg?: string
  links?: {
    to: string
    label: string
  }[]
  className?: string
}

export type axiosProps = {
  url: string
  method?: string
  body?: string | null
  headers?: string | null
}

export type catchResponse = {
  response: {
    data: {
      message: string
      error: string
      userLoggedIn?: number
      supplierLoggedIn?: number
      adminLoggedIn?: number
      userAdded?: number
      adminAdded?: number
      supplierAdded?: number
    }
  }
}

export type ButtonProps = {
  children: JSX.Element
  color?: string
}

export type ProductProps = {
  id: string
  itemName: string
  imgUrl: string
  discount: boolean
  currentPrice: number
  oldPrice: number
  rating: number
  quantity: number
  category: string
  description: string
  productStatus: string
  CreateDate: string
  UpdateDate: string
  itemStatus?: 'accept' | 'reject' | 'pending'
  rejectReason?: string
  addedById?: string
  addedByName?: string
  itemId?: string
}

export type Item = {
  [key: string]: any
  id: string
  currentPrice: number
  oldPrice: number
  itemName: string
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

export type ControlBtnProps = {
  className?: string
  label?: string
  onClick?: () => void
  id?: string
}

export type NotifyProps = {
  type: 'success' | 'info' | 'error'
  msg: string
  reloadIn?: number
  reloadTo?: string
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
}

export type UserType = {
  id: string
  firstname?: string
  lastname?: string
  gender?: string
  houseNumber?: number
  streetName?: string
  neighborhoodName?: string
  cityName?: string
  username: string
  avatarUrl: string
  phone: string
  status: string
  type: string
  registerDate: string
  isAuth?: boolean
  dataFrom?: string
}

export type ActionBtnsProps = {
  id: string
  phone?: string
  itemName?: string
  supplierId?: string
  itemId?: string
  type?: string
  label?: string
}

export type SupplierOrders = {
  [key: string]: { items: any[]; orderStatus: string }
}

export type StatusChangeProps = {
  productItems: SupplierOrders
  id: string
  newStatus: string
  rejectReason?: string
  itemId: string
}
