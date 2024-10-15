module.exports = (sequelize, Sequelize) => {
    const AvisosDocumentos = sequelize.define("avisosDocumentos", {
        idavisosDocumentos: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dirección_AD: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        nombre_AD: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        avD_idAviso: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        avD_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        avD_idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_avisosDocumentos_avisos1_idx',
                fields: ['avD_idAviso', 'avD_idmaterias', 'avD_idgrupos']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_avisosDocumentos_avisos1',
                field: ['avD_idAviso', 'avD_idmaterias', 'avD_idgrupos'],
                references: {
                    table: 'avisos',
                    field: ['idAviso', 'av_idmaterias', 'av_idgrupos']
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    AvisosDocumentos.associate = (models) => {
        AvisosDocumentos.belongsTo(models.Avisos, {
            foreignKey: 'avD_idAviso',
            targetKey: 'idAviso'
        });
        AvisosDocumentos.belongsTo(models.Avisos, {
            foreignKey: 'avD_idmaterias',
            targetKey: 'av_idmaterias'
        });
        AvisosDocumentos.belongsTo(models.Avisos, {
            foreignKey: 'avD_idgrupos',
            targetKey: 'av_idgrupos'
        });
    };

    return AvisosDocumentos;
};
