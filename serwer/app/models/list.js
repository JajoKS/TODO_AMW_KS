module.exports = (sequelize, DataTypes) => {
    const Lists = sequelize.define("lists", {
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
  