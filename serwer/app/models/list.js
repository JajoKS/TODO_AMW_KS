module.exports = (sequelize, DataTypes) => {
    // Definicja modelu "Lists" do tworzenia tabeli
    const Lists = sequelize.define('lists', {
        listNumber: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false, // zakładamy, że tytuł jest wymagany
        }
      }, {
        timestamps: false,      // wyłączenie pól createdAt oraz updatedAt (opcjonalnie)
        tableName: 'lists'      // jawna nazwa tabeli
      });
      Lists.associate = (models) => {
        Lists.hasMany(models.Tasks, { foreignKey: 'listNumber', as: 'tasks', onDelete: 'CASCADE' });
      };
    return Lists;
  };
  