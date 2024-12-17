const express = require('express');
const { obtenerJoyas, obtenerJoyasConFiltros } = require('./consultas');
const { registrarRuta } = require('./middlewares');

const app = express();
const PORT = 3000;

// Middleware 
app.use(registrarRuta);

// Ruta con HATEOAS
app.get('/joyas', async (req, res) => {
    try {
        const joyas = await obtenerJoyas(req.query);
        const resultados = joyas.map((joya) => ({
            name: joya.nombre,
            href: `/joyas/${joya.id}`,
        }));
        res.json({ total: joyas.length, results: resultados });
    } catch (error) {
        res.status(500).send('Error al obtener joyas');
    }
});

//  filtros
app.get('/joyas/filtros', async (req, res) => {
    try {
        const joyas = await obtenerJoyasConFiltros(req.query);
        res.json(joyas);
    } catch (error) {
        res.status(500).send('Error al filtrar joyas');
    }
});


app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
