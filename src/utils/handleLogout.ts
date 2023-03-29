import { removeCookies } from './cookies'

export const handleLogout = (to: string) => {
  removeCookies()
  location.replace(to)
}
