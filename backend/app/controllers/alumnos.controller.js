const db = require("../models");
const Alumnos = db.Alumnos;

// Crear y guardar un nuevo Alumno
exports.create = (req, res) => {
    // Validar la solicitud
    if (!req.body.boleta) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    // Crear un Alumno
    const alumno = {
        boleta: req.body.boleta,
        nombres_Al: req.body.nombres_Al,
        apellidoP_Al: req.body.apellidoP_Al,
        apellidoM_Al: req.body.apellidoM_Al,
        correoRec: req.body.correoRec
    };

    // Guardar Alumno en la base de datos
    Alumnos.create(alumno)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Alumno."
            });
        });
};

// Obtener todos los Alumnos
exports.findAll = (req, res) => {
    Alumnos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Alumnos."
            });
        });
};

// Obtener un Alumno por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Alumnos.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el Alumno con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el Alumno con id=" + id
            });
        });
};

// Actualizar un Alumno por id
exports.update = (req, res) => {
    const id = req.params.id;

    Alumnos.update(req.body, {
        where: { boleta: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Alumno fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el Alumno con id=${id}. Tal vez el Alumno no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Alumno con id=" + id
            });
        });
};

// Eliminar un Alumno por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Alumnos.destroy({
        where: { boleta: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Alumno fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Alumno con id=${id}. Tal vez el Alumno no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Alumno con id=" + id
            });
        });
};
