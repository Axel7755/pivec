module.exports = (sequelize, Sequelize) => {
    const GruposAlumnos = sequelize.define("grupos_alumnos", {
        ga_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        ga_idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true,
            allowNull: false
        },
        ga_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_grupos_has_alumnos_alumnos1_idx',
                fields: ['ga_boleta']
            },
            {
                name: 'fk_grupos_has_alumnos_grupos1_idx',
                fields: ['ga_idmaterias', 'ga_idgrupos']
            },
            {
                name: 'grupos_alumnos_ga_boleta',
                fields: ['ga_boleta']
            },
            {
                name: 'grupos_alumnos_ga_idmaterias_ga_idgrupos',
                fields: ['ga_idmaterias', 'ga_idgrupos']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_grupos_has_alumnos_alumnos1',
                field: 'ga_boleta',
                references: {
                    table: 'alumnos',
                    field: 'boleta'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            {
                name: 'fk_grupos_has_alumnos_grupos1',
                field: ['ga_idmaterias', 'ga_idgrupos'],
                references: {
                    table: 'grupos',
                    field: ['g_idmaterias', 'idgrupos']
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        ]
    });

    return GruposAlumnos;
};
