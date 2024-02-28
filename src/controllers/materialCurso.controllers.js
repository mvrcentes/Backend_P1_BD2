import materialCursoScheme from '../models/materialCurso.models.js';
import CursoSchema from '../models/cursos.models.js';

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
            // For each material in the array, find the ObjectID for the codigo_curso
            const materialCursoDocuments = await Promise.all(materialCursoData.map(async ({ codigo_material, codigo_curso, nombre_material, archivo, tipo_material }) => {
                // Lookup in CursoSchema to get the ObjectID
                const curso = await CursoSchema.findOne({ codigo_curso });
                
                if (!curso) {
                    return res.status(400).json({ error: `Curso with codigo_curso ${codigo_curso} not found` });
                }

                return {
                    codigo_material,
                    codigo_curso: curso._id, // Use the obtained ObjectID
                    nombre_material,
                    archivo,
                    tipo_material,
                };
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

            // Lookup in CursoSchema to get the ObjectID
            const curso = await CursoSchema.findOne({ codigo_curso });

            if (!curso) {
                return res.status(400).json({ error: `Curso with codigo_curso ${codigo_curso} not found` });
            }

            const nuevoMaterialCurso = new materialCursoScheme({
                codigo_material,
                codigo_curso: curso._id, // Use the obtained ObjectID
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