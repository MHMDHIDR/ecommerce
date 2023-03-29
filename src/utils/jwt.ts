const parseJwt = (token: string) => {
  try {
    return JSON.parse(window.atob(token.split('.')[1]))
  } catch (e) {
    console.error(e)
    return null
  }
}

/**
 *
 * @param token string
 * @returns true if token is valid, false if token is expired
 */
export const isValidJwt = (token: string): boolean =>
  parseJwt(token)!.exp * 1000 < Date.now()
