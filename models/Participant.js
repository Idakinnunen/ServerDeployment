module.exports = (sequelize, Sequelize) => {
    const participant = sequelize.define(
      'participant',
      {
        email: {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        firstname: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        lastname: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        dob: {
          type: Sequelize.DataTypes.DATEONLY,
          allowNull: false
        }
      },
      {
        timestamps: false
      }
    );
  
    participant.associate = function (models) {
      participant.hasOne(models.Work, { foreignKey: { allowNull: false } });
      participant.hasOne(models.Home, { foreignKey: { allowNull: false } });
    };
  
    return participant;
  };
  