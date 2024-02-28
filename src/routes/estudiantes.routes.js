import { Router } from "express"

import estudiantesController from "../controllers/estudiantes.controllers.js"
const { getEstudiantes ,postEstudiantes, getTopEstudiantesPorCurso } = estudiantesController

const router = Router()

router.route("/")
    .get(getEstudiantes)
    .post(postEstudiantes)

router.route("/top-estudiantes-por-curso")
    .get(getTopEstudiantesPorCurso)

export default router