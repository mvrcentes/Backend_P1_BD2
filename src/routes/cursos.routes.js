import { Router } from "express"

import cursosController from "../controllers/cursos.controllers.js"
const { getCursos, postCursos } = cursosController

const router = Router()

router.route("/")
    .get(cursosController.getCursos)
    .post(cursosController.postCursos)

router.route("/:codigo_curso")
    .get(cursosController.getCurso)

export default router