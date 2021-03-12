
getMapData()
async function getMapData() {
  const response = await fetch('/maps/api');
  const data = await response.json();

  for (item of api) {
    // console.log("hello", item)
    }
}

let map = L.map('map', {
  minZoom: 7,
  maxZoom: 10,
  padding: 1,
}).setView([49.85,-122.27], 5);

// dynamic constraint
let bounds = map.getBounds().pad(.3)
map.setMaxBounds(bounds);



const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const tileUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wpKyMC536a0ZlXqAX7iu';


const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);


getData();

// // Toggle switch of Heart to Red Heart
// function myFunction(x) {
//   x.classList.toggle("fa-fa-heart");
// }

// zoom out on popup
function zoomOut() {
    map.flyTo([49.85,-122.27], 7, {duration: 0.5}).closePopup();
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

    let txt = `<h1> ${item.title} </h1> <div> <img src= "${item.picture_url}" height="150px" width="auto"/> <p id="description"> ${item.description} </p> <p id="longLat">location at ${[(item.lat).toFixed(2), (item.lon).toFixed(2)]} </p></div> <i onclick="myFunction(this)" class="fa fa-heart"></i> <button onclick="zoomOut()"> zoom out </button>`;


// zoom in on popup
    marker.on('click', function(e){
      map.flyTo([e.latlng.lat, e.latlng.lng], 10, {duration: 0.5});

    });

    marker.bindPopup(txt);
  }

}

