import mysql from 'mysql2'
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
  //,connectionLimit: 10
})

db.connect(function (err, _) {
  if (err) {
    console.log('ERROR: ' + err.message)
    throw err
  }
  console.log('connected to DB')
})

export default db
