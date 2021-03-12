const pins = require('./sightings');
const { img, images } = require ('./images')
require('dotenv').config({path: '../../.env'});
// console.log(pins.features[0])

//bigfoot sighting data is from here: https://services2.arcgis.com/sJvSsHKKEOKRemAr/arcgis/rest/services/Bigfoot%20Locations/FeatureServer/0/query?where=STATE_NAME+%3D+%27+%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=name%2C+descriptio%2C+Lon%2C+Lat&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=


const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');

const db = new Pool(dbParams);
db.connect();


// map_id and user_id is hardcoded
const insertPin = (title, description, lon, lat) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO pins (title, description, picture_url, lon, lat, map_id, user_id) VALUES ($1, $2, $3, ${lon}, ${lat}, 1, 2)`, [title, description, img(images)])
  .then(() => {
    resolve()
  })
})


const dataLoop = async function(obj){
  for (let index in obj.features) {
    // console.log(`adding pin ${Number(index) +1} of ${obj.features.length}!`)
    const {name, descriptio, Lon, Lat} = obj.features[index].attributes;
    await insertPin(name, descriptio, Lon, Lat);
  }
}
//  dataLoop(pins);

module.exports = { dataLoop };

