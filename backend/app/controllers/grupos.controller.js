const db = require("../models");
const Grupos = db.grupos;

// Crear un nuevo grupo
exports.create = (req, res) => {
    const grupo = {
        g_idmaterias: req.body.g_idmaterias,
        g_doc_noTrabajador: req.body.g_doc_noTrabajador,
        idgrupos: req.body.idgrupos,
        fechin: req.body.fechin,
        fechfin: req.body.fechfin
    };

    Grupos.create(grupo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el grupo."
            });
        });
};

// Obtener todos los grupos
exports.findAll = (req, res) => {
    Grupos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los grupos."
            });
        });
};

// Obtener un grupo por id
exports.findOne = (req, res) => {
    const { g_idmaterias, idgrupos } = req.params;

    Grupos.findOne({
        where: {
            g_idmaterias: g_idmaterias,
            idgrupos: idgrupos
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el grupo con id de materia ${g_idmaterias} y grupo ${idgrupos}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el grupo."
            });
        });
};

// Actualizar un grupo por id
exports.update = (req, res) => {
    const { g_idmaterias, idgrupos } = req.params;

    Grupos.update(req.body, {
        where: {
            g_idmaterias: g_idmaterias,
            idgrupos: idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El grupo fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el grupo con id de materia ${g_idmaterias} y grupo ${idgrupos}. Quizás el grupo no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el grupo."
            });
        });
};

// Eliminar un grupo por id
exports.delete = (req, res) => {
    const { g_idmaterias, idgrupos } = req.params;

    Grupos.destroy({
        where: {
            g_idmaterias: g_idmaterias,
            idgrupos: idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El grupo fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el grupo con id de materia ${g_idmaterias} y grupo ${idgrupos}. Quizás el grupo no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el grupo."
            });
        });
};
