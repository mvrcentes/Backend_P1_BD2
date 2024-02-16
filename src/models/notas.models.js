import { Schema, model } from "mongoose"

const NotaSchema = new Schema({
    codigo_nota: {
        type: String,
        required: true,
    },
    codigo_estudiante: {
        type: Schema.Types.ObjectId,
        ref: "Estudiante",
    },
    codigo_curso: {
        type: Schema.Types.ObjectId,
        ref: "Curso",
    },
    nota: {
        type: Number,
        required: true,
    },
})

export default model("Nota", NotaSchema)