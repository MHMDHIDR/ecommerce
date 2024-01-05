import express, { json, urlencoded } from 'express'
import { Request, Response } from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import 'dotenv/config'

const app = express()

//PORT
const PORT = process.env.PORT ?? 4000

//DON't SHOW EXPRESS IN RESPONSE HEADERS
app.disable('x-powered-by')

//APP Use
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(fileUpload())
app.use(
  cors({
    origin: [
      `https://ecommerce-mhmdhidr.vercel.app`,
      `https://mhmdhidr-ecommerce.vercel.app`,
      `http://localhost:3001`
    ]
  })
)

app.get('/', (_req, res) =>
  res.send(
    `<body style='overflow:hidden;word-spacing:2rem;height:100vh;display:grid;place-items:center;font-size:3em;font-weight:bold;color:white;background-color:#222'>WELCOME TO eCommerce API</body>`
  )
)

//Routes
import products from './routes/products.js'
import categories from './routes/categories.js'
import orders from './routes/orders.js'
import users from './routes/users.js'
import wishlists from './routes/wishlists.js'

// Use Routes
app.use('/products', products)
app.use('/categories', categories)
app.use('/orders', orders)
app.use('/users', users)
app.use('/wishlists', wishlists)

app.listen(PORT || 4000, () => console.log(`APP RUNNING ON=> ${PORT || 4000}`))
