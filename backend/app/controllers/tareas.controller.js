const db = require("../models");
const Tareas = db.Tareas;

// Crear una nueva tarea
exports.create = (req, res) => {
    const tarea = {
        fecha_Entrega: req.body.fecha_Entrega,
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

// Obtener todas las tareas de un grupo
exports.findAllGrupo = (req, res) => {
    const { ta_idmaterias, ta_idgrupos } = req.params;
    //console.log(ta_idmaterias, ta_idgrupos);
    Tareas.findAll({ where: { ta_idmaterias, ta_idgrupos } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las tareas del grupo."
            });
        });
};

// Obtener una tarea por id
exports.findOne = (req, res) => {
    const { idtareas, ta_idmaterias, ta_idgrupos } = req.params;

    Tareas.findOne({ where: { idtareas, ta_idmaterias, ta_idgrupos } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la tarea con id ${idtareas}.`
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
    const { idtareas, ta_idmaterias, ta_idgrupos } = req.params;

    Tareas.update(req.body, {
        where: { idtareas, ta_idmaterias, ta_idgrupos }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La tarea fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la tarea con id ${idtareas}. Quizás la tarea no fue encontrada o el cuerpo de la solicitud está vacío.`
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
    const { idtareas, ta_idmaterias, ta_idgrupos } = req.params;

    Tareas.destroy({
        where: { idtareas, ta_idmaterias, ta_idgrupos }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La tarea fue eliminada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la tarea con id ${idtareas}. Quizás la tarea no fue encontrada.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar la tarea."
            });
        });
};
