module.exports = (sequelize, Sequelize) => {
    const Entregas = sequelize.define("entregas", {
        e_idtareas: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        e_idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true
        },
        e_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        calificación: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        e_fecha: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['e_boleta']
            },
            {
                fields: ['e_idtareas', 'e_idgrupos']
            }
        ]
    });

    Entregas.associate = (models) => {
        Entregas.belongsTo(models.Tareas, {
            foreignKey: 'e_idtareas',
            targetKey: 'idtareas'
        });
        Entregas.belongsTo(models.Alumnos, {
            foreignKey: 'e_boleta',
            targetKey: 'boleta'
        });
    };

    return Entregas;
};
