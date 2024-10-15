const db = require("../models");
const DocumentosTareas = db.documentosTareas;

// Crear un nuevo documento de tarea
exports.create = (req, res) => {
    const documentoTarea = {
        dirección_DT: req.body.dirección_DT,
        nombre_DT: req.body.nombre_DT,
        dt_idtareas: req.body.dt_idtareas
    };

    DocumentosTareas.create(documentoTarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el documento de tarea."
            });
        });
};

// Obtener todos los documentos de tareas
exports.findAll = (req, res) => {
    DocumentosTareas.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los documentos de tareas."
            });
        });
};

// Obtener un documento de tarea por id
exports.findOne = (req, res) => {
    const { iddocumentosTareas, dt_idtareas } = req.params;

    DocumentosTareas.findOne({
        where: {
            iddocumentosTareas: iddocumentosTareas,
            dt_idtareas: dt_idtareas
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el documento de tarea con id ${iddocumentosTareas} y tarea ${dt_idtareas}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el documento de tarea."
            });
        });
};

// Actualizar un documento de tarea por id
exports.update = (req, res) => {
    const { iddocumentosTareas, dt_idtareas } = req.params;

    DocumentosTareas.update(req.body, {
        where: {
            iddocumentosTareas: iddocumentosTareas,
            dt_idtareas: dt_idtareas
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El documento de tarea fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el documento de tarea con id ${iddocumentosTareas} y tarea ${dt_idtareas}. Quizás el documento no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el documento de tarea."
            });
        });
};

// Eliminar un documento de tarea por id
exports.delete = (req, res) => {
    const { iddocumentosTareas, dt_idtareas } = req.params;

    DocumentosTareas.destroy({
        where: {
            iddocumentosTareas: iddocumentosTareas,
            dt_idtareas: dt_idtareas
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El documento de tarea fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el documento de tarea con id ${iddocumentosTareas} y tarea ${dt_idtareas}. Quizás el documento no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el documento de tarea."
            });
        });
};
