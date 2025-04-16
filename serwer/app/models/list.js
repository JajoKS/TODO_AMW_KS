module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("list", {
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      check: {
        type: DataTypes.BOOLEAN
      }
    });
  
    return List;
  };
  