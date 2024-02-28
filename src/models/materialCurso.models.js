import { Schema, model } from "mongoose"

const MaterialCursoSchema = new Schema({
    codigo_material: {
        type: String,
        required: true,
    },
    codigo_curso: {
        type: String,
        required: true,
    },
    nombre_material: {
        type: String,
        required: true,
    },
    archivo: String,
    tipo_material: {
        type: String,
        required: true,
    },
})

export default model("MaterialCurso", MaterialCursoSchema)
