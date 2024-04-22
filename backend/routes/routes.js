




let express = require('express');
let ProjectController = require('../controllers/controller');
let router = express.Router();

let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads' })

router.post('/guardar-pelicula', ProjectController.guardarPelicula);
router.get('/pelicula/:id', ProjectController.obtenerPelicula)
router.get('/listado', ProjectController.listadoPeliculas);
router.post('/update/:id', ProjectController.actualizarPelicula);
router.delete('/delete/:id', ProjectController.borrarPelicula);
router.post('/subir-imagen/:id', multipartMiddleware, ProjectController.subirImagen)
router.post('/subir-png/:id', multipartMiddleware, ProjectController.subirPng)
router.post('/subir-video/:id', multipartMiddleware, ProjectController.subirVideo)
router.get('/obtener-imagen/:image', ProjectController.obtenerImagen)
router.get('/obtener-png/:png', ProjectController.obtenerPng)
router.get('/obtener-video/:video', ProjectController.obtenerVideo)

module.exports = router