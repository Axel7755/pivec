module.exports = (sequelize, Sequelize) => {
    const Docentes = sequelize.define("docentes", {
        noTrabajador: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombres_Do: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        apellidoP_Do: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        apellidoM_Do: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        correoRec: {
            type: Sequelize.STRING(80),
            allowNull: false
        }
    });

    return Docentes;
};
