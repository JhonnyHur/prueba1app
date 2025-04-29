const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',  //puerto establecido para sql
    database: 'VehiculosDBAuto_Write'
});


/**
 * Crea un nuevo vehículo
 */
async function createVehicle(
    marca,
    anio,
    modelo,
    kilometraje,
    tipoCarroceria,
    numCilindros,
    transmision,
    trenTraction,
    colorInterior,
    colorExterior,
    numPasajeros,
    numPuertas,
    tipoCombustible,
    precio,
    estado,
    idUsuario
) {
    const query = `
        INSERT INTO vehiculo (
            marca, anio, modelo, kilometraje, tipo_carroceria, num_cilindros,
            transmision, tren_traction, color_interior, color_exterior,
            num_pasajeros, num_puertas, tipo_combustible, precio, estado, id_usuario
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await connection.query(query, [
        marca, anio, modelo, kilometraje, tipoCarroceria, numCilindros,
        transmision, trenTraction, colorInterior, colorExterior,
        numPasajeros, numPuertas, tipoCombustible, precio, estado, idUsuario
    ]);
    return result;
}


/**
 * Actualiza un vehículo existente por su ID
 */
async function updateVehicle(
    idVehiculo,
    marca,
    anio,
    modelo,
    kilometraje,
    tipoCarroceria,
    numCilindros,
    transmision,
    trenTraction,
    colorInterior,
    colorExterior,
    numPasajeros,
    numPuertas,
    tipoCombustible,
    precio,
    estado,
    idUsuario
) {
    const query = `
        UPDATE vehiculo
        SET
            marca = ?, anio = ?, modelo = ?, kilometraje = ?,
            tipo_carroceria = ?, num_cilindros = ?, transmision = ?,
            tren_traction = ?, color_interior = ?, color_exterior = ?,
            num_pasajeros = ?, num_puertas = ?, tipo_combustible = ?,
            precio = ?, estado = ?, id_usuario = ?
        WHERE id_vehiculo = ?
    `;
    const [result] = await connection.query(query, [
        marca, anio, modelo, kilometraje, tipoCarroceria, numCilindros,
        transmision, trenTraction, colorInterior, colorExterior,
        numPasajeros, numPuertas, tipoCombustible, precio, estado, idUsuario,
        idVehiculo
    ]);
    return result;
}

async function updateVehicleState(id, estado) {
    const query = `
        UPDATE vehiculo
        SET estado = ?
        WHERE id_vehiculo = ?;
    `;
    const [result] = await connection.execute(query, [estado, id]);
    return result;  // Retorna el resultado de la consulta
}


/**
 * Borra un vehículo por su ID
 */
async function deleteVehicle(id) {
    const [result] = await connection.query('DELETE FROM vehiculo WHERE id_vehiculo = ?', [id]);
    return result;
}

/**
 * Obtiene un vehículo por su ID desde la BD de escritura
 */
async function getVehicleById(id) {
    const result = await connection.query('SELECT * FROM vehiculo WHERE id_vehiculo = ?', [id]);
    // connection.query devuelve un array [rows, fields]
    // Devolvemos solo las filas (rows), que es un array de resultados
    return result[0];
}
// Exporta las funciones para su uso en otros módulos
module.exports = {
    getVehicleById, // Añadido para que el controlador pueda verificar existencia
    updateVehicleState,
    createVehicle,
    updateVehicle,
    deleteVehicle
};