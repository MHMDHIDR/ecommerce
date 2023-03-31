export const fromTable = (type: string): string => {
  let table
  switch (type) {
    case 'user': {
      table = 'users'
      break
    }
    case 'supplier': {
      table = 'suppliers'
      break
    }
    case 'admin': {
      table = 'admins'
      break
    }
    default: {
      table = 'users'
      break
    }
  }
  return table
}
