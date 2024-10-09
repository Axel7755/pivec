// Eliminar una Materia por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Materias.destroy({
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
