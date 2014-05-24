module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    id: DataTypes.INTEGER,
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT
  })
}