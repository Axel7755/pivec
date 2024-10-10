const db = require("../models");
const GruposAlumnos = db.GruposAlumnos;

// Crear y guardar un nuevo GrupoAlumno
exports.create = (req, res) => {
    if (!req.body.ga_idmaterias || !req.body.ga_idgrupos || !req.body.ga_boleta) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
        return;
    }

    const grupoAlumno = {
        ga_idmaterias: req.body.ga_idmaterias,
        ga_idgrupos: req.body.ga_idgrupos,
        ga_boleta: req.body.ga_boleta
    };

    GruposAlumnos.create(grupoAlumno)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el GrupoAlumno."
            });
        });
};

// Obtener todos los GruposAlumnos
exports.findAll = (req, res) => {
    GruposAlumnos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los GruposAlumnos."
            });
        });
};

// Obtener un GrupoAlumno por id
exports.findOne = (req, res) => {
    const { ga_idmaterias, ga_idgrupos, ga_boleta } = req.params;

    GruposAlumnos.findOne({
        where: {
            ga_idmaterias,
            ga_idgrupos,
            ga_boleta
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar el GrupoAlumno con idmaterias=${ga_idmaterias}, idgrupos=${ga_idgrupos}, boleta=${ga_boleta}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el GrupoAlumno con idmaterias=" + ga_idmaterias + ", idgrupos=" + ga_idgrupos + ", boleta=" + ga_boleta
            });
        });
};

// Actualizar un GrupoAlumno por id
exports.update = (req, res) => {
    const { ga_idmaterias, ga_idgrupos, ga_boleta } = req.params;

    GruposAlumnos.update(req.body, {
        where: {
            ga_idmaterias,
            ga_idgrupos,
            ga_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El GrupoAlumno fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el GrupoAlumno con idmaterias=${ga_idmaterias}, idgrupos=${ga_idgrupos}, boleta=${ga_boleta}. Tal vez el GrupoAlumno no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el GrupoAlumno con idmaterias=" + ga_idmaterias + ", idgrupos=" + ga_idgrupos + ", boleta=" + ga_boleta
            });
        });
};

// Eliminar un GrupoAlumno por id
exports.delete = (req, res) => {
    const { ga_idmaterias, ga_idgrupos, ga_boleta } = req.params;

    GruposAlumnos.destroy({
        where: {
            ga_idmaterias,
            ga_idgrupos,
            ga_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El GrupoAlumno fue eliminado exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el GrupoAlumno con idmaterias=${ga_idmaterias}, idgrupos=${ga_idgrupos}, boleta=${ga_boleta}. Tal vez el GrupoAlumno no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el GrupoAlumno con idmaterias=" + ga_idmaterias + ", idgrupos=" + ga_idgrupos + ", boleta=" + ga_boleta
            });
        });
};
