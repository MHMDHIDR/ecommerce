export const { origin }: any = typeof window !== 'undefined' && window.location

export const ITEMS_PER_PAGE = 10

const url = {
  local: `localhost`,
  dev: `dev.com`
}

export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? origin?.includes(url.dev)
      ? `http://${url.dev}:3001`
      : `http://${url.local}:3001`
    : process.env.NEXT_PUBLIC_APP_PUBLIC_URL

export const API_URL = APP_URL + '/api'
