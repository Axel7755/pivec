module.exports = (sequelize, Sequelize) => {
    const Tareas = sequelize.define("tareas", {
        idtareas: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        titulo_T: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        descripción_T: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        ta_idmaterias: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ta_idgrupos: {
            type: Sequelize.STRING(6),
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['ta_idmaterias', 'ta_idgrupos']
            }
        ]
    });

    Tareas.associate = (models) => {
        Tareas.belongsTo(models.Grupo, {
            foreignKey: 'ta_idmaterias',
            targetKey: 'g_idmaterias'
        });
        Tareas.belongsTo(models.Grupo, {
            foreignKey: 'ta_idgrupos',
            targetKey: 'idgrupos'
        });
    };

    return Tareas;
};
