module.exports = (sequelize, Sequelize) => {
    const DocumentosTareas = sequelize.define("documentosTareas", {
        iddocumentosTareas: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dirección_DT: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        nombre_DT: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        dt_idtareas: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_documentosTareas_tareas1_idx',
                fields: ['dt_idtareas']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_documentosTareas_tareas1',
                field: 'dt_idtareas',
                references: {
                    table: 'tareas',
                    field: 'idtareas'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    DocumentosTareas.associate = (models) => {
        DocumentosTareas.belongsTo(models.Tareas, {
            foreignKey: 'dt_idtareas',
            targetKey: 'idtareas'
        });
    };

    return DocumentosTareas;
};
