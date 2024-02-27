import NotasScheme from '../models/notas.models.js'
import Estudiante from '../models/estudiantes.models.js'
import Curso from "../models/cursos.models.js"

const notasControllers = {}

notasControllers.getNotasEstudiante = async (req, res) => {
    try {
        const { codigo_estudiante } = req.params
        const notasEstudiante = await NotasScheme.find({ codigo_estudiante })
        res.status(200).json(notasEstudiante)
    } catch (error) {
        console.error("Error al obtener notas del estudiante:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

notasControllers.editNotas = async (req, res) => {
    try {
        const { codigo_estudiante } = req.params
        const { codigo_curso, notas } = req.body

        const estudiante = await Estudiante.findOne({ codigo_estudiante })
        if (!estudiante) {
            return res.status(404).json({ error: "Estudiante no encontrado" })
        }

        const curso = await Curso.findOne({ codigo_curso })
        if (!curso) {
            return res.status(404).json({ error: "Curso no encontrado" })
        }

        const notasEstudiante = await NotasScheme.findOne({ codigo_estudiante, codigo_curso })
        if (!notasEstudiante) {
            const nuevaNota = new NotasScheme({
                codigo_estudiante,
                codigo_curso,
                notas
            })
            const notaGuardada = await nuevaNota.save()
            return res.status(201).json(notaGuardada)
        }

        notasEstudiante.notas = notas
        const notaGuardada = await notasEstudiante.save()
        res.status(200).json(notaGuardada)
    } catch (error) {
        console.error("Error al editar notas del estudiante:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export default notasControllers