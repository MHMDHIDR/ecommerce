import express, { json, urlencoded } from 'express'
import { Request, Response } from 'express'
import 'dotenv/config'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { db } from './utils/db.js'

const app = express()

//PORT
const { PORT } = process.env

//DON't SHOW EXPRESS IN RESPONSE HEADERS
app.disable('x-powered-by')

//APP Use
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(fileUpload())
app.use(
  cors({
    origin: [`https://mhmdhidr-ecommerce.vercel.app`, `http://localhost:5173`]
  })
)

app.get('/', (_req: Request, res: Response) =>
  res.send(
    `<body style='overflow:hidden;word-spacing:2rem;height:100vh;display:grid;place-items:center;font-size:3em;font-weight:bold;color:white;background-color:#222'>WELCOME TO eCommerce API</body>`
  )
)

app.post('/products', (req, res) => {
  const q = 'INSERT INTO products(`name`) VALUES (?)'

  const values = [req.body.name]

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err)
    return res.json(data)
  })
})

app.get('/products', (_req: Request, res: Response) => {
  const q = 'SELECT * FROM products'
  db.query(q, (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.json(data)
  })
})

app.listen(PORT || 4000, () => console.log(`start listening on port : ${PORT || 4000}`))
