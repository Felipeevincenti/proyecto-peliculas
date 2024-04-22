
let Pelicula = require('../models/model');

let fs = require('fs');
let path = require('path')

let controller = {

    guardarPelicula: function (req, res) {

        let pelicula = new Pelicula();

        // Toma los valores que tiene body
        let params = req.body;

        pelicula.name = params.name;
        pelicula.age = params.age;
        pelicula.duration = params.duration;
        pelicula.genre = params.genre;
        pelicula.description = params.description;
        pelicula.image = null;
        pelicula.png = null;
        pelicula.video = null;

        pelicula.save()
            .then((peliculaStored) => {
                return res.status(200).send({ pelicula: peliculaStored });
            })
            .catch(error => {
                if (!peliculaStored)
                    return res.status(404).send({ message: "no se ha podido guardar el proyecto" });
                if (error)
                    return res.status(500).send({ error: "Error al guardar el proyecto" });
            })

    },

    obtenerPelicula: function (req, res) {

        let peliculaId = req.params.id;

        Pelicula.findById(peliculaId)
            .then((pelicula) => {
                if (!pelicula) {
                    return res.status(404).send({ message: 'El proyecto no existe' });
                }
                return res.status(200).send({ pelicula });
            })
            .catch((err) => {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            })

    },

    listadoPeliculas: function (req, res) {
        Pelicula.find({}).sort('')
            .then((listado) => {
                return res.status(200).send({ listado });
            })
            .catch((err) => {
                return res.status(500).send({ message: 'Error al devolver los datos' });

            });
    },

    actualizarPelicula: function (req, res) {
        let peliculaId = req.params.id;
        let update = req.body;

        Pelicula.findByIdAndUpdate(peliculaId, update, { new: true })
            .then((peliculaUpdated) => {
                if (!peliculaUpdated) {
                    return res.status(404).send({ message: 'El proyecto no existe' });
                }
                return res.status(200).send({ peliculaUpdated });
            })
            .catch((err) => {
                return res.status(500).send({ message: 'Error al actualizar' })
            })
    },

    borrarPelicula: function (req, res) {
        let peliculaId = req.params.id;

        Pelicula.findByIdAndRemove(peliculaId)
            .then((peliculaRemoved) => {
                if (!peliculaRemoved) return res.status(404).send({ message: 'No se puede eliminar ese proyecto' });
                return res.status(200).send({ pelicula: peliculaRemoved })

            })
            .catch((err) => {
                return res.status(500).send({ message: 'No se ha podido borrar el proyecto' });
            })

    },

    subirImagen: function (req, res) {

        let peliculaId = req.params.id;

        if (req.files) {
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];

            let extSplit = fileName.split("\.");
            let fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Pelicula.findByIdAndUpdate(peliculaId, { image: fileName }, { new: true })
                    .then((peliculaUpdated) => {
                        if (!peliculaUpdated) return res.status(404).send({ message: 'La imagen no existe' });
                        return res.status(200).send({ project: peliculaUpdated });
                    })
                    .catch((err) => {
                        return res.status(500).send({ message: 'La imágen no se ha subido' });
                    })
            } else {
                fs.unlink(filePath, err => {
                    return res.status(500).send({ message: 'la extension no es valida' })
                });
            };
        };
    },

    subirPng: function (req, res) {

        let peliculaId = req.params.id;

        if (req.files) {
            let filePath = req.files.png.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];

            let extSplit = fileName.split("\.");
            let fileExt = extSplit[1];

            if (fileExt == 'png') {
                Pelicula.findByIdAndUpdate(peliculaId, { png: fileName }, { new: true })
                    .then((peliculaUpdated) => {
                        if (!peliculaUpdated) return res.status(404).send({ message: 'La imagen no existe' });
                        return res.status(200).send({ project: peliculaUpdated });
                    })
                    .catch((err) => {
                        return res.status(500).send({ message: 'La imágen no se ha subido' });
                    })
            } else {
                fs.unlink(filePath, err => {
                    return res.status(500).send({ message: 'la extension no es valida' })
                });
            };
        };
    },

    subirVideo: function (req, res) {

        let peliculaId = req.params.id;

        if (req.files) {
            let filePath = req.files.video.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];

            let extSplit = fileName.split("\.");
            let fileExt = extSplit[1];

            if (fileExt == 'mp4' || fileExt == 'mkv') {
                Pelicula.findByIdAndUpdate(peliculaId, { video: fileName }, { new: true })
                    .then((peliculaUpdated) => {
                        if (!peliculaUpdated) return res.status(404).send({ message: 'La imagen no existe' });
                        return res.status(200).send({ project: peliculaUpdated });
                    })
                    .catch((err) => {
                        return res.status(500).send({ message: 'La imágen no se ha subido' });
                    })
            } else {
                fs.unlink(filePath, err => {
                    return res.status(500).send({ message: 'la extension no es valida' })
                });
            };
        };
    },

    obtenerImagen: function (req, res) {
        let file = req.params.image;
        let path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.status(200).send({ message: 'No existe la imágen' });
            }
        })
    },

    obtenerPng: function (req, res) {
        let file = req.params.png;
        let path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.status(200).send({ message: 'No existe la imágen png' });
            }
        })
    },

    obtenerVideo: function (req, res) {
        let file = req.params.video;
        let path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.status(200).send({ message: 'No existe el video' });
            }
        })
    }


}

module.exports = controller;
