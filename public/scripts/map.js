// Map Element on page

let map = L.map('map', {
  minZoom: 1.5,
  maxZoom: 10,
  // padding: 0,

}).setView([30, 0], 1.5);

// dynamic constraint
let bounds = map.getBounds().pad(1)
map.setMaxBounds(bounds);

// console.log(map.getBounds())

const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const tileUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wpKyMC536a0ZlXqAX7iu';


const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

getData()

// Toggle switch of Heart to Red Heart
function myFunction(x) {
  x.classList.toggle("fa-fa-heart");
}

// zoom out on popup
function zoomOut() {
    map.flyTo([30, 0], 2, {duration: 0.5}).closePopup();
}


// Map Marker, adds data from db to map marker popups
async function getData() {
  const response = await fetch('/api/pins');
  const data = await response.json();
  // console.log(data.pins)
  for (item of data.pins) {
    const marker = L.marker([item.lat, item.lon], {
      // hover description
      title: "big foot sighting",
    }).addTo(map);

    let txt = `<h1> ${item.title} </h1> <div> <img src= ${'"'+item.picture_url+'"'} height="150px" width="auto"/> <p id="description"> ${item.description} </p> <p id="longLat">location at ${[(item.lat).toFixed(2), (item.lon).toFixed(2)]} </p></div> <i onclick="myFunction(this)" class="fa fa-heart"></i> <button onclick="zoomOut()"> zoom out to world</button>`;


// zoom in on popup
    marker.on('click', function(e){
      map.flyTo([e.latlng.lat, e.latlng.lng], 5, {duration: 0.5});

    });

    marker.bindPopup(txt);
  }
  // console.log(data)
}

