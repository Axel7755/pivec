module.exports = (sequelize, Sequelize) => {
    const Materias = sequelize.define("materias", {
        idmaterias: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        material: {
            type: Sequelize.STRING(70),
            allowNull: true
        }
    });

    return Materias;
};
