const db = require("../models");
const Horarios = db.horarios;

// Crear un nuevo horario
exports.create = (req, res) => {
    const horario = {
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
                message: err.message || "Ocurrió un error al crear el horario."
            });
        });
};

// Obtener todos los horarios
exports.findAll = (req, res) => {
    Horarios.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los horarios."
            });
        });
};

// Obtener un horario por id
exports.findOne = (req, res) => {
    const { idHorarios, ho_idmaterias, ho_idgrupos } = req.params;

    Horarios.findOne({
        where: {
            idHorarios: idHorarios,
            ho_idmaterias: ho_idmaterias,
            ho_idgrupos: ho_idgrupos
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el horario con id ${idHorarios}, materia ${ho_idmaterias}, y grupo ${ho_idgrupos}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el horario."
            });
        });
};

// Actualizar un horario por id
exports.update = (req, res) => {
    const { idHorarios, ho_idmaterias, ho_idgrupos } = req.params;

    Horarios.update(req.body, {
        where: {
            idHorarios: idHorarios,
            ho_idmaterias: ho_idmaterias,
            ho_idgrupos: ho_idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El horario fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el horario con id ${idHorarios}, materia ${ho_idmaterias}, y grupo ${ho_idgrupos}. Quizás el horario no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el horario."
            });
        });
};

// Eliminar un horario por id
exports.delete = (req, res) => {
    const { idHorarios, ho_idmaterias, ho_idgrupos } = req.params;

    Horarios.destroy({
        where: {
            idHorarios: idHorarios,
            ho_idmaterias: ho_idmaterias,
            ho_idgrupos: ho_idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El horario fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el horario con id ${idHorarios}, materia ${ho_idmaterias}, y grupo ${ho_idgrupos}. Quizás el horario no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el horario."
            });
        });
};
