import express from "express"
import cors from "cors"

import estudiantesRoutes from "./routes/estudiantes.routes.js"
import cursosRoutes from "./routes/cursos.routes.js"
import personalRoutes from "./routes/personal.routes.js"
import asistenciasRoutes from "./routes/asistencias.routes.js"
import notasRoutes from "./routes/notas.routes.js"

const app = express()

// Settings
app.set("port", process.env.PORT || 3000)

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/estudiantes', estudiantesRoutes)
app.use('/api/cursos', cursosRoutes)
app.use('/api/personal', personalRoutes)
app.use('/api/asistencias', asistenciasRoutes)
app.use('/api/notas', notasRoutes)

export default app
