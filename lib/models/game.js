module.exports = function(sequelize, DataTypes) {
  return sequelize.define("game", {
    id: DataTypes.INTEGER,
    whitePlayerUserId: DataTypes.INTEGER,
    blackPlayerUserId: DataTypes.INTEGER,
    moves: DataTypes.ARRAY(DataTypes.TEXT),
    isActive: DataTypes.BOOLEAN,
  })
}