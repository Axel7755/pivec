module.exports = (sequelize, Sequelize) => {
    const Horarios = sequelize.define("horarios", {
        idHorarios: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dia: {
            type: Sequelize.STRING(11),
            allowNull: false
        },
        entrada: {
            type: Sequelize.TIME,
            allowNull: true
        },
        salida: {
            type: Sequelize.TIME,
            allowNull: true
        },
        ho_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        ho_idgrupos: {
            type: Sequelize.STRING(13),
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_horarios_grupos1_idx',
                fields: ['ho_idmaterias', 'ho_idgrupos']
            },
            {
                name: 'horarios_ho_idmaterias_ho_idgrupos',
                fields: ['ho_idmaterias', 'ho_idgrupos']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_horarios_grupos1',
                field: ['ho_idmaterias', 'ho_idgrupos'],
                references: {
                    table: 'grupos',
                    field: ['g_idmaterias', 'idgrupos']
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    Horarios.associate = (models) => {
        Horarios.belongsTo(models.Grupos, {
            foreignKey: 'ho_idmaterias',
            targetKey: 'g_idmaterias'
        });
        Horarios.belongsTo(models.Grupos, {
            foreignKey: 'ho_idgrupos',
            targetKey: 'idgrupos'
        });
    };

    return Horarios;
};
