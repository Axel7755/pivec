const db = require("../models");
const Entregas = db.Entregas;

// Crear y guardar una nueva Entrega
exports.create = (req, res) => {
    if (!req.body.idEntregas) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    const entrega = {
        idEntregas: req.body.idEntregas,
        fechaEntrega: req.body.fechaEntrega,
        en_idtareas: req.body.en_idtareas,
        en_boleta: req.body.en_boleta
    };

    Entregas.create(entrega)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la Entrega."
            });
        });
};

// Obtener todas las Entregas
exports.findAll = (req, res) => {
    Entregas.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las Entregas."
            });
        });
};

// Obtener una Entrega por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Entregas.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar la Entrega con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar la Entrega con id=" + id
            });
        });
};

// Actualizar una Entrega por id
exports.update = (req, res) => {
    const id = req.params.id;

    Entregas.update(req.body, {
        where: { idEntregas: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Entrega fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar la Entrega con id=${id}. Tal vez la Entrega no fue encontrada o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la Entrega con id=" + id
            });
        });
};

// Eliminar una Entrega por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Entregas.destroy({
        where: { idEntregas: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Entrega fue eliminada exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar la Entrega con id=${id}. Tal vez la Entrega no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la Entrega con id=" + id
            });
        });
};
