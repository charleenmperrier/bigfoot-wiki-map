const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {
    const username = req.session.user_id;
    // console.log('fav user: ', username)
    db.query(`
    SELECT map_id, maps.name
    FROM favourites
    JOIN users ON user_id = users.id
    JOIN maps ON maps.id = map_id
    WHERE users.name LIKE '%${username}%';`)
    .then(data => {
      const username = req.session.user_id
          const templateVars = {
            username,
            favs: data.rows
          }
      res.render('logged-in', templateVars)
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
      });
  });


  router.post('/', (req,res) => {
    // const mapID =
    const mapID = req.params;
    console.log("fav add: ", mapID)
    db.query(`INSERT INTO favourites (user_id, map_id)
    VALUES (2, 2)
    RETURNING *
    ;`)

    .then(data => {
      const favMap = data.rows;
      console.log('data fav: ', favMap)
      res.redirect('/favourite')
    })

  });

  router.post('/:id/delete', (req,res) => {
    const mapID = req.params.id
    console.log('mapID delete: ', mapID)
    db.query(`
    DELETE
    FROM favourites
    WHERE map_id = ${mapID}
    ;
    `)

    .then(data => {
      const favMap = data.rows;
      res.redirect('/favourite')
    })

  });

  return router;
};

