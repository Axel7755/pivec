module.exports = (sequelize, Sequelize) => {
    const GruposAlumnos = sequelize.define("grupos_alumnos", {
        ga_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        ga_idgrupos: {
            type: Sequelize.STRING(6),
            primaryKey: true
        },
        ga_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        indexes: [
            {
                fields: ['ga_boleta']
            },
            {
                fields: ['ga_idmaterias', 'ga_idgrupos']
            }
        ]
    });

    GruposAlumnos.associate = (models) => {
        GruposAlumnos.belongsTo(models.Grupos, {
            foreignKey: 'ga_idmaterias',
            targetKey: 'g_idmaterias'
        });
        GruposAlumnos.belongsTo(models.Grupos, {
            foreignKey: 'ga_idgrupos',
            targetKey: 'idgrupos'
        });
        GruposAlumnos.belongsTo(models.Alumnos, {
            foreignKey: 'ga_boleta',
            targetKey: 'boleta'
        });
    };

    return GruposAlumnos;
};
