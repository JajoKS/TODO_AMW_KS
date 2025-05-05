module.exports = (sequelize, DataTypes) => {
    // Definicja modelu "Lists" do tworzenia tabeli
    const Lists = sequelize.define('lists', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,  // tytuł nie może być pusty
      },
      description: {
        type: DataTypes.STRING,
      },
      check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    });
  
    return Lists;
  };
  