const db = require("../models");
const Grabaciones = db.Grabaciones;

// Crear una nueva grabación
exports.create = (req, res) => {
    const grabacion = {
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
                message: err.message || "Ocurrió un error al crear la grabación."
            });
        });
};

// Obtener todas las grabaciones
exports.findAll = (req, res) => {
    Grabaciones.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las grabaciones."
            });
        });
};

// Obtener todas las grabaciones
exports.findAllGrupo = (req, res) => {
    const { gr_idmaterias, gr_idgrupos} = req.params;
    Grabaciones.findAll({
        where: {
            gr_idmaterias,
            gr_idgrupos
        }
      })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las grabaciones."
            });
        });
};

// Obtener una grabación por id
exports.findOne = (req, res) => {
    const { idgrabaciones, gr_idmaterias, gr_idgrupos } = req.params;

    Grabaciones.findOne({
        where: {
            idgrabaciones: idgrabaciones,
            gr_idmaterias: gr_idmaterias,
            gr_idgrupos: gr_idgrupos
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la grabación con id ${idgrabaciones}, materia ${gr_idmaterias}, y grupo ${gr_idgrupos}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar la grabación."
            });
        });
};

// Actualizar una grabación por id
exports.update = (req, res) => {
    const { idgrabaciones, gr_idmaterias, gr_idgrupos } = req.params;

    Grabaciones.update(req.body, {
        where: {
            idgrabaciones: idgrabaciones,
            gr_idmaterias: gr_idmaterias,
            gr_idgrupos: gr_idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La grabación fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la grabación con id ${idgrabaciones}, materia ${gr_idmaterias}, y grupo ${gr_idgrupos}. Quizás la grabación no fue encontrada o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar la grabación."
            });
        });
};

// Eliminar una grabación por id
exports.delete = (req, res) => {
    const { idgrabaciones, gr_idmaterias, gr_idgrupos } = req.params;

    Grabaciones.destroy({
        where: {
            idgrabaciones: idgrabaciones,
            gr_idmaterias: gr_idmaterias,
            gr_idgrupos: gr_idgrupos
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La grabación fue eliminada exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la grabación con id ${idgrabaciones}, materia ${gr_idmaterias}, y grupo ${gr_idgrupos}. Quizás la grabación no fue encontrada.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al eliminar la grabación."
            });
        });
};
