const express = require('express');
const router  = express.Router();

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
    console.log("hello?", req.body)
    console.log(`
    INSERT INTO pins (title, description, lon, lat)
    VALUES (${req.body.title}, ${req.body.description}, ${req.body.lon[0]}, ${req.body.lat[0]})
    RETURNING *;
    `);
    db.query(`
    INSERT INTO pins (title, description, lon, lat)
    VALUES ('${req.body.title}', '${req.body.description}', ${req.body.lon}, ${req.body.lat})
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


