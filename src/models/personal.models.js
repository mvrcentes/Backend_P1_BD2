import { Schema, model } from "mongoose"

const PersonalSchema = new Schema({
    codigo_personal: {
        type: String,
        required: true,
    },
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
    sexo: {
        type: String,
        enum: ["Masculino", "Femenino", "Otro"],
        required: true,
    },
    dpi: {
        type: String,
        required: true,
    },
    tipo_de_trabajo: {
        type: String,
        required: true,
    },
    salario: {
        type: Number,
        required: true,
    },
})
