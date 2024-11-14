module.exports = (sequelize, Sequelize) => {
    const Tareas = sequelize.define("tareas", {
        idtareas: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },fecha_Entrega: {
            type: Sequelize.DATE,
            allowNull: false
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
            type: Sequelize.STRING(13),
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_tareas_grupos1_idx',
                fields: ['ta_idmaterias', 'ta_idgrupos']
            },
            {
                name: 'tareas_ta_idmaterias_ta_idgrupos',
                fields: ['ta_idmaterias', 'ta_idgrupos']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_tareas_grupos1',
                field: ['ta_idmaterias', 'ta_idgrupos'],
                references: {
                    table: 'grupos',
                    field: ['g_idmaterias', 'idgrupos']
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            }
        ]
    });

    Tareas.associate = (models) => {
        Tareas.belongsTo(models.Grupos, {
            foreignKey: 'ta_idmaterias',
            targetKey: 'g_idmaterias'
        });
        Tareas.belongsTo(models.Grupos, {
            foreignKey: 'ta_idgrupos',
            targetKey: 'idgrupos'
        });
    };

    return Tareas;
};
