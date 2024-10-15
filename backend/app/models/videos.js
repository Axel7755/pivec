module.exports = (sequelize, Sequelize) => {
    const Videos = sequelize.define("videos", {
        idvideos: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        titulo_V: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        dirección_V: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        v_boleta: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        v_idmaterias: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        indexes: [
            {
                name: 'fk_videos_alumnos1_idx',
                fields: ['v_boleta']
            },
            {
                name: 'fk_videos_materias1_idx',
                fields: ['v_idmaterias']
            },
            {
                name: 'videos_v_boleta',
                fields: ['v_boleta']
            },
            {
                name: 'videos_v_idmaterias',
                fields: ['v_idmaterias']
            }
        ],
        foreignKeys: [
            {
                name: 'fk_videos_alumnos1',
                field: 'v_boleta',
                references: {
                    table: 'alumnos',
                    field: 'boleta'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
            },
            {
                name: 'fk_videos_materias1',
                field: 'v_idmaterias',
                references: {
                    table: 'materias',
                    field: 'idmaterias'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION'
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
