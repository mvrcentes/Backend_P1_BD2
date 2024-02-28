import database from "../database.js"

import EstudiantesScheme from "../models/estudiantes.models.js"

const estudiantesControllers = {}

estudiantesControllers.getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await EstudiantesScheme.find()
        res.status(200).json(estudiantes)
    } catch (error) {
        console.error("Error al obtener estudiantes:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

estudiantesControllers.postEstudiantes = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            codigo_estudiante,
            edad,
            sexo,
            contactos_de_emergencia,
            cursos_actuales,
        } = req.body

        // Check if a student with the same codigo_estudiante already exists
        const existingStudent = await EstudiantesScheme.findOne({ codigo_estudiante })

        if (existingStudent) {
            return res.status(400).json({ error: "El código de estudiante ya está en uso" })
        }

        const nuevoEstudiante = new EstudiantesScheme({
            nombre,
            apellido,
            codigo_estudiante,
            edad,
            sexo,
            contactos_de_emergencia,
            cursos_actuales,
        })

        const estudianteGuardado = await nuevoEstudiante.save()

        res.status(201).json(estudianteGuardado)
    } catch (error) {
        console.error("Error al crear estudiante:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export default estudiantesControllers
