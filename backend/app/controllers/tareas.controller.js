const db = require("../models");
const Tareas = db.tareas;

// Crear una nueva tarea
exports.create = (req, res) => {
    const tarea = {
        titulo_T: req.body.titulo_T,
        descripción_T: req.body.descripción_T,
        ta_idmaterias: req.body.ta_idmaterias,
        ta_idgrupos: req.body.ta_idgrupos
    };

    Tareas.create(tarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la tarea."
            });
        });
};

// Obtener todas las tareas
exports.findAll = (req, res) => {
    Tareas.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las tareas."
            });
        });
};

// Obtener una tarea por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tareas.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la tarea con id ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar la tarea."
            });
        });
};

// Actualizar una tarea por id
exports.update = (req, res) => {
    const id = req.params.id;

    Tareas.update(req.body, {
        where: { idtareas: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La tarea fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la tarea con id ${id}. Quizás la tarea no fue encontrada o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar la tarea."
            });
        });
};

// Eliminar una tarea por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Tareas.destroy({
        where: { idtareas: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La tarea fue eliminada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la tarea con id ${id}. Quizás la tarea no fue encontrada.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar la tarea."
            });
        });
};
