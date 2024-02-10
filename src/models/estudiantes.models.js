import Joi from "joi"
import { Schema, model } from "mongoose"

const EstudiantesScheme = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
})

export default model("Estudiantes", EstudiantesScheme)
