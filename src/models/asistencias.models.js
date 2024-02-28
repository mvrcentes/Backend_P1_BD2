import { Schema, model } from "mongoose"

const AsistenciaSchema = new Schema({
    codigo_asistencia: {
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