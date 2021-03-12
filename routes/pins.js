const express = require('express');
const router  = express.Router();

const { img, images } = require('../db/helpers/images');

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT *
    FROM pins
    ;`)
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

    db.query(`INSERT INTO pins (title, description, picture_url, lon, lat)
    VALUES ('${req.body.title}','${req.body.description}', '${img(images)}',${req.body.lon}, ${req.body.lat})
    RETURNING *
    ;`)
    .then(data => {
      res.redirect('/favourite')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  router.post('/:id/delete', (req,res) => {
    const username = req.session.user_id

    db.query(`
    DELETE
    FROM pins
    WHERE id = ${req.params.id}
    ;`)
    .then(data => {
      res.redirect('/favourite')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })


  return router;
};


