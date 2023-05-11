const express = require('express');
const app = express.Router();
const { User, Place, UserPlace } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

//mounted on /api/userplaces
app.post('/', isLoggedIn, async(req, res, next) => {
  try{
    //const { userId, place } = req.body;
    console.log('req.body:', req.body.data)
    const place = req.body.data;
    //find all Places to compare the req.body.data name to Places' name
    const places = await Place.findAll();
    // Create a new place record in the Place table
    let newPlace;
    const index = places.findIndex(p => p.name === place.name);
    if(index === -1){
      newPlace = await Place.create(req.body.data);
    }else{
      newPlace = places[index];
    }
    // Create a new record in the junction table to associate the user with the newly created place
    //if the user already has this userplace, don't create userplace again
    const userplaces = await UserPlace.findAll({
      where: {
        userId: req.user.id,
        placeId: newPlace.id
      }
    });
    
    let newUserPlace;
    if(userplaces.length === 0){
      newUserPlace = await UserPlace.create({
        userId: req.user.id,
        placeId: newPlace.id,
        isVisited: false
      });
    } else{
      newUserPlace = userplaces[0];
    } 
    res.status(201).send(newUserPlace);
  }
  catch(ex){
    next(ex);
  }
});