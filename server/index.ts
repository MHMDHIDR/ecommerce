import express from 'express'
import { Request, Response } from 'express'
import 'dotenv/config'

const { PORT } = process.env
const app = express()

app.get('/', (_req: Request, res: Response) =>
  res.send(
    `<body style='overflow:hidden;word-spacing:2rem;height:100vh;display:grid;place-items:center;font-size:3em;font-weight:bold;color:white;background-color:#222'>WELCOME TO eCommerce API</body>`
  )
)

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`))
