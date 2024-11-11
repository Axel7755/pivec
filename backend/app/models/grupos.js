module.exports = (sequelize, Sequelize) => {
    const Grupos = sequelize.define("grupos", {
        g_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        g_doc_noTrabajador: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true,
            allowNull: false
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
                name: 'fk_grupos_docentes1_idx',
                fields: ['g_doc_noTrabajador']
            },
            {
                name: 'grupos_g_doc_no_trabajador',
                fields: ['g_doc_noTrabajador']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_grupos_docentes1',
                field: 'g_doc_noTrabajador',
                references: {
                    table: 'docentes',
                    field: 'noTrabajador'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
            {
                name: 'fk_grupos_materias1',
                field: 'g_idmaterias',
                references: {
                    table: 'materias',
                    field: 'idmaterias'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    Grupos.associate = (models) => {
        Grupos.belongsTo(models.Docentes, {
            foreignKey: 'g_doc_noTrabajador',
            targetKey: 'noTrabajador'
        });
        Grupos.belongsTo(models.Materias, {
            foreignKey: 'g_idmaterias',
            targetKey: 'idmaterias'
        });
    };

    return Grupos;
};
