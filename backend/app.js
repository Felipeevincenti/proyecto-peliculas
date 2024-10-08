let express = require('express');
let app = express();
let projectRoutes = require('./routes/routes');


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar Cabeceras y Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// rutas
app.use('/api', projectRoutes);

module.exports = app;