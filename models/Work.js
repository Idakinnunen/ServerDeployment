module.exports = (sequelize, DataTypes) => {
  const Work = sequelize.define('Work', {
      companyname: DataTypes.STRING,
      salary: DataTypes.FLOAT,
      currency: DataTypes.STRING,
      ParticipantId: {
          type: DataTypes.INTEGER,
          references: {
              model: 'participants', // references the participants table
              key: 'id'
          }
      }
  }, {
      tableName: 'works',
      timestamps: false,
  });

  return Work;
};
