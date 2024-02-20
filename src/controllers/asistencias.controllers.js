import asistenciasScheme from "../models/asistencias.models.js"
import Estudiante from "../models/estudiantes.models.js"
import Curso from "../models/cursos.models.js"

const asistenciasControllers = {}

asistenciasControllers.getAsistencias = async (req, res) => {
    try {
        const asistencias = await asistenciasScheme.find()
        res.status(200).json(asistencias)
    } catch (error) {
        console.error("Error al obtener asistencias:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

asistenciasControllers.postAsistencias = async (req, res) => {
    try {
        const {
            codigo_asistencia,
            codigo_estudiante,
            codigo_curso,
            fecha,
            asistencia,
        } = req.body

        // Verificar si el estudiante existe en la base de datos
        const estudianteEncontrado = await Estudiante.findOne({
            codigo_estudiante,
        })
        if (!estudianteEncontrado) {
            return res
                .status(400)
                .json({
                    error: `No se encontró al estudiante con el código ${codigo_estudiante}`,
                })
        }

        // Verificar si el curso existe en la base de datos
        const cursoEncontrado = await Curso.findOne({ codigo_curso })
        if (!cursoEncontrado) {
            return res
                .status(400)
                .json({
                    error: `No se encontró al curso con el código ${codigo_curso}`,
                })
        }

        // Convertir la cadena de fecha en un objeto Date
        const fechaAsistencia = new Date(fecha)

        // Crear un nuevo documento de asistencia
        const nuevaAsistencia = new asistenciasScheme({
            codigo_asistencia,
            codigo_estudiante: estudianteEncontrado._id,
            codigo_curso: cursoEncontrado._id,
            fecha: fechaAsistencia,
            asistencia,
        })

        // Guardar el documento de asistencia en la base de datos
        const asistenciaGuardada = await nuevaAsistencia.save()

        res.status(201).json(asistenciaGuardada)
    } catch (error) {
        console.error("Error al crear asistencia:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export default asistenciasControllers
