module.exports = (sequelize, Sequelize) => {
    const Comentarios = sequelize.define("Comentarios", {
        idComentarios: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Comentario: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        c_idtareas: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        c_idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true
        },
        c_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        c_fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        doc_al: {
            type: Sequelize.STRING(1),
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['c_idtareas', 'c_idgrupos', 'c_boleta']
            }
        ]
    });

    Comentarios.associate = (models) => {
        Comentarios.belongsTo(models.Entregas, {
            foreignKey: 'c_idtareas',
            targetKey: 'e_idtareas'
        });
        Comentarios.belongsTo(models.Entregas, {
            foreignKey: 'c_idgrupos',
            targetKey: 'e_idgrupos'
        });
        Comentarios.belongsTo(models.Entregas, {
            foreignKey: 'c_boleta',
            targetKey: 'e_boleta'
        });
    };

    return Comentarios;
};
