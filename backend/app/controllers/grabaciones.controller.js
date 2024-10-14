const db = require("../models");
const Grabaciones = db.grabaciones;

// Create a new video
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
                message: err.message || "Ocurrio un error al crear guardar la grabación"
            });
        });
};

// Retrieve all videos
exports.findAll = (req, res) => {
    Grabaciones.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al recuperar las grabaciones."
            });
        });
};

// Retrieve a single video by id
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
                    message: `No se encontro la grabación con id ${idgrabaciones}, materia ${gr_idmaterias}, y grupo ${gr_idgrupos}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al recuperar grabación."
            });
        });
};

// Update a video by id
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
                    message: "La grabación se actualizo con exito."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la grabación con id ${idgrabaciones}, materia ${gr_idmaterias}, y grupo ${gr_idgrupos}. Tal vez el Video no fue encontrado o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al actualizar grabación"
            });
        });
};

// Delete a video by id
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
                    message: "Grabación eliminada"
                });
            } else {
                res.send({
                    message: `No es posible eliminar grabacion con id ${idgrabaciones}, materia ${gr_idmaterias}, y grupos ${gr_idgrupos}. Tal vez la grabacion no fue encontrada`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "No se pudo eliminar la grabación"
            });
        });
};
