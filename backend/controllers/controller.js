let Pelicula = require('../models/model');

let fs = require('fs');
let path = require('path')

exports.guardarPelicula = async (req, res) => {
    try {

        const { name, age, duration, genre, description } = req.body;

        if (!name || !age || !duration || !genre || !description) {
            return res.status(400).send({ message: "Faltan datos requeridos" });
        }

        const peliculaData = {
            name,
            age,
            duration,
            genre,
            description,
            image: null,
            png: null,
            video: null
        };

        const pelicula = await Pelicula.create(peliculaData);

        return res.status(200).send({ pelicula });

    } catch (err) {
        return res.status(500).send({ message: "Error al guardar la película", error: err.message });
    }
};



exports.obtenerPelicula = async (req, res) => {
    try {
        const peliculaId = req.params.id;
        const pelicula = await Pelicula.findById(peliculaId);

        if (!pelicula) {
            return res.status(404).send({ message: 'La película no existe' });
        }

        return res.status(200).send({ pelicula });
    } catch (err) {
        return res.status(500).send({ message: 'Error al devolver los datos', error: err.message });
    }
};




exports.listadoPeliculas = async (req, res) => {
    try {
        const listado = await Pelicula.find({}).sort('');
        return res.status(200).send({ listado });
    } catch (err) {
        return res.status(500).send({ message: 'Error al devolver los datos', error: err.message });
    }
};



exports.actualizarPelicula = async (req, res) => {
    const peliculaId = req.params.id;
    const update = req.body;

    try {
        const peliculaUpdated = await Pelicula.findByIdAndUpdate(peliculaId, update, { new: true });

        if (!peliculaUpdated) {
            return res.status(404).send({ message: 'El proyecto no existe' });
        }

        return res.status(200).send({ peliculaUpdated });
    } catch (err) {
        return res.status(500).send({ message: 'Error al actualizar', error: err.message });
    }
};



exports.borrarPelicula = async (req, res) => {
    const peliculaId = req.params.id;

    try {
        const peliculaRemoved = await Pelicula.findByIdAndRemove(peliculaId);

        if (!peliculaRemoved) {
            return res.status(404).send({ message: 'No se puede eliminar ese proyecto' });
        }

        return res.status(200).send({ pelicula: peliculaRemoved });
    } catch (err) {
        return res.status(500).send({ message: 'No se ha podido borrar el proyecto', error: err.message });
    }
};



exports.subirImagen = async (req, res) => {

    let peliculaId = req.params.id;

    if (req.files) {
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[1];

        let extSplit = fileName.split("\.");
        let fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' || fileExt == 'webp') {
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
}



exports.subirPng = async (req, res) => {
    const peliculaId = req.params.id;

    if (req.files) {
        const filePath = req.files.png.path;
        const fileName = path.basename(filePath);
        const fileExt = path.extname(fileName).slice(1).toLowerCase();

        if (fileExt === 'png') {
            try {
                const peliculaUpdated = await Pelicula.findByIdAndUpdate(peliculaId, { png: fileName }, { new: true });
                if (!peliculaUpdated) {
                    return res.status(404).send({ message: 'La imagen no existe' });
                }
                return res.status(200).send({ pelicula: peliculaUpdated });
            } catch (err) {
                return res.status(500).send({ message: 'La imágen no se ha subido', error: err.message });
            }
        } else {
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error al eliminar el archivo inválido', error: err.message });
                }
                return res.status(400).send({ message: 'La extensión no es válida' });
            });
        }
    }
};




exports.subirVideo = async (req, res) => {

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
}




exports.obtenerImagen = async (req, res) => {
    const file = req.params.image;
    const pathFile = path.resolve(`./uploads/${file}`);

    fs.exists(pathFile, (exists) => {
        if (exists) {
            return res.sendFile(pathFile);
        } else {
            return res.status(404).send({ message: 'No existe la imagen' });
        }
    });
};




exports.obtenerPng = async (req, res) => {
    const file = req.params.png;
    const pathFile = path.resolve(`./uploads/${file}`);

    fs.exists(pathFile, (exists) => {
        if (exists) {
            return res.sendFile(pathFile);
        } else {
            return res.status(404).send({ message: 'No existe la imagen PNG' });
        }
    });
};




exports.obtenerVideo = async (req, res) => {
    const file = req.params.video;
    const pathFile = path.resolve(`./uploads/${file}`);

    fs.exists(pathFile, (exists) => {
        if (exists) {
            return res.sendFile(pathFile);
        } else {
            return res.status(404).send({ message: 'No existe el video' });
        }
    });
};


