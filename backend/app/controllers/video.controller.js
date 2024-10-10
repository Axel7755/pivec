const db = require("../models");
const Videos = db.Videos;

// Crear y guardar un nuevo Video
exports.create = (req, res) => {
    if (!req.body.idvideos) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    const video = {
        titulo_V: req.body.titulo_V,
        dirección_V: req.body.dirección_V,
        v_boleta: req.body.v_boleta,
        v_idmaterias: req.body.v_idmaterias
    };

    Videos.create(video)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Video."
            });
        });
};

// Obtener todos los Videos
exports.findAll = (req, res) => {
    Videos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Videos."
            });
        });
};

// Obtener un Video por id
exports.findOne = (req, res) => {
    const { v_idmaterias, v_boleta, idvideos } = req.params;

    Videos.findOne({
        where: {
            v_idmaterias,
            v_boleta,
            idvideos
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el Video con id=${idvideos}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Video con id=" + idvideos
            });
        });
};

// Actualizar un Video por id
exports.update = (req, res) => {
    const { v_idmaterias, v_boleta, idvideos } = req.params;

    Videos.update(req.body, {
        where: {
            v_idmaterias,
            v_boleta,
            idvideos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Video fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el Video con id=${idvideos}. Tal vez el Video no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Video con id=" + idvideos
            });
        });
};

// Eliminar un Video por id
exports.delete = (req, res) => {
    const { v_idmaterias, v_boleta, idvideos } = req.params;

    Videos.destroy({
        where: {
            v_idmaterias,
            v_boleta,
            idvideos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Video fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Video con id=${idvideos}. Tal vez el Video no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Video con id=" + idvideos
            });
        });
};
