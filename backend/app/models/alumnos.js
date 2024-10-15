module.exports = (sequelize, Sequelize) => {
    const Alumnos = sequelize.define("alumnos", {
        boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
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
            allowNull: true,
            defaultValue: null
        },
        contraseña_Al: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        correoRec_Al: {
            type: Sequelize.STRING(80),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'alumnos',
        freezeTableName: true
    });

    return Alumnos;
};
