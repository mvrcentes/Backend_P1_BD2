import NotasScheme from "../models/notas.models.js"
import Estudiante from "../models/estudiantes.models.js"
import Curso from "../models/cursos.models.js"
import mongoose from "mongoose"

const notasControllers = {}

notasControllers.getNotasEstudiante = async (req, res) => {
    try {
        const { codigo_estudiante } = req.params

        const estudianteEncontrado = await Estudiante.findOne({
            codigo_estudiante,
        })

        if (!estudianteEncontrado) {
            return res.status(400).json({
                error: `No se encontró al estudiante con el código ${codigo_estudiante}`,
            })
        }

        console.log(estudianteEncontrado)

        const notasEstudiante = await NotasScheme.find({
            codigo_estudiante: codigo_estudiante,
        })
        res.status(200).json(notasEstudiante)
    } catch (error) {
        console.error("Error al obtener notas del estudiante:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

notasControllers.editNotas = async (req, res) => {
    try {
        const { codigo_estudiante } = req.params
        const { codigo_curso, codigo_nota, nota } = req.body

        const notasEstudiante = await NotasScheme.findOne({
            codigo_estudiante,
            codigo_curso,
        })
        if (!notasEstudiante) {
            const nuevaNota = new NotasScheme({
                codigo_nota,
                codigo_estudiante,
                codigo_curso,
                nota,
            })
            const notaGuardada = await nuevaNota.save()
            return res.status(201).json(notaGuardada)
        }

        notasEstudiante.nota = nota
        const notaGuardada = await notasEstudiante.save()
        res.status(200).json(notaGuardada)
    } catch (error) {
        console.error("Error al editar notas del estudiante:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

notasControllers.postNota = async (req, res) => {
    try {
        const { codigo_nota, codigo_estudiante, codigo_curso, nota } = req.body

        // Verificar si el estudiante existe en la base de datos
        const estudianteEncontrado = await Estudiante.findOne({
            codigo_estudiante,
        })

        if (!estudianteEncontrado) {
            return res.status(400).json({
                error: `No se encontró al estudiante con el código ${codigo_estudiante}`,
            })
        }
        // Verificar si el curso existe en la base de datos
        const cursoEncontrado = await Curso.findOne({ codigo_curso })
        if (!cursoEncontrado) {
            return res.status(400).json({
                error: `No se encontró al curso con el código ${codigo_curso}`,
            })
        }

        const nuevaNota = new NotasScheme({
            codigo_nota,
            codigo_estudiante: estudianteEncontrado._id,
            codigo_curso: cursoEncontrado._id,
            nota,
        })

        const notaGuardado = await nuevaNota.save()

        res.status(201).json(notaGuardado)
    } catch (error) {
        console.error("Error al crear nota:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export default notasControllers
