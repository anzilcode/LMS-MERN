import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

const startServer = async () => {
  try {
    await connectDb()
    app.use(cors())

    app.get('/', (req, res) => {
      res.send('API working')
    })

    app.post('/clerk', express.json(), clerkWebhooks)

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server running at PORT: ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
  }
}

startServer()
