module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      'User',
      {
        username: {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        }
      },
      {
        timestamps: false
      }
    );
  
    return User;
  };
  