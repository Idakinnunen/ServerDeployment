module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define(
    'Home',
    {
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ParticipantId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'participants', // Reference to the participants table
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disabling the automatic createdAt and updatedAt fields
    }
  );

  Home.associate = function (models) {
    Home.belongsTo(models.Participant, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE', // Cascades deletion to Home when Participant is deleted
    });
  };

  return Home;
};
