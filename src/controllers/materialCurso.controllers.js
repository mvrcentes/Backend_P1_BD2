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
        const materialCursoData = req.body;

        if (Array.isArray(materialCursoData)) {
            const materialCursoDocuments = materialCursoData.map(({ codigo_material, codigo_curso, nombre_material, archivo, tipo_material }) => ({
                codigo_material,
                codigo_curso,
                nombre_material,
                archivo,
                tipo_material,
            }));

            const insertedMaterialCursos = await materialCursoScheme.insertMany(materialCursoDocuments);

            res.status(201).json(insertedMaterialCursos);
        } else {
            const { codigo_material, codigo_curso, nombre_material, archivo, tipo_material } = materialCursoData;

            // Check if material with the same code already exists
            const existingMaterial = await materialCursoScheme.findOne({ codigo_material });

            if (existingMaterial) {
                return res.status(400).json({ error: 'Material with the same code already exists' });
            }

            const nuevoMaterialCurso = new materialCursoScheme({
                codigo_material,
                codigo_curso,
                nombre_material,
                archivo,
                tipo_material,
            });

            const materialCursoGuardado = await nuevoMaterialCurso.save();

            res.status(201).json(materialCursoGuardado);
        }
    } catch (error) {
        console.error('Error al crear materialCurso:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export default materialCursoControllers;