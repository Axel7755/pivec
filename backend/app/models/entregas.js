module.exports = (sequelize, Sequelize) => {
    const Entregas = sequelize.define("entregas", {
        e_idtareas: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        e_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        calificación: {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: null
        },
        e_fecha: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'entregas_e_boleta',
                fields: ['e_boleta']
            },
            {
                name: 'entregas_e_idtareas',
                fields: ['e_idtareas']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_tareas_has_alumnos_alumnos1',
                field: 'e_boleta',
                references: {
                    table: 'alumnos',
                    field: 'boleta'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            {
                name: 'fk_tareas_has_alumnos_tareas1',
                field: 'e_idtareas',
                references: {
                    table: 'tareas',
                    field: 'idtareas'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            }
        ]
    });

    Entregas.associate = (models) => {
        Entregas.belongsTo(models.Tareas, {
            foreignKey: 'e_idtareas',
            targetKey: 'idtareas'
        });
        Entregas.belongsTo(models.Alumnos, {
            foreignKey: 'e_boleta',
            targetKey: 'boleta'
        });
    };

    return Entregas;
};
