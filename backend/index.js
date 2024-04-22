
let mongoose = require('mongoose');
let app = require('./app');
let port = 3600;




mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017/cartelera')
    .then(() => {
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:3600");
        });
    })
    .catch(err => console.log(err));