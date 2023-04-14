import { UserType } from '@/types'

export function getUserFullName(users: UserType[], userId: string) {
  const user = users.find((user: UserType) => user.id === userId)
  if (user) {
    return !user.firstname && !user.lastname
      ? 'لم يتم تحديد اسم العميل'
      : `${user.firstname} ${user.lastname}`
  }
  return null
}
