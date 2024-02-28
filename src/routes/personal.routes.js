import { Router } from "express"

import personalController from "../controllers/personal.controllers.js"
const { getPersonal, postPersonal, deletePersonal, getPersonalByCode } = personalController

const router = Router()

router.route("/")
    .get(getPersonal)
    .post(postPersonal)

router.route("/:codigo_personal")
    .get(getPersonalByCode)
    .delete(deletePersonal)

export default router