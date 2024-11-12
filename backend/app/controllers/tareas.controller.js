const db = require("../models");
const Tareas = db.Tareas;
const fs = require('fs');
const path = require('path');

// Crear una nueva tarea
exports.create = (req, res) => {
    const tarea = {
        fecha_Entrega: req.body.fecha_Entrega,
        titulo_T: req.body.titulo_T,
        descripción_T: req.body.descripción_T,
        ta_idmaterias: req.body.ta_idmaterias,
        ta_idgrupos: req.body.ta_idgrupos
    };

    Tareas.create(tarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la tarea."
            });
        });
};

// Obtener todas las tareas
exports.findAll = (req, res) => {
    Tareas.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las tareas."
            });
        });
};

// Obtener todas las tareas de un grupo
exports.findAllGrupo = (req, res) => {
    const { ta_idmaterias, ta_idgrupos } = req.params;
    //console.log(ta_idmaterias, ta_idgrupos);
    Tareas.findAll({ where: { ta_idmaterias, ta_idgrupos } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las tareas del grupo."
            });
        });
};

// Obtener una tarea por id
exports.findOne = (req, res) => {
    const { idtareas, ta_idmaterias, ta_idgrupos } = req.params;

    Tareas.findOne({ where: { idtareas, ta_idmaterias, ta_idgrupos } })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la tarea con id ${idtareas}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar la tarea."
            });
        });
};

// Actualizar una tarea por id
exports.update = (req, res) => {
  const { idtareas, ta_idmaterias, ta_idgrupos } = req.params;
  const tareaFilesDir = path.join('uploads', 'tareasF', ta_idmaterias, ta_idgrupos, idtareas);

  Tareas.update(req.body, {
    where: { idtareas, ta_idmaterias, ta_idgrupos }
  })
  .then(num => {
    if (num == 1) {
      // Eliminar la carpeta de archivos después de actualizar la tarea
      /*fs.rm(tareaFilesDir, { recursive: true, force: true }, (err) => {
        if (err) {
          console.error('Error al eliminar archivos y la carpeta:', err);
          return res.status(500).send({
            message: `Tarea actualizada, pero ocurrió un error al eliminar los archivos y la carpeta: ${err.message}`
          });
        }
    */
        res.send({
          message: "La tarea fue actualizada exitosamente."
        });
      //});
    } else {
      res.send({
        message: `No se pudo actualizar la tarea con id ${idtareas}. Quizás la tarea no fue encontrada o el cuerpo de la solicitud está vacío.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Ocurrió un error al actualizar la tarea."
    });
  });
};


// Eliminar una tarea por id y su carpeta correspondiente
exports.delete = (req, res) => {
  const { idtareas, ta_idmaterias, ta_idgrupos } = req.params;

  // Ruta del directorio de archivos para la tarea específica
  const tareaFilesDir = path.join('uploads', 'tareasF', ta_idmaterias, ta_idgrupos, idtareas);
    console.log(tareaFilesDir);
  Tareas.destroy({
    where: { idtareas, ta_idmaterias, ta_idgrupos }
  })
  .then(num => {
    if (num == 1) {
      // Eliminar la carpeta de idtareas y su contenido
      fs.rm(tareaFilesDir, { recursive: true, force: true }, (err) => {
        if (err) {
          console.error('Error al eliminar archivos y la carpeta:', err);
          return res.status(500).send({
            message: `Tarea eliminada, pero ocurrió un error al eliminar los archivos y la carpeta: ${err.message}`
          });
        }

        res.send({ message: "La tarea y su carpeta fueron eliminadas exitosamente." });
      });
    } else {
      res.send({
        message: `No se pudo eliminar la tarea con id ${idtareas}. Quizás la tarea no fue encontrada.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Ocurrió un error al eliminar la tarea."
    });
  });
};

