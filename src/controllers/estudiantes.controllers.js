import database from "../database.js"

import EstudiantesScheme from "../models/estudiantes.models.js"

const estudiantesControllers = {}

// estudiantesControllers.getEstudiantes = async (req, res) => {

// }

estudiantesControllers.postEstudiantes = async (req, res) => {
    new EstudiantesScheme({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
    }).save()
    res.send("Estudiante creado")
}
export default estudiantesControllers
