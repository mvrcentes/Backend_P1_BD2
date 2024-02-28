import { MongoClient } from 'mongodb';
import faker from 'faker';



const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function obtenerProfesores() {
    const database = client.db('Proyecto1');
    const collection = database.collection('personals');
    const profesores = await collection.find({ tipo_de_trabajo: 'profesor' }).toArray();
    return profesores.map(profesor => profesor.codigo_personal);
}

function generarCodigoPersonal() {
    const trabajosEscolares = ['profesor', 'director', 'coordinador académico', 'secretario', 'bibliotecario'];
    const tipoDeTrabajo = faker.random.arrayElement(trabajosEscolares);
    const letraInicialTrabajo = tipoDeTrabajo.charAt(0).toUpperCase();
    const añoRandom = faker.datatype.number({ min: 2000, max: 2029 });
    const numeroRandom = faker.datatype.number({ min: 1, max: 5000 });
    return `${letraInicialTrabajo}${añoRandom}0${numeroRandom}`;
}

async function generarPersonal() {
    const codigoPersonal = generarCodigoPersonal();
    return {
        codigo_personal: codigoPersonal,
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: faker.datatype.number({ min: 23, max: 80 }),
        sexo: faker.random.arrayElement(["Masculino", "Femenino", "Otro"]),
        dpi: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
        tipo_de_trabajo: faker.random.arrayElement(['profesor', 'director', 'coordinador académico', 'secretario', 'bibliotecario']),
        salario: faker.datatype.number({ min: 3500, max: 25000 }).toString()
    };
}

async function generarCurso() {
    const profesoresIds = await obtenerProfesores(); // Asume esta función ya está implementada
    const fechaInicio = faker.date.between('-1y', 'today');
    const profesorIdAleatorio = faker.random.arrayElement(profesoresIds);
    const nombreDelCurso = faker.company.bs();
    const codigoCurso = `${nombreDelCurso.charAt(0).toUpperCase()}${faker.datatype.number({ min: 1970, max: 2024 })}`;

    return {
        codigo_curso: codigoCurso,
        nombre_del_curso: nombreDelCurso,
        descripcion: faker.lorem.sentence(),
        fecha_de_inicio: fechaInicio,
        fecha_de_finalizacion: new Date(fechaInicio.getTime() + faker.datatype.number({ min: 30, max: 180 }) * 24 * 60 * 60 * 1000),
        horario: generarHorario(),
        profesor: profesorIdAleatorio,
        grado: faker.datatype.number({ min: 1, max: 12 }).toString()
    };
}

function generarHorario() {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const horarios = [];
    const numDias = faker.datatype.number({ min: 1, max: 3 });

    for (let i = 0; i < numDias; i++) {
        const dia = faker.random.arrayElement(dias);
        const horaInicio = `${faker.datatype.number({ min: 7, max: 10 })}:00`;
        const horaFin = `${faker.datatype.number({ min: 11, max: 14 })}:00`;
        horarios.push(`${dia} de ${horaInicio} a ${horaFin}`);
    }
    return horarios;
}

async function generarEstudiante() {
    const cursosActuales = await seleccionarCursosAleatorios(); // Asume esta función ya está implementada
    const contactosDeEmergencia = new Array(faker.datatype.number({ min: 1, max: 3 }))
        .fill(null)
        .map(() => generarContactoDeEmergencia());

    return {
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        codigo_estudiante: `${faker.datatype.number({ min: 2000, max: 2029 })}0${faker.datatype.number({ min: 1, max: 999 })}`,
        edad: faker.datatype.number({ min: 17, max: 50 }),
        sexo: faker.random.arrayElement(["Masculino", "Femenino", "Otro"]),
        contactos_de_emergencia: contactosDeEmergencia,
        cursos_actuales: cursosActuales
    };
}

function generarContactoDeEmergencia() {
    return {
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        parentesco: faker.random.arrayElement(["madre", "padre", "hermano", "hermana", "abuelo", "abuela", "tío", "tía"]),
        telefono: faker.phone.phoneNumber()
    };
}


async function insertarEnBloques(databaseName, collectionName, generadorDatos, total = 1000) {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    let contador = 1;
    while (contador <= total) {
        const documentos = [];
        for (let i = 0; i < 100 && contador <= total; i++, contador++) {
            const documento = await generadorDatos(); // Ajustar según si necesita parámetros
            documentos.push(documento);
        }

        await collection.insertMany(documentos);
        console.log(`Insertados hasta el ID ${contador-1} en ${collectionName}`);
    }

    await client.close();
}

async function main() {
    try {
        // Ejemplo de inserción de documentos para 'personals'
        await insertarEnBloques('Proyecto1', 'personals', generarPersonal, 1000);
        // Repetir para cada tipo de documento necesario
    } catch (error) {
        console.error('Error durante la ejecución:', error);
    }
}

main().catch(console.error);