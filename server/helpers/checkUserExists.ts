import db from './db.js'

export const checkUserExists = async (identifier: string, identifierType: string) => {
  return new Promise<boolean>((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE ${identifierType} = ? 
                UNION 
                SELECT * FROM suppliers WHERE ${identifierType} = ? 
                UNION 
                SELECT * FROM admins WHERE ${identifierType} = ?`
    db.query(sql, [identifier, identifier, identifier], (error, results: any[]) => {
      if (error) reject(error)
      else resolve(results.length > 0)
    })
  })
}
