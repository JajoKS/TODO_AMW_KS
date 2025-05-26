// models/tasks.js
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Klucz obcy – odniesienie do tabeli lists, pole listNumber
    listNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lists',  // odniesienie do tabeli lists
        key: 'listNumber'
      }
    }
  }, {
    timestamps: false,
    tableName: 'tasks'
  });

  // Każde zadanie należy do jednej listy
  Tasks.associate = (models) => {
    Tasks.belongsTo(models.Lists, { foreignKey: 'listNumber', as: 'list' });
  };

  return Tasks;
};