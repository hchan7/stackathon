const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;

const UserPlace = conn.define('userplace',{
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  placeId: {
    type: UUID,
    allowNull: false,
  },
  isVisited: {
    type:BOOLEAN,
    defaultValue: false
  },
  
});

module.exports = UserPlace;