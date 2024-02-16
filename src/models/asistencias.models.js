import { Schema, model } from "mongoose"

const AsistenciaSchema = new Schema({
    codigo_asistencia: {
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
    fecha: {
        type: Date,
        required: true,
    },
    asistencia: {
        type: Boolean,
        required: true,
    },
})

export default model("Asistencia", AsistenciaSchema)