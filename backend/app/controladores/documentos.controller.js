const db = require("../models");
const Documentos = db.Documentos;

// Crear y guardar un nuevo Documento
exports.create = (req, res) => {
    if (!req.body.idDocumentos) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    const documento = {
        idDocumentos: req.body.idDocumentos,
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        doc_idmaterias: req.body.doc_idmaterias,
        doc_idgrupos: req.body.doc_idgrupos
    };

    Documentos.create(documento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Documento."
            });
        });
};

// Obtener todos los Documentos
exports.findAll = (req, res) => {
    Documentos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Documentos."
            });
        });
};

// Obtener un Documento por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Documentos.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el Documento con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Documento con id=" + id
            });
        });
};

// Actualizar un Documento por id
exports.update = (req, res) => {
    const id = req.params.id;

    Documentos.update(req.body, {
        where: { idDocumentos: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Documento fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el Documento con id=${id}. Tal vez el Documento no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Documento con id=" + id
            });
        });
};

// Eliminar un Documento por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Documentos.destroy({
        where: { idDocumentos: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Documento fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Documento con id=${id}. Tal vez el Documento no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Documento con id=" + id
            });
        });
};
