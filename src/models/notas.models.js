import { Schema, model } from "mongoose"

const NotaSchema = new Schema({
    codigo_nota: {
        type: String,
        required: true,
    },
    codigo_estudiante: {
        type: String,
        required: true,
    },
    codigo_curso: {
        type: String,
        required: true,
    },
    nota: {
        type: Number,
        required: true,
    },
})

export default model("Nota", NotaSchema)