const db = require("../models");
const Avisos = db.Avisos;

// Crear y guardar un nuevo Aviso
exports.create = (req, res) => {
    if (!req.body.idAviso) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

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
                message: err.message || "Ocurrió un error al crear el Aviso."
            });
        });
};

// Obtener todos los Avisos
exports.findAll = (req, res) => {
    Avisos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Avisos."
            });
        });
};

// Obtener un Aviso por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Avisos.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el Aviso con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Aviso con id=" + id
            });
        });
};

// Actualizar un Aviso por id
exports.update = (req, res) => {
    const id = req.params.id;

    Avisos.update(req.body, {
        where: { idAviso: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Aviso fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el Aviso con id=${id}. Tal vez el Aviso no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Aviso con id=" + id
            });
        });
};

// Eliminar un Aviso por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Avisos.destroy({
        where: { idAviso: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Aviso fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Aviso con id=${id}. Tal vez el Aviso no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Aviso con id=" + id
            });
        });
};
