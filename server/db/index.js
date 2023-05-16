const conn = require('./conn');
const User = require('./User');
const Place = require('./Place');
const UserPlace = require('./UserPlace');
//const Review = require('./Review');

UserPlace.belongsTo(Place);
UserPlace.belongsTo(User);
User.hasMany(UserPlace);
Place.hasMany(UserPlace);
//Review.belongsTo(Place);
//Review.belongsTo(User);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);
  
  const [LA, nyc, machupicchu, london] = await Promise.all([
    Place.create({ name: 'Los Angeles, CA, USA', lat: 34.0522342, lon: -118.2436849}),
    Place.create({ name: 'New York, NY, USA', lat: 40.7127753, lon: -74.0059728}),
    Place.create({ name: 'Machu Picchu, Peru', lat: -13.226090987952357, lon: -72.49743281201694}),
    Place.create({ name: 'London, UK', lat: 51.5072178, lon: -0.1275862}),
    ]);
    
  const userPlaces = await Promise.all([
    UserPlace.create({ userId: moe.id, placeId: london.id, isVisited: false }),
    UserPlace.create({ userId: moe.id, placeId: nyc.id, isVisited: true }),
    UserPlace.create({ userId: moe.id, placeId: machupicchu.id, isVisited: false , note: 'always wanted to visit this place!'}),
    UserPlace.create({ userId: lucy.id, placeId: LA.id, isVisited: false}),
    UserPlace.create({ userId: larry.id, placeId: LA.id, isVisited: false}),
    UserPlace.create({ userId: ethyl.id, placeId: LA.id, isVisited: false}),
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
      machupicchu,
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
