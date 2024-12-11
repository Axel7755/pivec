const db = require("../models");
const Entregas = db.Entregas;

// Crear una nueva entrega
exports.create = (req, res) => {
    const entrega = {
        e_idtareas: req.body.e_idtareas,
        e_boleta: req.body.e_boleta,
        calificación: null,
        e_fecha: new Date()
    };

    Entregas.create(entrega)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la entrega."
            });
        });
};

// Obtener todas las entregas
exports.findAll = (req, res) => {
    Entregas.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las entregas."
            });
        });
};

// Obtener todas las entregas para una tarea
exports.findAllporTarea = (req, res) => {
    const { e_idtareas } = req.params;
    Entregas.findAll({
        where: {
            e_idtareas: e_idtareas,
        }
    })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontraron entregas para la tarea ${e_idtareas}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las entregas."
            });
        });
};

// Obtener una entrega por id
exports.findOne = (req, res) => {
    const { e_idtareas, e_boleta } = req.params;

    Entregas.findOne({
        where: {
            e_idtareas: e_idtareas,
            e_boleta: e_boleta
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la entrega con id de tarea ${e_idtareas} y boleta ${e_boleta}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar la entrega."
            });
        });
};

// Actualizar una entrega por id
exports.update = (req, res) => {
    const { e_idtareas, e_boleta } = req.params;

    Entregas.update(req.body, {
        where: {
            e_idtareas: e_idtareas,
            e_boleta: e_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La entrega fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la entrega con id de tarea ${e_idtareas} y boleta ${e_boleta}. Quizás la entrega no fue encontrada o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar la entrega."
            });
        });
};

// Eliminar una entrega por id
exports.delete = (req, res) => {
    const { e_idtareas, e_boleta } = req.params;

    Entregas.destroy({
        where: {
            e_idtareas: e_idtareas,
            e_boleta: e_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La entrega fue eliminada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la entrega con id de tarea ${e_idtareas} y boleta ${e_boleta}. Quizás la entrega no fue encontrada.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar la entrega."
            });
        });
};
