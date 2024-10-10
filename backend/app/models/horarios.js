module.exports = (sequelize, Sequelize) => {
    const Horarios = sequelize.define("horarios", {
        idHorarios: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dia: {
            type: Sequelize.STRING(11),
            allowNull: false
        },
        entrada: {
            type: Sequelize.TIME,
            allowNull: false
        },
        salida: {
            type: Sequelize.TIME,
            allowNull: false
        },
        ho_idmaterias: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ho_idgrupos: {
            type: Sequelize.STRING(6),
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['ho_idmaterias', 'ho_idgrupos']
            }
        ]
    });

    Horarios.associate = (models) => {
        Horarios.belongsTo(models.Grupos, {
            foreignKey: 'ho_idmaterias',
            targetKey: 'g_idmaterias',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Horarios.belongsTo(models.Grupos, {
            foreignKey: 'ho_idgrupos',
            targetKey: 'idgrupos',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return Horarios;
};
