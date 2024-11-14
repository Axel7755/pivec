module.exports = (sequelize, Sequelize) => {
    const Avisos = sequelize.define("avisos", {
        idAviso: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
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
            primaryKey: true,
            allowNull: false
        },
        av_idgrupos: {
            type: Sequelize.STRING(13),
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_avisos_grupos1_idx',
                fields: ['av_idmaterias', 'av_idgrupos']
            },
            {
                name: 'avisos_av_idmaterias_av_idgrupos',
                fields: ['av_idmaterias', 'av_idgrupos']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_avisos_grupos1',
                field: ['av_idmaterias', 'av_idgrupos'],
                references: {
                    table: 'grupos',
                    field: ['g_idmaterias', 'idgrupos']
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    Avisos.associate = (models) => {
        Avisos.belongsTo(models.Grupos, {
            foreignKey: 'av_idmaterias',
            targetKey: 'g_idmaterias'
        });
        Avisos.belongsTo(models.Grupos, {
            foreignKey: 'av_idgrupos',
            targetKey: 'idgrupos'
        });
    };

    return Avisos;
};
