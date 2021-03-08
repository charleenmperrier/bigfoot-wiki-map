const pins = require('./sightings');
require('dotenv').config({path: '../../.env'});
// console.log(pins.features[0])

const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
// const dbParams = {
//   host: 'localhost',
//   port: '5432',
//   user: 'labber',
//   password: 'labber',
//   database: 'midterm'
// }
const db = new Pool(dbParams);
db.connect();

//promise to take objs we care so we don't lose them
//future-- randomize across all three maps for each pin
// same for users

// map_id and user_id is hardcoded
const insertPin = (title, description, lon, lat) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO pins (title, description,lon, lat, map_id, user_id) VALUES ($1, $2, ${lon}, ${lat}, 1, 2)`, [title, description])
  .then(() => {
    resolve()
  })
})


const dataLoop = async function(obj){
  for (let index in obj.features) {
    console.log(`adding another item ${index} of ${obj.features.length}!`)
    // console.log(pin.attributes)
    const {name, descriptio, Lon, Lat} = obj.features[index].attributes
    await insertPin(name, descriptio, Lon, Lat)
  }
}
 dataLoop(pins);
// insertPin('title', 'bigfoot was here', -123.498, 48.889)
