import { Router } from "express"

import personalController from "../controllers/personal.controllers.js"
const { getPersonal, postPersonal } = personalController

const router = Router()

router.route("/")
    .get(getPersonal)
    .post(postPersonal)

export default router