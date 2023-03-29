import { removeCookies } from './cookies'

export const handleLogout = (to: string) => {
  removeCookies()
  if ('user' in localStorage) {
    localStorage.removeItem('user')
  }

  location.replace(to)
}
