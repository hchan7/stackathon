const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, FLOAT } = conn.Sequelize;

const Place = conn.define('place', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
  },
  lat: {
    type: FLOAT
  },
  lon: {
    type: FLOAT
  }
  
});

module.exports = Place;