module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    "history",
    {
      status: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  History.associate = (models) => {
    History.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return History;
};
