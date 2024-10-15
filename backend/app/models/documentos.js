module.exports = (sequelize, Sequelize) => {
    const Documentos = sequelize.define("documentos", {
        iddocumentos: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dircción_D: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        nombre_D: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        d_idtareas: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        d_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_documentos_entregas1_idx',
                fields: ['d_idtareas', 'd_boleta']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_documentos_entregas1',
                field: ['d_idtareas', 'd_boleta'],
                references: {
                    table: 'entregas',
                    field: ['e_idtareas', 'e_boleta']
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    Documentos.associate = (models) => {
        Documentos.belongsTo(models.Entregas, {
            foreignKey: 'd_idtareas',
            targetKey: 'e_idtareas'
        });
        Documentos.belongsTo(models.Entregas, {
            foreignKey: 'd_boleta',
            targetKey: 'e_boleta'
        });
    };

    return Documentos;
};
