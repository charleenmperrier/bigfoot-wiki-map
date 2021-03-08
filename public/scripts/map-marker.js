


let marker = L.marker([lat, lon], {
  // hover description
  title: "big foot sighting",

}).addTo(map).bindPopup(`<h1> ${title} </h1> <div> <img src= ${'"'+pictureUrl+'"'} height="150px" width="auto"/> <p id="description"> ${description} </p> <p id="longLat">location at ${[(lat).toFixed(3), (lon).toFixed(3)]} </p></div> `);
