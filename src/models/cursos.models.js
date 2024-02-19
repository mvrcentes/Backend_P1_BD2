import { Schema, model } from "mongoose"

const CursoSchema = new Schema({
    codigo_curso: {
        type: String,
        required: true,
    },
    nombre_del_curso: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    fecha_de_inicio: {
        type: Date,
        required: true,
    },
    fecha_de_finalizacion: {
        type: Date,
        required: true,
    },
    horario: {
        type: String,
        required: true,
    },
    profesor: {
        type: Schema.Types.ObjectId,
        ref: "Personal",
    },
    grado: {
        type: String,
        required: true,
    },
})

export default model("Curso", CursoSchema)
