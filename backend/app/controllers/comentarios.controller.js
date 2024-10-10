const db = require("../models");
const Comentarios = db.Comentarios;

// Crear y guardar un nuevo Comentario
exports.create = (req, res) => {
    if (!req.body.idComentarios) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    const comentario = {
        idComentarios: req.body.idComentarios,
        comentario: req.body.comentario,
        fecha: req.body.fecha,
        com_idvideos: req.body.com_idvideos,
        com_boleta: req.body.com_boleta
    };

    Comentarios.create(comentario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Comentario."
            });
        });
};

// Obtener todos los Comentarios
exports.findAll = (req, res) => {
    Comentarios.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Comentarios."
            });
        });
};

// Obtener un Comentario por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comentarios.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el Comentario con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Comentario con id=" + id
            });
        });
};

// Actualizar un Comentario por id
exports.update = (req, res) => {
    const id = req.params.id;

    Comentarios.update(req.body, {
        where: { idComentarios: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Comentario fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el Comentario con id=${id}. Tal vez el Comentario no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Comentario con id=" + id
            });
        });
};

// Eliminar un Comentario por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Comentarios.destroy({
        where: { idComentarios: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Comentario fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Comentario con id=${id}. Tal vez el Comentario no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Comentario con id=" + id
            });
        });
};
