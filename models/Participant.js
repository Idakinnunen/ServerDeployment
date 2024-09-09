module.exports = (sequelize, Sequelize) => {
    const Participant = sequelize.define(
      'Participant',
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
  
    Participant.associate = function (models) {
      Participant.hasOne(models.Work, { foreignKey: { allowNull: false } });
      Participant.hasOne(models.Home, { foreignKey: { allowNull: false } });
    };
  
    return Participant;
  };
  