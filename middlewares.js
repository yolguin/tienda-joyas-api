const fs = require('fs');

const registrarRuta = (req, res, next) => {
    const log = `Ruta: ${req.url} - Método: ${req.method} - Fecha: ${new Date().toISOString()}\n`;
    fs.appendFileSync('registro_rutas.log', log);
    next();
};

module.exports = { registrarRuta };
