export const validEmail = (email: string) => {
  const emailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){3,}@((\[[0-9]{2,3}\.[0-9]{2,3}\.[0-9]{2,3}\.[0-9]{2,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,15}))$/

  return email.match(emailFormat) ? true : false
}

/**
 * regex for Name it must contain:
 * - should be in English OR in Arabic but can not be in both,
 * - at least 3 characters,
 * - maximum 20 characters,
 * - it can not have any special characters
 */
export const validName = (name: string) => {
  const arabicPattern = /^[\u0621-\u064A]{3,20}$/
  const englishPattern = /^[a-zA-Z]{3,20}$/

  // check if the first character is Arabic or English
  const firstCharIsArabic = arabicPattern.test(name[0])
  const firstCharIsEnglish = englishPattern.test(name[0])

  // check if the rest of the name follows the pattern based on the first character
  const restOfNameIsValid = firstCharIsArabic
    ? arabicPattern.test(name.slice(1))
    : firstCharIsEnglish
    ? englishPattern.test(name.slice(1))
    : false

  return restOfNameIsValid
}

/**
 * regex for username it must contain:
 * - should be in English,
 * - at least 3 characters,
 * - any optional special character
 * - maximum 20 characters,
 */
export const validUsername = (username: string) => {
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9@_.,]{3,20}$/
  return usernamePattern.test(username)
}

/**
 * regex for password it must contain:
 * - at least one lowercase letter,
 * - one uppercase letter,
 * - one number,
 * - one special character, and at least 8 characters AND maximum of 50 characters
 */
export const validPassword = (password: string) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,30}$/
  return passwordPattern.test(password)
}

/**
 * Validation for phone number
 * @param phone is string, this function validates phone numbers to be in sudan
 *  valid phone number can either start with +249 or 0, followed by the digit 1, and then one of the digits 0, 1, 2, 4, or 9, and then 7 more digits.
 *  Here are some examples of valid phone numbers that match this pattern:
 *  +249112345678
 *  0123456789
 *  0912345678
 *  +249912345678
 * @returns true if phone is valid, false if phone is not valie
 */
export const validPhone = (phone: string) => {
  const phonePattern = /^(\+249|0)?1[01249]\d{7}$/
  return phonePattern.test(phone)
}
