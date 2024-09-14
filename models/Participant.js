module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
      email: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
  }, {
      tableName: 'participants',
      timestamps: false,
  });

  Participant.associate = (models) => {
      Participant.hasMany(models.Work, { foreignKey: 'ParticipantId', as: 'workDetails' });
      Participant.hasMany(models.Home, { foreignKey: 'ParticipantId', as: 'homeDetails' });
  };

  return Participant;
};
