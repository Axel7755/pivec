const db = require("../models");
const AvisosDocumentos = db.avisosDocumentos;

// Crear un nuevo documento de aviso
exports.create = (req, res) => {
    const avisoDocumento = {
        dirección_AD: req.body.dirección_AD,
        nombre_AD: req.body.nombre_AD,
        avD_idAviso: req.body.avD_idAviso,
        avD_idmaterias: req.body.avD_idmaterias,
        avD_idgrupos: req.body.avD_idgrupos
    };

    AvisosDocumentos.create(avisoDocumento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el documento de aviso."
            });
        });
};

// Obtener todos los documentos de avisos
exports.findAll = (req, res) => {
    AvisosDocumentos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los documentos de avisos."
            });
        });
};

// Obtener un documento de aviso por id
exports.findOne = (req, res) => {
    const { idavisosDocumentos, avD_idAviso, avD_idmaterias, avD_idgrupos } = req.params;

    AvisosDocumentos.findOne({
        where: {
            idavisosDocumentos: idavisosDocumentos,
            avD_idAviso: avD_idAviso,
            avD_idmaterias: avD_idmaterias,
            avD_idgrupos: avD_idgrupos
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el documento de aviso con id ${idavisosDocumentos}, aviso ${avD_idAviso}, materia ${avD_idmaterias}, y grupo ${avD_idgrupos}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el documento de aviso."
            });
        });
};

// Actualizar un documento de aviso por id
exports.update = (req, res) => {
    const { idavisosDocumentos, avD_idAviso, avD_idmaterias, avD_idgrupos } = req.params;

    AvisosDocumentos.update(req.body, {
        where: {
            idavisosDocumentos: idavisosDocumentos,
            avD_idAviso: avD_idAviso,
            avD_idmaterias: avD_idmaterias,
            avD_idgrupos: avD_idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El documento de aviso fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el documento de aviso con id ${idavisosDocumentos}, aviso ${avD_idAviso}, materia ${avD_idmaterias}, y grupo ${avD_idgrupos}. Quizás el documento no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el documento de aviso."
            });
        });
};

// Eliminar un documento de aviso por id
exports.delete = (req, res) => {
    const { idavisosDocumentos, avD_idAviso, avD_idmaterias, avD_idgrupos } = req.params;

    AvisosDocumentos.destroy({
        where: {
            idavisosDocumentos: idavisosDocumentos,
            avD_idAviso: avD_idAviso,
            avD_idmaterias: avD_idmaterias,
            avD_idgrupos: avD_idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El documento de aviso fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el documento de aviso con id ${idavisosDocumentos}, aviso ${avD_idAviso}, materia ${avD_idmaterias}, y grupo ${avD_idgrupos}. Quizás el documento no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el documento de aviso."
            });
        });
};
