module.exports = (sequelize, Sequelize) => {
    const Work = sequelize.define(
      'Work',
      {
        companyname: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        salary: {
          type: Sequelize.DataTypes.FLOAT,
          allowNull: false
        },
        currency: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        }
      },
      {
        timestamps: false
      }
    );
  
    Work.associate = function (models) {
      Work.belongsTo(models.participant, { foreignKey: { allowNull: false } });
    };
  
    return Work;
  };
  