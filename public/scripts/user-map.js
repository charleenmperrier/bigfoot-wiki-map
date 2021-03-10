// Map Element on page
let map = L.map('map').setView([55, -101.2996], 4);
const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const tileUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wpKyMC536a0ZlXqAX7iu';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);


getData()

// Toggle switch of Heart to Red Heart
function myFunction(x) {
  x.classList.toggle("fa-fa-heart");
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

    let txt = `<h1> ${item.title} </h1> <div> <img src= ${'"'+item.picture_url+'"'} height="150px" width="auto"/> <p id="description"> ${item.description} </p> <p id="longLat">location at ${[(item.lat).toFixed(2), (item.lon).toFixed(2)]} </p></div> <i onclick="myFunction(this)" class="fa fa-heart"></i> `;



    marker.bindPopup(txt);
  }
  console.log(data)
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
      theMarker = L.marker([lat,lon]).addTo(map).bindPopup(`<input id="title" type="text"/>  <div> <img src="https://i.pinimg.com/originals/43/eb/96/43eb96608de40c2d0bd7fbf387d5df87.jpg" height="150px" width="auto"/> <input id="description" type="text"/>  <p id="longLat">location at ${[(lat).toFixed(3), (lon).toFixed(3)]} </p></div>  <button type="submit" class="btn btn-primary">save location</button></form>`).openPopup();
      });

