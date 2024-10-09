const db = require("../models");
const Grupos = db.Grupos;

// Crear y guardar un nuevo Grupo
exports.create = (req, res) => {
    if (!req.body.g_idmaterias || !req.body.idgrupos) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

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
                message: err.message || "Ocurrió un error al crear el Grupo."
            });
        });
};

// Obtener todos los Grupos
exports.findAll = (req, res) => {
    Grupos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Grupos."
            });
        });
};

// Obtener un Grupo por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Grupos.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el Grupo con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Grupo con id=" + id
            });
        });
};

// Actualizar un Grupo por id
exports.update = (req, res) => {
    const id = req.params.id;

    Grupos.update(req.body, {
        where: { g_idmaterias: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Grupo fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el Grupo con id=${id}. Tal vez el Grupo no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Grupo con id=" + id
            });
        });
};

// Eliminar un Grupo por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Grupos.destroy({
        where: { g_idmaterias: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Grupo fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Grupo con id=${id}. Tal vez el Grupo no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Grupo con id=" + id
            });
        });
};
