const db = require("../models");
const Documentos = db.documentos;

// Crear un nuevo documento
exports.create = (req, res) => {
    const documento = {
        dircción_D: req.body.dircción_D,
        nombre_D: req.body.nombre_D,
        d_idtareas: req.body.d_idtareas,
        d_boleta: req.body.d_boleta
    };

    Documentos.create(documento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el documento."
            });
        });
};

// Obtener todos los documentos
exports.findAll = (req, res) => {
    Documentos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los documentos."
            });
        });
};

// Obtener un documento por id
exports.findOne = (req, res) => {
    const { iddocumentos, d_idtareas, d_boleta } = req.params;

    Documentos.findOne({
        where: {
            iddocumentos: iddocumentos,
            d_idtareas: d_idtareas,
            d_boleta: d_boleta
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el documento con id ${iddocumentos}, tarea ${d_idtareas}, y boleta ${d_boleta}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el documento."
            });
        });
};

// Actualizar un documento por id
exports.update = (req, res) => {
    const { iddocumentos, d_idtareas, d_boleta } = req.params;

    Documentos.update(req.body, {
        where: {
            iddocumentos: iddocumentos,
            d_idtareas: d_idtareas,
            d_boleta: d_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El documento fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el documento con id ${iddocumentos}, tarea ${d_idtareas}, y boleta ${d_boleta}. Quizás el documento no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el documento."
            });
        });
};

// Eliminar un documento por id
exports.delete = (req, res) => {
    const { iddocumentos, d_idtareas, d_boleta } = req.params;

    Documentos.destroy({
        where: {
            iddocumentos: iddocumentos,
            d_idtareas: d_idtareas,
            d_boleta: d_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El documento fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el documento con id ${iddocumentos}, tarea ${d_idtareas}, y boleta ${d_boleta}. Quizás el documento no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el documento."
            });
        });
};
