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
 * @returns true if token is valid, false if token is invalid or expired
 */
export const isValidJwt = (token: string): boolean => {
  const decodedToken = parseJwt(token)
  return decodedToken && decodedToken.exp * 1000 >= Date.now()
}
