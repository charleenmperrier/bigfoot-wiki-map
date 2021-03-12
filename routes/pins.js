const express = require('express');
const router  = express.Router();

const { img, images } = require('../db/helpers/images')

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM pins;`)
      .then(data => {
        const pins = data.rows;
        res.json({ pins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log("user id", req.params.user_id)
    console.log(`
    INSERT INTO pins (title, description, picture_url, lon, lat)
    VALUES (${req.body.title}, ${img(images)}, ${req.body.description}, ${req.body.lon}, ${req.body.lat})
    RETURNING *;
    `);
    db.query(`
    INSERT INTO pins (title, description, picture_url, lon, lat)
    VALUES ('${req.body.title}','${req.body.description}', '${img(images)}',${req.body.lon}, ${req.body.lat})
    RETURNING *;
    `)
    .then(data => {
      res.redirect('/maps')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};


