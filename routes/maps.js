
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
    db.query(`SELECT *
    FROM maps
    ;`)
      .then(data => {
        const username = req.session.user_id;
        const templateVars = {
          username,
          maps: data.rows
        };
        res.render('maps', templateVars);
      })
  });


  //new query where map id = id
  router.get("/:id", (req, res) => {
    const username = req.session.user_id;
    const mapID = req.params.id;

    db.query(`SELECT *
    FROM maps
    WHERE id = ${mapID}
    ;`)
      .then(data => {
        const templateVars = {
          username,
          mapID,
          allmaps: data.rows
        };
        res.render("maps_show", templateVars);
      })
  })


  router.post("/", (req, res) => {
    const username = req.session.user_id

    db.query(`
    INSERT INTO maps (name, lon, lat, user_id)
    VALUES ('${req.body.title}', ${req.body.lon}, ${req.body.lat},
    (SELECT id FROM users WHERE name = '${username}'))
    ;`)
      .then (data => {
        res.redirect('/maps')
      });
  });

  router.post('/:id/delete', (req,res) => {
    const mapID = req.params.id

    db.query(`
    DELETE
    FROM maps
    WHERE id = ${mapID}
    ;`)
      .then(data => {
        const favMap = data.rows;
        res.redirect('/favourite')
      })

  });
  return router;
};


