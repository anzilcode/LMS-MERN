import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

// Database Connection
await connectDb()

// Middleware
app.use(cors())

// Routes
app.get('/', (req, res) => res.send("Api working"))

app.post('/clerk', express.json(), clerkWebhooks)

//PORT
const PORT = process.env.PORT || 5000


app.listen(PORT, () =>{ 
  console.log(`Server running at PORT:${PORT}`)
})

