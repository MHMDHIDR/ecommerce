import mysql from 'mysql'

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'u421310157_ecommerce',
  password: 'u421310157_eCommerce',
  database: 'u421310157_ecommerce'
})
