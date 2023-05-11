const app = require('./app');
app.engine('html', require('ejs').renderFile);//
const { syncAndSeed } = require('./db');

try{
  require('../env.js');
}
catch(ex){
  console.log(ex);
}

console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const init = async()=> {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();



