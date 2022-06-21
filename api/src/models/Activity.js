const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// Country.belongsToMany(Activity, {through: 'country_activity'})
// Activity.belongsToMany(Country, {through: 'country_activity'})

module.exports = (sequelize) => {
  //-------------------------------creacion tabla activity----------------------------------
  sequelize.define("activity", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificult: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
