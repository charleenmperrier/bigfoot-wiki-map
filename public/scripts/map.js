let map = L.map('map').setView([47, -101.2996], 5);
const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const tileUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=wpKyMC536a0ZlXqAX7iu';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);


getData()





async function getData() {
  const response = await fetch('/api/pins');
  const data = await response.json();
  console.log(data.pins)
  for (item of data.pins) {
    const marker = L.marker([item.lat, item.lon], {
      // hover description
      title: "big foot sighting",
    }).addTo(map);


    let txt = `<h1> ${item.title} </h1> <div> <img src= ${'"'+item.picture_url+'"'} height="150px" width="auto"/> <p id="description"> ${item.description} </p> <p id="longLat">location at ${[(item.lat).toFixed(2), (item.lon).toFixed(2)]} </p></div> `;

    marker.bindPopup(txt);
  }
  console.log(data)
}


