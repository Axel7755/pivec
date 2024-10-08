module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "dbPIEC",
    dialect: "mysql",
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };