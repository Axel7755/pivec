const db = require("../models");
const Avisos = db.avisos;

// Crear un nuevo aviso
exports.create = (req, res) => {
    const aviso = {
        aviso: req.body.aviso,
        a_fecha: req.body.a_fecha,
        av_idmaterias: req.body.av_idmaterias,
        av_idgrupos: req.body.av_idgrupos
    };

    Avisos.create(aviso)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el aviso."
            });
        });
};

// Obtener todos los avisos
exports.findAll = (req, res) => {
    Avisos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los avisos."
            });
        });
};

// Obtener un aviso por id
exports.findOne = (req, res) => {
    const { idAviso, av_idmaterias, av_idgrupos } = req.params;

    Avisos.findOne({
        where: {
            idAviso: idAviso,
            av_idmaterias: av_idmaterias,
            av_idgrupos: av_idgrupos
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el aviso con id ${idAviso}, materias ${av_idmaterias}, y grupos ${av_idgrupos}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el aviso."
            });
        });
};

// Actualizar un aviso por id
exports.update = (req, res) => {
    const { idAviso, av_idmaterias, av_idgrupos } = req.params;

    Avisos.update(req.body, {
        where: {
            idAviso: idAviso,
            av_idmaterias: av_idmaterias,
            av_idgrupos: av_idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El aviso fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el aviso con id ${idAviso}, materias ${av_idmaterias}, y grupos ${av_idgrupos}. Quizás el aviso no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el aviso."
            });
        });
};

// Eliminar un aviso por id
exports.delete = (req, res) => {
    const { idAviso, av_idmaterias, av_idgrupos } = req.params;

    Avisos.destroy({
        where: {
            idAviso: idAviso,
            av_idmaterias: av_idmaterias,
            av_idgrupos: av_idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El aviso fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el aviso con id ${idAviso}, materias ${av_idmaterias}, y grupos ${av_idgrupos}. Quizás el aviso no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el aviso."
            });
        });
};
