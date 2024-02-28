import materialCursoScheme from '../models/materialCurso.models.js';

const materialCursoControllers = {};

materialCursoControllers.getMaterialCurso = async (req, res) => {
    try {
        const materialCurso = await materialCursoScheme.find();
        res.status(200).json(materialCurso);
    } catch (error) {
        console.error('Error al obtener materialCurso:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

materialCursoControllers.postMaterialCurso = async (req, res) => {
    try {
        const {
            codigo_material, 
            codigo_curso,
            nombre_material,
            archivo,
        } = req.body;

        const nuevoMaterialCurso = new materialCursoScheme({
            codigo_material,
            codigo_curso,
            nombre_material,
            archivo,
        });

        const materialCursoGuardado = await nuevoMaterialCurso.save();

        res.status(201).json(materialCursoGuardado);
    } catch (error) {
        console.error('Error al crear materialCurso:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export default materialCursoControllers;