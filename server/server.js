// server.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("API working"))
app.post('/clerk', clerkWebhooks)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDb()
    app.listen(PORT, () => {
      console.log(`Server running at PORT:${PORT}`)
    })
  } catch (err) {
    console.error('DB connection failed:', err)
    process.exit(1)
  }
}

startServer()
export default app

