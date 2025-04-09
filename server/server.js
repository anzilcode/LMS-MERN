import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDb from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

const app = express()

//databse Connection
await connectDb()

//middleware
app.use(cors())


//routes
app.get('/',(req,res)=>{
    res.send("Api working")
})

app.post('/clerk', express.json(),clerkWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running at PORT:${PORT}`)
})