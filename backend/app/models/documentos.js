module.exports = (sequelize, Sequelize) => {
    const Documentos = sequelize.define("documentos", {
        iddocumentos: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dircción_D: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        d_idtareas: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        d_idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true
        },
        d_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        indexes: [
            {
                fields: ['d_idtareas', 'd_idgrupos', 'd_boleta']
            }
        ]
    });

    Documentos.associate = (models) => {
        Documentos.belongsTo(models.Entregas, {
            foreignKey: 'd_idtareas',
            targetKey: 'e_idtareas'
        });
        Documentos.belongsTo(models.Entregas, {
            foreignKey: 'd_idgrupos',
            targetKey: 'e_idgrupos'
        });
        Documentos.belongsTo(models.Entregas, {
            foreignKey: 'd_boleta',
            targetKey: 'e_boleta'
        });
    };

    return Documentos;
};
