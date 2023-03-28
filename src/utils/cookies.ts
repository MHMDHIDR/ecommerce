import Cookies from 'js-cookie'

export const setCookies = (token: string): string | undefined =>
  Cookies.set('eCommerce', token, { expires: 7 })

export const getCookies = (): string | undefined => Cookies.get('eCommerce')

export const removeCookies = (): void => {
  const eCommerceCookie = Cookies.get('eCommerce')
  if (eCommerceCookie) {
    Cookies.remove('eCommerce')
  }
}
