import { Router } from "express"

import materialCursoController from "../controllers/materialCurso.controllers.js"
const { getMaterialCurso, postMaterialCurso } = materialCursoController

const router = Router()

router.route("/")
   .get(materialCursoController.getMaterialCurso)
   .post(materialCursoController.postMaterialCurso)

export default router
