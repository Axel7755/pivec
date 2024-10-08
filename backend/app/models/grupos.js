module.exports = (sequelize, Sequelize) => {
    const Grupos = sequelize.define("grupos", {
        g_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        g_doc_noTrabajador: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true
        },
        fechin: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fechfin: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        indexes: [
            {
                fields: ['g_doc_noTrabajador']
            }
        ]
    });

    Grupos.associate = (models) => {
        Grupos.belongsTo(models.Materias, {
            foreignKey: 'g_idmaterias',
            targetKey: 'idmaterias',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        Grupos.belongsTo(models.Docentes, {
            foreignKey: 'g_doc_noTrabajador',
            targetKey: 'noTrabajador'
        });
    };

    return Grupos;
};
