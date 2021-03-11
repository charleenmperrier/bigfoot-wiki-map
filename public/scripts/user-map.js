// Map Element on page

let map = L.map('map', {
  minZoom: 2,
  maxZoom: 10,
  worldCopyJump: true,

}).setView([30, 0], 2);

// dynamic constraint
let bounds = map.getBounds().pad(0.65)
map.setMaxBounds(bounds);

// console.log(map.getBounds())

const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const tileUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wpKyMC536a0ZlXqAX7iu';


const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

getData()

// Toggle switch of Heart to Red Heart
// function myFunction(x) {
//   x.classList.toggle("fa-fa-heart");
// }

// zoom out on popup
function zoomOut() {
    map.flyTo([55, -101.2996], 4, {duration: 0.5}).closePopup();
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

    let txt = `<h1> ${item.title} </h1> <div> <img src= "${item.picture_url}" height="150px" width="auto"/> <p id="description"> ${item.description} </p> <p id="longLat">location at ${[(item.lat).toFixed(2), (item.lon).toFixed(2)]} </p><button onclick="zoomOut()"> zoom out </button> `;


// zoom in on popup
    marker.on('click', function(e){
      map.flyTo([e.latlng.lat, e.latlng.lng], 5, {duration: 0.5});

    });

    marker.bindPopup(txt);
  }
  // console.log(data)
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
    `<form action="insert" method="POST">
    <table>
    <tr>

      <td>
        <input type="text" placeholder="Location" name="title">
      </td>
    <tr>
      <td>
        <input type="text" placeholder="Description" name="description">
      </td>
    </tr>
      <tr>
      <td>
        <p name="lonLat" value="{[(lat).toFixed(3), (lon).toFixed(3)]}">location at ${[(lat).toFixed(3), (lon).toFixed(3)]} </p>
      </tr>
      </td>
    </tr>
    <tr>
      <td>
        <input type="Submit" value="Add Pin" name="">
        <input type="Submit" value="Add Map" name="">
        <input type="Submit" value="Delete" name="">
      </td>
    </tr>
    </table>
  </form>
    `).openPopup();
      });



      //old backup code
      // image source format
      // <img src= ${'"'+item.picture_url+'"'} height="150px" width="auto"/>


    //   <div class="marker-comment">
    //   <input id="mapID" type="name" placeholder="Location"/>
    //   <input id="name" type="date" placeholder="Date"/>

    //   <input id="description" type="text" placeholder="Description"/>
    //   <p id="lonLat">location at ${[(lat).toFixed(3), (lon).toFixed(3)]} </p>
    // </div>

    // <div>
    // <button type="submit" class="btn btn-primary">save location</button></form>

    // <button type="submit" class="btn btn-primary">delete location</button></form>
    // </div>
