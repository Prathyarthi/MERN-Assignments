import express from 'express'
import cardRoutes from './routes/card.routes.js'
import cors from 'cors'

const app = express();

app.use(express.json())

app.use(cors)

app.use('/card', cardRoutes)

export default app