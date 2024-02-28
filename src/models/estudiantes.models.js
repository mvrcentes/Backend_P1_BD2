import { Schema, model } from "mongoose";

const EstudianteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    codigo_estudiante: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    sexo: {
        type: String,
        enum: ["Masculino", "Femenino", "Otro"],
        required: true,
    },
    contactos_de_emergencia: [
        {
            nombre: String,
            apellido: String,
            parentesco: String,
            telefono: String,
        },
    ],
    cursos_actuales: [
        {
            codigo_curso: {
                type: String,
                required: true,
            },
        },
    ],
});

export default model("Estudiante", EstudianteSchema);
