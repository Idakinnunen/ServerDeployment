module.exports = (sequelize, Sequelize) => {
  const Home = sequelize.define(
    'Home',
    {
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disabling the automatic createdAt and updatedAt fields
    }
  );

  Home.associate = function (models) {
    // Defining the belongsTo association with Participant model
    Home.belongsTo(models.Participant, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE', // Cascades deletion to Home when Participant is deleted
    });
  };

  return Home;
};
