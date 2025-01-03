const db = require("../models");
const Materia = db.Materias;

// Crear y guardar una nueva Materia
exports.create = (req, res) => {
    if (!req.body.material) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const materia = {
        material: req.body.material
    };

    // Busca si ya existe una materia con el mismo nombre
    Materia.findOne({ where: { material: materia.material } })
    .then(data => {
        if (data) {
            // Si la materia ya existe, devuelve un mensaje claro y los datos de la materia existente
            return res.status(200).send({
                message: "La materia con ese nombre ya existe.",
                data: data  // Devolvemos los datos de la materia existente
            });
        } else {
            // Si no existe, crea una nueva materia
            Materia.create(materia)
                .then(data => {
                    res.status(201).send({
                        message: "Materia creada exitosamente.",
                        idmaterias: data.idmaterias  // Asegúrate de devolver el ID correctamente
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Ocurrió un error al crear la materia."
                    });
                });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al buscar la materia."
        });
    });
};

// Encontrar una materia por nombre
exports.findByName = async (req, res) => {
    const material = req.params.material;

    Materia.findOne({
        where: {
            material: {
                [db.Sequelize.Op.like]: material
            }
        },
        collate: 'utf8_general_ci'  // Ignorar acentos y mayúsculas/minúsculas
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la materia con nombre ${material}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al buscar la materia."
            });
        });
};

// Obtener todas las Materias
exports.findAll = (req, res) => {
    Materia.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las Materias."
            });
        });
};

// Obtener una Materia por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Materia.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se puede encontrar la Materia con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar la Materia con id=" + id
            });
        });
};

// Actualizar una Materia por id
exports.update = (req, res) => {
    const id = req.params.id;

    Materia.update(req.body, {
        where: { idmaterias: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Materia fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar la Materia con id=${id}. Tal vez la Materia no fue encontrada o req.body está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la Materia con id=" + id
            });
        });
};

// Eliminar una Materia por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Materia.destroy({
        where: { idmaterias: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Materia fue eliminada exitosamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar la Materia con id=${id}. Tal vez la Materia no fue encontrada!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la Materia con id=" + id
            });
        });
};
