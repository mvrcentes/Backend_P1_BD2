import { Router } from "express"

import estudiantesController from "../controllers/estudiantes.controllers.js"
const { postEstudiantes } = estudiantesController

const router = Router()

router.route("/")
    // .get(getEstudiantes)
    .post(postEstudiantes)

export default router