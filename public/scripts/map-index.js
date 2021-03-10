// $(() => {

// loadData()

// });


// const renderTweets = (tweets) => {
//   $("#tweets-container").empty();
//   for (let tweet of tweets) {
//     $("#tweets-container").append(getData(tweet));
//   }
// };


// async function getData() {
//   const response = await fetch('/api/pins');
//   const data = await response.json();
//   for (item of data.pins) {
// `
//   <table style="width:100%">
//   <tr>
//     <th>Title</th>
//     <th>Location</th>
//     <th>Description</th>
//   </tr>
//   <tr>
//     <td>${item.title}</td>
//     <td>${[(item.lat).toFixed(2), (item.lon).toFixed(2)]}</td>
//     <td>${item.description}</td>
//   </tr>

// </table>

// `

//   }
//   console.log(data)
// }


// const loadtweets = () => {
//   $.ajax("/tweets", {
//     method: "GET",
//     dataType: "JSON",
//     success: function(tweets) {
//       renderTweets(tweets);
//     }
//   });
// };


// const mapData = document.querySelector("#map-index > tbody");




// function loadPins () {
//   const request = new XMLHttpRequest()

//   request.open("get", "/api/pins");
//   request.onload = () => {
//     try {

//       const json = JSON.parse(request.responseText);
//       populatePins(json);

//     } catch (e) {
//       console.warn("couldn't load")
//     }

//   };
//   request.send()
// }


// function populatePins (json) {

//   // console.log(json)
//   //clear table
//   while (mapData.firstChild) {
//     mapData.removeChild(mapData.firstChild);
//   }

//   //populate table
//   json.forEach((row) => {
//     const tr = document.createElement("tr");


//     row.forEach((cell) => {
//       const td = document.createElement("td")
//       td.textContent = cell;
//       tr.appendChild(td);
//     });

//     mapData.appendChild(tr);
//   })

// }


// document.addEventListener("DOMContentLoaded", () => { loadPins(); });
