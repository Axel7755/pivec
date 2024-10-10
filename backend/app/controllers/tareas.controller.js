const db = require("../models");
const Tareas = db.Tareas;

// Crear y guardar una nueva Tarea
exports.create = (req, res) => {
    if (!req.body.idTareas) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    const tarea = {
        descripcion: req.body.descripcion,
        fechaEntrega: req.body.fechaEntrega,
        ta_idmaterias: req.body.ta_idmaterias,
        ta_idgrupos: req.body.ta_idgrupos
    };

    Tareas.create(tarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la Tarea."
            });
        });
};

// Obtener todas las Tareas
exports.findAll = (req, res) => {
    Tareas.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las Tareas."
            });
        });
};

// Obtener una Tarea por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tareas.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar la Tarea con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar la Tarea con id=" + id
            });
        });
};

// Actualizar una Tarea por id
exports.update = (req, res) => {
    const id = req.params.id;

    Tareas.update(req.body, {
        where: { idTareas: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Tarea fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar la Tarea con id=${id}. Tal vez la Tarea no fue encontrada o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la Tarea con id=" + id
            });
        });
};

// Eliminar una Tarea por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Tareas.destroy({
        where: { idTareas: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Tarea fue eliminada exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar la Tarea con id=${id}. Tal vez la Tarea no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la Tarea con id=" + id
            });
        });
};
