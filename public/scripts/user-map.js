// Map Element on page


let map = L.map('map', {
  minZoom: 2,
  maxZoom: 10,
  worldCopyJump: true,

}).setView([46.710,-102.173], 3);

// dynamic constraint
let bounds = map.getBounds().pad(0.65)
map.setMaxBounds(bounds);

// console.log(map.getBounds())

const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const tileUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wpKyMC536a0ZlXqAX7iu';


const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

getData();



// zoom out on popup
function zoomOut() {
    map.flyTo([46.710,-102.173], 3, {duration: 0.5}).closePopup();
}


// Map Marker, adds data from db to map marker popups
async function getData() {
  const response = await fetch('/api/pins');
  const data = await response.json();

  for (item of data.pins) {
    const marker = L.marker([item.lat, item.lon], {
      // hover description
      title: "big foot sighting",
    }).addTo(map);

    let txt = `<h1> ${item.title} </h1> <div> <img src= "${item.picture_url}" height="150px" width="auto"/> <p id="description"> ${item.description} </p> <p id="longLat">location at ${[(item.lat).toFixed(2), (item.lon).toFixed(2)]} </p><button onclick="zoomOut()"> zoom out </button>

    <form action='http://localhost:8080/api/pins/${item.id}/delete' method="POST">
    <input type="Submit" value="Delete" name="">
    </form>
    `;


// zoom in on popup
    marker.on('click', function(e){
      map.flyTo([e.latlng.lat, e.latlng.lng], 5, {duration: 0.5});
    });


    // set popup in center
    map.on('popupopen', function(e) {
      var px = map.project(e.target._popup._latlng);
      px.y -= e.target._popup._container.clientHeight/2;
      map.panTo(map.unproject(px),{animate: true});
    });

    marker.bindPopup(txt);
  }

}



      // User adding marker and removing marker, popups hardcoded

      let theMarker = {};

      map.on('click',function(e){
      lat = e.latlng.lat;
      lon = e.latlng.lng;

      // //Clears existing marker by placing elsewhere
      if (theMarker !== undefined) {
              map.removeLayer(theMarker);
        };



      //Add a marker to show where you clicked.
      theMarker = L.marker([lat,lon]).addTo(map).bindPopup(
    `<form action='/api/pins' method="POST" onSubmit="">
    <table>
    <tr>

      <td>
        <input type="text" placeholder="Title" name="title">
      </td>
    <tr>
      <td>
        <input type="text" placeholder="Description" name="description">
        <input type="hidden" value=${lon} name="lon">
        <input type="hidden" value=${lat} name="lat">
      </td>
    </tr>
      <tr>

      <tr>
      <td>
        <p name="lonLat" value="{[(lat).toFixed(3), (lon).toFixed(3)]}">Input this in Lat/Lon ${[(lat).toFixed(3), (lon).toFixed(3)]} </p>
        </tr>
      </tr>
      </td>
    </tr>
    <tr>
      <td>
        <input type="Submit" value="Add Pin" name="">

      </td>
    </tr>
    </table>
  </form>
    `).openPopup();
      });



      // <input type="Submit" value="Delete" name="">
