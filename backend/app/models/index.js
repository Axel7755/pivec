const dbConfig = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Alumnos = require("./alumnos.js")(sequelize, Sequelize);
db.Docentes = require("./docentes.js")(sequelize, Sequelize);
db.Materias = require("./materias.js")(sequelize, Sequelize);
db.Videos = require("./videos.js")(sequelize, Sequelize);
db.Grupos = require("./grupos.js")(sequelize, Sequelize);
db.Grabaciones = require("./grabaciones.js")(sequelize, Sequelize);
db.Tareas = require("./tareas.js")(sequelize, Sequelize);
db.Entregas = require("./entregas.js")(sequelize, Sequelize);
db.Documentos = require("./documentos.js")(sequelize, Sequelize);
db.Comentarios = require("./comentarios.js")(sequelize, Sequelize);
db.Avisos = require("./avisos.js")(sequelize, Sequelize);
db.Horarios = require("./horarios.js")(sequelize, Sequelize);
db.GruposAlumnos = require("./grupos_alumnos.js")(sequelize, Sequelize);

// Aquí puedes definir las asociaciones si es necesario
/*Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});*/

module.exports = db;