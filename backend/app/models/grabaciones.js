module.exports = (sequelize, Sequelize) => {
    const Grabaciones = sequelize.define("grabaciones", {
        idgrabaciones: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dirección_G: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        titulo_G: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        g_fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        gr_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        gr_idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_grabaciones_grupos1_idx',
                fields: ['gr_idmaterias', 'gr_idgrupos']
            },
            {
                name: 'grabaciones_gr_idmaterias_gr_idgrupos',
                fields: ['gr_idmaterias', 'gr_idgrupos']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_grabaciones_grupos1',
                field: ['gr_idmaterias', 'gr_idgrupos'],
                references: {
                    table: 'grupos',
                    field: ['g_idmaterias', 'idgrupos']
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    Grabaciones.associate = (models) => {
        Grabaciones.belongsTo(models.Grupos, {
            foreignKey: 'gr_idmaterias',
            targetKey: 'g_idmaterias'
        });
        Grabaciones.belongsTo(models.Grupos, {
            foreignKey: 'gr_idgrupos',
            targetKey: 'idgrupos'
        });
    };

    return Grabaciones;
};
