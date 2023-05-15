require('dotenv').config(); //
const express = require('express');
const app = express();
const path = require('path');
app.use(express.json({limit: '50mb'}));
//const NodeGeocoder = require('node-geocoder');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

// app.get('/', (req, res)=>{
//   res.send(process.env);
// })
app.get('/', (req, res)=> {
  // API KEY FOR BACKEND
  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  res.render(path.join(__dirname, '../static/index.html'),
  { REACT_APP_GOOGLE_MAPS_API_KEY : process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  
});

app.use('/api/auth', require('./api/auth'));
app.use('/api/userplaces', require('./api/userplaces'));
// app.get('/api/geocode', async(req, res, next)=> {
  
// });

// app.get('/api/weather', async(req, res, next)=> {
  
// });
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err.message });
});
module.exports = app;
