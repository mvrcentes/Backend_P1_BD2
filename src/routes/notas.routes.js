import { Router } from "express"

import notasController from "../controllers/notas.controllers.js"
const { getNotasEstudiante, editNotas ,postNota} = notasController

const router = Router()

router.route("/:codigo_estudiante")
    .get(getNotasEstudiante)
    .put(editNotas)
    .post(postNota)

export default router