import db from './db.js'

export const checkUserExists = async (identifier: string): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const query = `SELECT username, phone FROM users WHERE username = ? OR phone = ?
                UNION 
                SELECT username, phone FROM admins WHERE username = ? OR phone = ?
                UNION 
                SELECT username, phone FROM suppliers WHERE username = ? OR phone = ?`
    db.query(
      query,
      [identifier, identifier, identifier, identifier, identifier, identifier],
      (error, results: any[]) => {
        if (error) reject(error)
        else resolve(results.length > 0)
      }
    )
  })
}
