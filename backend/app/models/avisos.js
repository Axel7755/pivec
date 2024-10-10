module.exports = (sequelize, Sequelize) => {
    const Avisos = sequelize.define("avisos", {
        idAviso: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        aviso: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        a_fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        av_idmaterias: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        av_idgrupos: {
            type: Sequelize.STRING(6),
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['av_idmaterias', 'av_idgrupos']
            }
        ]
    });

    Avisos.associate = (models) => {
        Avisos.belongsTo(models.Grupos, {
            foreignKey: 'av_idmaterias',
            targetKey: 'g_idmaterias',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Avisos.belongsTo(models.Grupos, {
            foreignKey: 'av_idgrupos',
            targetKey: 'idgrupos',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Avisos;
};
