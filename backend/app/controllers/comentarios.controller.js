const db = require("../models");
const Comentarios = db.comentarios;

// Crear un nuevo comentario
exports.create = (req, res) => {
    const comentario = {
        Comentario: req.body.Comentario,
        c_fecha: req.body.c_fecha,
        doc_al: req.body.doc_al,
        c_idtareas: req.body.c_idtareas,
        c_boleta: req.body.c_boleta
    };

    Comentarios.create(comentario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el comentario."
            });
        });
};

// Obtener todos los comentarios
exports.findAll = (req, res) => {
    Comentarios.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los comentarios."
            });
        });
};

// Obtener un comentario por id
exports.findOne = (req, res) => {
    const { idComentarios, c_idtareas, c_boleta } = req.params;

    Comentarios.findOne({
        where: {
            idComentarios: idComentarios,
            c_idtareas: c_idtareas,
            c_boleta: c_boleta
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el comentario con id ${idComentarios}, tarea ${c_idtareas}, y boleta ${c_boleta}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el comentario."
            });
        });
};

// Actualizar un comentario por id
exports.update = (req, res) => {
    const { idComentarios, c_idtareas, c_boleta } = req.params;

    Comentarios.update(req.body, {
        where: {
            idComentarios: idComentarios,
            c_idtareas: c_idtareas,
            c_boleta: c_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El comentario fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el comentario con id ${idComentarios}, tarea ${c_idtareas}, y boleta ${c_boleta}. Quizás el comentario no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el comentario."
            });
        });
};

// Eliminar un comentario por id
exports.delete = (req, res) => {
    const { idComentarios, c_idtareas, c_boleta } = req.params;

    Comentarios.destroy({
        where: {
            idComentarios: idComentarios,
            c_idtareas: c_idtareas,
            c_boleta: c_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El comentario fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el comentario con id ${idComentarios}, tarea ${c_idtareas}, y boleta ${c_boleta}. Quizás el comentario no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el comentario."
            });
        });
};
