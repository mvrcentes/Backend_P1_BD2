import e from "express"
import PersonalSchema from "../models/personal.models.js"

const personalControllers = {}

personalControllers.getPersonal = async (req, res) => {
    try {
        const personal = await PersonalSchema.find()
        res.status(200).json(personal)
    } catch (error) {
        console.error("Error al obtener personal:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

personalControllers.postPersonal = async (req, res) => {
    try {
        const {
            codigo_personal,
            nombre,
            apellido,
            edad,
            sexo,
            dpi,
            tipo_de_trabajo,
            salario,
        } = req.body

        const nuevoPersonal = new PersonalSchema({
            codigo_personal,
            nombre,
            apellido,
            edad,
            sexo,
            dpi,
            tipo_de_trabajo,
            salario,
        })

        const personalGuardado = await nuevoPersonal.save()

        res.status(201).json(personalGuardado)
    } catch (error) {
        console.error("Error al crear personal:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

personalControllers.getPersonalByCode = async (req, res) => {
    try {
        const { codigo_personal } = req.params
        const personal = await PersonalSchema.findOne({ codigo_personal })

        if (!personal) {
            return res.status(404).json({ error: "Personal no encontrado" })
        }

        res.status(200).json(personal)
    } catch (error) {
        console.error("Error al obtener personal por código:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

personalControllers.deletePersonal = async (req, res) => {
    try {
        const { codigo_personal } = req.params
        const personalEliminado = await PersonalSchema.findOneAndDelete({ codigo_personal })

        if (!personalEliminado) {
            return res.status(404).json({ error: "Personal no encontrado" })
        }

        res.status(200).json(personalEliminado)
    } catch (error) {
        console.error("Error al eliminar personal:", error.message)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}

export default personalControllers