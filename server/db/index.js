const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const UserPlace = require('./UserPlace');

UserPlace.belongsTo(Place);
UserPlace.belongsTo(User);
User.hasMany(UserPlace);
Place.hasMany(UserPlace);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);
  
  const [LA, nyc, seoul, london] = await Promise.all([
    Place.create({ name: 'los angeles', lat: 34.0522342, lon: -118.2436849}),
    Place.create({ name: 'new york city', lat: 40.7127753, lon: -74.0059728}),
    Place.create({ name: 'seoul', lat: 37.5518911, lon: 126.9917937}),
    Place.create({ name: 'london', lat: 51.5072178, lon: -0.1275862}),
    ]);
    
  const userPlaces = await Promise.all([
    UserPlace.create({ userId: moe.id, placeId: london.id, isVisited: false }),
    UserPlace.create({ userId: moe.id, placeId: nyc.id, isVisited: true }),
    UserPlace.create({ userId: moe.id, placeId: seoul.id, isVisited: false }),
    ]);  
  return {
    users: {
      moe,
      lucy,
      larry
    },
    places: {
      LA,
      nyc,
      seoul,
      london
    },
    userPlaces
  };
};


module.exports = {
  syncAndSeed,
  User,
  Place,
  UserPlace
};
