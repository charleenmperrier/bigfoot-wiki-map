// Map Element on page
let southWest = L.latLng(44.715514, -132.714844),
    northEast = L.latLng(58.263287, -112.719727),
    bounds = L.latLngBounds(southWest, northEast);

let map = L.map('map', {
  minZoom: 5,
  maxZoom: 10,
  maxBounds: bounds,
  padding: 1,
}).setView([52,-122.727], 5);
const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const tileUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wpKyMC536a0ZlXqAX7iu';




// console.log(map.getBounds().getSouthWest().toString());
// console.log(map.getBounds().getNorthEast().toString());
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);


getData()

// Toggle switch of Heart to Red Heart
function myFunction(x) {
  x.classList.toggle("fa-fa-heart");
}

function zoomOut() {
    map.flyTo([52,-122.727], 5, {duration: 0.5});
}


// Map Marker, adds data from db to map marker popups
async function getData() {
  const response = await fetch('/api/pins');
  const data = await response.json();
  console.log(data.pins)
  for (item of data.pins) {
    const marker = L.marker([item.lat, item.lon], {
      // hover description
      title: "big foot sighting",
    }).addTo(map);

    let txt = `<h1> ${item.title} </h1> <div> <img src= ${'"'+item.picture_url+'"'} height="150px" width="auto"/> <p id="description"> ${item.description} </p> <p id="longLat">location at ${[(item.lat).toFixed(2), (item.lon).toFixed(2)]} </p></div> <i onclick="myFunction(this)" class="fa fa-heart"></i> <button onclick="zoomOut()"> zoom out </button>`;

    marker.on('click', function(e){
      map.flyTo([e.latlng.lat, e.latlng.lng], 10, {duration: 0.5});

    });



    marker.bindPopup(txt);
  }
  console.log(data)
}



      // // User adding marker and removing marker, popups hardcoded

      // let theMarker = {};

      // map.on('click',function(e){
      // lat = e.latlng.lat;
      // lon = e.latlng.lng;

      // // //Clears existing marker by placing elsewhere
      // if (theMarker !== undefined) {
      //         map.removeLayer(theMarker);
      //   };

      // //Add a marker to show where you clicked.
      // theMarker = L.marker([lat,lon]).addTo(map).bindPopup(`<input id="title" type="text"/>  <div> <img src="https://i.pinimg.com/originals/43/eb/96/43eb96608de40c2d0bd7fbf387d5df87.jpg" height="150px" width="auto"/> <input id="description" type="text"/>  <p id="longLat">location at ${[(lat).toFixed(3), (lon).toFixed(3)]} </p></div>  <button type="submit" class="btn btn-primary">submit</button></form>`);
      // });



     // // Calculate distance between two points in google maps V3

      // var rad = function(x) {
      //   return x * Math.PI / 180;
      // };

      // var getDistance = function(p1, p2) {
      //   var R = 6378137; // Earth’s mean radius in meter
      //   var dLat = rad(p2.lat() - p1.lat());
      //   var dLong = rad(p2.lng() - p1.lng());
      //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      //     Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
      //     Math.sin(dLong / 2) * Math.sin(dLong / 2);
      //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      //   var d = R * c;
      //   return d; // returns the distance in meter
      // };
