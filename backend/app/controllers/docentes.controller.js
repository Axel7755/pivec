const db = require("../models");
const bcrypt = require('bcrypt');
const Docentes = db.Docentes;

// Crear y guardar un nuevo Alumno
exports.create = async (req, res) => {
    // Validar la solicitud
    if (!req.body.noTrabajador) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.contraseña_Do, saltRounds);
    console.log(hashedPassword)
    // Crear un Alumno
    const docente = {
        noTrabajador: req.body.noTrabajador,
        nombres_Do: req.body.nombres_Do,
        apellidoP_Do: req.body.apellidoP_Do,
        apellidoM_Do: req.body.apellidoM_Do,
        contraseña_Do: hashedPassword,
        correoRec_Do: req.body.correoRec_Do
    };

    // Guardar Alumno en la base de datos
    Docentes.create(docente)
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
    Docentes.findAll()
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

    Docentes.findByPk(id)
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

    Docentes.update(req.body, {
        where: { noTrabajador: id }
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

    Docentes.destroy({
        where: { noTrabajador: id }
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
