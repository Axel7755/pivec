const db = require("../models");
const GruposAlumnos = db.GruposAlumnos;

// Crear una nueva relación grupo-alumno
exports.create = (req, res) => {
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
                message: err.message || "Ocurrió un error al crear la relación grupo-alumno."
            });
        });
};

// Obtener todas las relaciones grupo-alumno
exports.findAll = (req, res) => {
    GruposAlumnos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las relaciones grupo-alumno."
            });
        });
};

// Obtener una relación grupo-alumno por id
exports.findOne = (req, res) => {
    const { ga_idmaterias, ga_idgrupos, ga_boleta } = req.params;

    GruposAlumnos.findOne({
        where: {
            ga_idmaterias: ga_idmaterias,
            ga_idgrupos: ga_idgrupos,
            ga_boleta: ga_boleta
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la relación grupo-alumno con id de materia ${ga_idmaterias}, grupo ${ga_idgrupos} y boleta ${ga_boleta}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar la relación grupo-alumno."
            });
        });
};

// Obtener una relación grupo-alumno por id
exports.findGruposAlumno = (req, res) => {
    const { ga_boleta }  = req.params;
    //console.log(ga_boleta)

    GruposAlumnos.findAll({
        where: {
            ga_boleta: ga_boleta
        }
    })
        .then(data => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la relación grupo-alumno con boleta ${ga_boleta}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar la relación grupo-alumno."
            });
        });
};

// Actualizar una relación grupo-alumno por id
exports.update = (req, res) => {
    const { ga_idmaterias, ga_idgrupos, ga_boleta } = req.params;

    GruposAlumnos.update(req.body, {
        where: {
            ga_idmaterias: ga_idmaterias,
            ga_idgrupos: ga_idgrupos,
            ga_boleta: ga_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La relación grupo-alumno fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la relación grupo-alumno con id de materia ${ga_idmaterias}, grupo ${ga_idgrupos} y boleta ${ga_boleta}. Quizás la relación no fue encontrada o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar la relación grupo-alumno."
            });
        });
};

// Eliminar una relación grupo-alumno por id
exports.delete = (req, res) => {
    const { ga_idmaterias, ga_idgrupos, ga_boleta } = req.params;

    GruposAlumnos.destroy({
        where: {
            ga_idmaterias: ga_idmaterias,
            ga_idgrupos: ga_idgrupos,
            ga_boleta: ga_boleta
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La relación grupo-alumno fue eliminada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la relación grupo-alumno con id de materia ${ga_idmaterias}, grupo ${ga_idgrupos} y boleta ${ga_boleta}. Quizás la relación no fue encontrada.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar la relación grupo-alumno."
            });
        });
};
