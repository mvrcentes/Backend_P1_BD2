import CursosScheme from "../models/cursos.models.js"
import PersonalScheme from "../models/personal.models.js"

const cursosControllers = {}

cursosControllers.getCursos = async (req, res) => {
    try {
        const cursos = await CursosScheme.find()
        res.status(200).json(cursos)
    } catch (error) {
        console.error("Error al obtener cursos:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

cursosControllers.postCursos = async (req, res) => {
    try {
        const {
            codigo_curso,
            nombre_del_curso,
            descripcion,
            fecha_de_inicio,
            fecha_de_finalizacion,
            horario,
            profesor,
            grado,
        } = req.body

        // Aquí necesitas buscar al profesor en la base de datos para obtener su ObjectId
        const profesorEncontrado = await PersonalScheme.findOne({ nombre: profesor })

        if (!profesorEncontrado) {
            return res
                .status(400)
                .json({
                    error: `No se encontró al profesor con el nombre ${profesor}`,
                })
        }

        const nuevoCurso = new CursosScheme({
            codigo_curso,
            nombre_del_curso,
            descripcion,
            fecha_de_inicio,
            fecha_de_finalizacion,
            horario,
            profesor: profesorEncontrado._id, // Asignamos el ObjectId del profesor
            grado,
        })

        const cursoGuardado = await nuevoCurso.save()

        res.status(201).json(cursoGuardado)
    } catch (error) {
        console.error("Error al crear curso:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export default cursosControllers
