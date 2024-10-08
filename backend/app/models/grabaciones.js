module.exports = (sequelize, Sequelize) => {
    const Grabaciones = sequelize.define("grabaciones", {
        idgrabaciones: {
            type: Sequelize.INTEGER,
            primaryKey: true
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
            allowNull: false
        },
        gr_idgrupos: {
            type: Sequelize.STRING(6),
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['gr_idmaterias', 'gr_idgrupos']
            }
        ]
    });

    Grabaciones.associate = (models) => {
        Grabaciones.belongsTo(models.Grupos, {
            foreignKey: 'gr_idmaterias',
            targetKey: 'g_idmaterias',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Grabaciones.belongsTo(models.Grupos, {
            foreignKey: 'gr_idgrupos',
            targetKey: 'idgrupos',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Grabaciones;
};
