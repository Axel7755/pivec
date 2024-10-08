module.exports = (sequelize, Sequelize) => {
    const Videos = sequelize.define("videos", {
        idvideos: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        titulo_V: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        dirección_V: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        v_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        v_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        indexes: [
            {
                fields: ['v_boleta']
            },
            {
                fields: ['v_idmaterias']
            }
        ]
    });

    Videos.associate = (models) => {
        Videos.belongsTo(models.Alumnos, {
            foreignKey: 'v_boleta',
            targetKey: 'boleta'
        });
        Videos.belongsTo(models.Materias, {
            foreignKey: 'v_idmaterias',
            targetKey: 'idmaterias'
        });
    };

    return Videos;
};
