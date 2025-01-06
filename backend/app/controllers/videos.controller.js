const db = require("../models");
const Videos = db.Videos;

// Crear un nuevo video
exports.create = (req, res) => {
    const video = {
        titulo_V: req.body.titulo_V,
        dirección_V: req.body.dirección_V,
        v_boleta: req.body.v_boleta,
        v_idmaterias: req.body.v_idmaterias
    };

    Videos.create(video)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el video."
            });
        });
};

// Obtener todos los videos
exports.findAll = (req, res) => {
    Videos.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los videos."
            });
        });
};


exports.findAllVidMateria = (req, res) => {
    const { v_idmaterias} = req.params;
  
    Videos.findAll({
      where: {
        v_idmaterias,
      }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Ocurrió un error al recuperar los videos de la materia."
        });
      });
  };
// Obtener un video por id
exports.findOne = (req, res) => {
    const { idvideos, v_boleta, v_idmaterias } = req.params;

    Videos.findOne({
        where: {
            idvideos: idvideos,
            v_boleta: v_boleta,
            v_idmaterias: v_idmaterias
        }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el video con id ${idvideos}, boleta ${v_boleta} y materia ${v_idmaterias}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar el video."
            });
        });
};

// Actualizar un video por id
exports.update = (req, res) => {
    const { idvideos, v_boleta, v_idmaterias } = req.params;

    Videos.update(req.body, {
        where: {
            idvideos: idvideos,
            v_boleta: v_boleta,
            v_idmaterias: v_idmaterias
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El video fue actualizado exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el video con id ${idvideos}, boleta ${v_boleta} y materia ${v_idmaterias}. Quizás el video no fue encontrado o el cuerpo de la solicitud está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al actualizar el video."
            });
        });
};

// Eliminar un video por id
exports.delete = (req, res) => {
    const { idvideos, v_boleta, v_idmaterias } = req.params;

    Videos.destroy({
        where: {
            idvideos: idvideos,
            v_boleta: v_boleta,
            v_idmaterias: v_idmaterias
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El video fue eliminado exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede eliminar el Video con id=${idvideos}. Tal vez el Video no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Video con id=" + idvideos
            });
        });
};
