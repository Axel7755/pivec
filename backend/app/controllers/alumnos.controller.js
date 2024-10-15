const db = require("../models");
const Alumnos = db.alumnos;

// Crear un nuevo alumno
exports.create = (req, res) => {
    const alumno = {
        boleta: req.body.boleta,
        nombres_Al: req.body.nombres_Al,
        apellidoP_Al: req.body.apellidoP_Al,
        apellidoM_Al: req.body.apellidoM_Al,
        contraseña_Al: req.body.contraseña_Al,
        correoRec_Al: req.body.correoRec_Al
    };

    Alumnos.create(alumno)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el alumno."
            });
        });
};

// Obtener todos los alumnos
exports.findAll = (req, res) => {
    Alumnos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los alumnos."
            });
        });
};

// Obtener un alumno por boleta
exports.findOne = (req, res) => {
    const boleta = req.params.boleta;

    Alumnos.findByPk(boleta)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el alumno con la boleta ${boleta}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el alumno."
            });
        });
};

// Actualizar un alumno por boleta
exports.update = (req, res) => {
    const boleta = req.params.boleta;

    Alumnos.update(req.body, {
        where: { boleta: boleta }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El alumno fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el alumno con la boleta ${boleta}. Quizás el alumno no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el alumno."
            });
        });
};

// Eliminar un alumno por boleta
exports.delete = (req, res) => {
    const boleta = req.params.boleta;

    Alumnos.destroy({
        where: { boleta: boleta }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El alumno fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el alumno con la boleta ${boleta}. Quizás el alumno no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar el alumno."
            });
        });
};
