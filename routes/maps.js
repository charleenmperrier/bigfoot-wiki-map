
const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session')

module.exports = (db) => {
  // router.get("/api", (req, res) => {
  //   db.query(`SELECT * FROM maps;`)
  //     .then(data => {
  //       const maps = data.rows;
  //       res.json({ maps });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM maps;`)
    .then(data => {
      const username = req.session.user_id
      const templateVars = {
        username,
        maps: data.rows
      }
      res.render('maps', templateVars);
    })
  });

  router.get("/dfgdf", (req, res) => {
    const username = req.session.user_id
    // console.log('my Maps: ', `SELECT id FROM maps WHERE user_id = ${username}`)
    db.query(`SELECT id
    FROM maps
    WHERE user_id = ${username}`)
    .then(data => {
      console.log('my data: ', data.rows)
      const templateVars = {
        myMaps: data.rows
      }
      res.render('logged-in', templateVars)
    });
  });

  //new query where map id = id
  router.get("/:id", (req, res) => {
    const username = req.session.user_id
    const mapID = req.params.id;
    db.query(`SELECT * FROM maps WHERE id = ${mapID}`)
      .then(data => {
        console.log("map info: ", data.rows)
        const templateVars = {
          username,
          mapID,
          allmaps: data.rows
        }
        console.log('template: ', templateVars)
        res.render("maps_show", templateVars)
      })
  })


  router.post("/", (req, res) => {
    const username = req.session.user_id
    console.log('map post: ', req.body)
    db.query(`
    INSERT INTO maps (name, lon, lat, user_id)
    VALUES ('${req.body.title}', ${req.body.lon}, ${req.body.lat},
    (SELECT id FROM users WHERE name = '${username}'))
    `)
    .then (data => {
      res.redirect('/maps')
    });
  });
  return router;
};




// (`insert into favourites (map_id, user_id) values (${mapID},
//   (select u.id from users u where u.name ='${username}')) RETURNING * ;`)

// pass map_id in get request
// make many RQs at one- call backend, get all lat/longs as map id, and then pass stuff to leaflet then redner
// call BE to get data, grab map, display, then populate map

// different maps-- zoomed in version based on certian marker (i.e. show map/pins from radius of pin)
// each map as a defined constraint
/**
 * bad idea? infinite tbh
 * by city? by x?
 * lat/long pass in a radius to show a map
 * ex: vancovuer
 *
 * define what a map is
 * how to people search? province? area? user_id?
 * determine functionality-- seems to be undefined? how are people searching? what maps to display?
 * "show maps where lon/lat is equal to chosen "
 */
