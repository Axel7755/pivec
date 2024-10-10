const db = require("../models");
const Horarios = db.Horarios;

// Crear y guardar un nuevo Horario
exports.create = (req, res) => {
    if (!req.body.Horarios) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    const horario = {
        Horarios: req.body.Horarios,
        dia: req.body.dia,
        entrada: req.body.entrada,
        salida: req.body.salida,
        ho_idmaterias: req.body.ho_idmaterias,
        ho_idgrupos: req.body.ho_idgrupos
    };

    Horarios.create(horario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Horario."
            });
        });
};

// Obtener todos los Horarios
exports.findAll = (req, res) => {
    Horarios.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Horarios."
            });
        });
};

// Obtener un Horario por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Horarios.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el Horario con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Horario con id=" + id
            });
        });
};

// Actualizar un Horario por id
exports.update = (req, res) => {
    const id = req.params.id;

    Horarios.update(req.body, {
        where: { Horarios: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Horario fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el Horario con id=${id}. Tal vez el Horario no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Horario con id=" + id
            });
        });
};

// Eliminar un Horario por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Horarios.destroy({
        where: { Horarios: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Horario fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Horario con id=${id}. Tal vez el Horario no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Horario con id=" + id
            });
        });
};
