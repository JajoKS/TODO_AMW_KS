module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      login: {
        type: DataTypes.STRING
      },
      pass: {
        type: DataTypes.STRING
      }
    });
  
    return User;
  };
  