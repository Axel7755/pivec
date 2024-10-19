module.exports = (sequelize, Sequelize) => {
    const Comentarios = sequelize.define("Comentarios", {
        idComentarios: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Comentario: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        c_fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        doc_al: {
            type: Sequelize.STRING(1),
            allowNull: false
        },
        c_idtareas: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        c_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_Comentarios_entregas1_idx',
                fields: ['c_idtareas', 'c_boleta']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_Comentarios_entregas1',
                field: ['c_idtareas', 'c_boleta'],
                references: {
                    table: 'entregas',
                    field: ['e_idtareas', 'e_boleta']
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    Comentarios.associate = (models) => {
        Comentarios.belongsTo(models.Entregas, {
            foreignKey: 'c_idtareas',
            targetKey: 'e_idtareas'
        });
        Comentarios.belongsTo(models.Entregas, {
            foreignKey: 'c_boleta',
            targetKey: 'e_boleta'
        });
    };

    return Comentarios;
};
