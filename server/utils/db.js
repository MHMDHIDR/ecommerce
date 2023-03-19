import mysql from 'mysql'

export const db = mysql.createConnection({
  host: 'sql844.main-hosting.eu',
  user: 'u421310157_ecommerce',
  password: 'u421310157_eCommerce',
  database: 'u421310157_ecommerce'
})

db.connect(function (err) {
  if (err) throw err
  console.log('DB connected')
})
