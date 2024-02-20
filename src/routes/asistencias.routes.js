import { Router } from "express"

import asistenciasController from "../controllers/asistencias.controllers.js"
const { getAsistencias, postAsistencias } = asistenciasController

const router = Router()

router.route("/")
    .get(asistenciasController.getAsistencias)
    .post(asistenciasController.postAsistencias)

export default router