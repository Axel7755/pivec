module.exports = (sequelize, Sequelize) => {
    const Alumnos = sequelize.define("alumnos", {
        boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombres_Al: {
            type: Sequelize.STRING(45),
            allowNull: false
        },
        apellidoP_Al: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        apellidoM_Al: {
            type: Sequelize.STRING(30),
            allowNull: true
        },
        contraseña_Al: {
            type: Sequelize.STRING(40),
            allowNull: true
        },
        correoRec_Al: {
            type: Sequelize.STRING(80),
            allowNull: false
        }
    });

    return Alumnos;
};
