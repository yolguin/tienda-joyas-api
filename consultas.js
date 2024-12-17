const pool = require('./db');
const format = require('pg-format');

//  limitación, paginación y ordenamiento
const obtenerJoyas = async ({ limits = 10, page = 1, order_by = 'id_ASC' }) => {
    const [campo, direccion] = order_by.split('_');
    const offset = (page - 1) * limits;

    const consulta = format(
        'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
        campo,
        direccion,
        limits,
        offset
    );

    const { rows } = await pool.query(consulta);
    return rows;
};

//  con filtros
const obtenerJoyasConFiltros = async ({ precio_min, precio_max, categoria, metal }) => {
    let filtros = [];
    let values = [];
    const agregarFiltro = (campo, operador, valor) => {
        filtros.push(`${campo} ${operador} $${filtros.length + 1}`);
        values.push(valor);
    };

    if (precio_min) agregarFiltro('precio', '>=', precio_min);
    if (precio_max) agregarFiltro('precio', '<=', precio_max);
    if (categoria) agregarFiltro('categoria', '=', categoria);
    if (metal) agregarFiltro('metal', '=', metal);

    let consulta = 'SELECT * FROM inventario';
    if (filtros.length > 0) {
        consulta += ` WHERE ${filtros.join(' AND ')}`;
    }

    const { rows } = await pool.query(consulta, values);
    return rows;
};

module.exports = { obtenerJoyas, obtenerJoyasConFiltros };
