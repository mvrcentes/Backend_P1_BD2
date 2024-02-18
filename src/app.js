import express from "express"
import cors from "cors"

import estudiantesRoutes from "./routes/estudiantes.routes.js"

import personalRoutes from "./routes/personal.routes.js"


const app = express()

// Settings
app.set("port", process.env.PORT || 3000)

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/estudiantes', estudiantesRoutes)

app.use('/api/personal', personalRoutes)

export default app
