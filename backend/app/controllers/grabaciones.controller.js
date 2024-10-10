const db = require("../models");
const Grabaciones = db.Grabaciones;

// Crear y guardar una nueva Grabación
exports.create = (req, res) => {
    if (!req.body.idgrabaciones) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    const grabacion = {
        idgrabaciones: req.body.idgrabaciones,
        dirección_G: req.body.dirección_G,
        titulo_G: req.body.titulo_G,
        g_fecha: req.body.g_fecha,
        gr_idmaterias: req.body.gr_idmaterias,
        gr_idgrupos: req.body.gr_idgrupos
    };

    Grabaciones.create(grabacion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la Grabación."
            });
        });
};

// Obtener todas las Grabaciones
exports.findAll = (req, res) => {
    Grabaciones.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las Grabaciones."
            });
        });
};

// Obtener una Grabación por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Grabaciones.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar la Grabación con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar la Grabación con id=" + id
            });
        });
};

// Actualizar una Grabación por id
exports.update = (req, res) => {
    const id = req.params.id;

    Grabaciones.update(req.body, {
        where: { idgrabaciones: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Grabación fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar la Grabación con id=${id}. Tal vez la Grabación no fue encontrada o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la Grabación con id=" + id
            });
        });
};

// Eliminar una Grabación por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Grabaciones.destroy({
        where: { idgrabaciones: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Grabación fue eliminada exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar la Grabación con id=${id}. Tal vez la Grabación no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la Grabación con id=" + id
            });
        });
};
