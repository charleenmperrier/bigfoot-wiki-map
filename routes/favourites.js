const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {
    const username = req.session.user_id;

    db.query(`
    SELECT map_id, maps.name
    FROM favourites
    JOIN users ON user_id = users.id
    JOIN maps ON maps.id = map_id
    WHERE users.name LIKE '%${username}%'
    ;`)
      .then(data => {
        db.query(`
        SELECT *
        FROM maps
        WHERE user_id = (SELECT id FROM users WHERE name = '${username}')
        ;`)
          .then(data2 => {
            const templateVars = {
              username,
              favs: data.rows,
              myMaps: data2.rows
            }
          res.render('logged-in', templateVars);
          })
          .catch(err => {
            res
            .status(500)
            .json({ error: err.message });
            });
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
  });


  router.post('/:mapID', (req,res) => {
    const mapID = req.params.mapID;
    const username = req.session.user_id;

    db.query(`
    INSERT INTO favourites (map_id, user_id)
    VALUES (${mapID}, (select u.id from users u where u.name ='${username}'))
    RETURNING *
    ;`)
    .then((data) => {
      const favMap = data.rows;
      res.redirect('/favourite');
    })
    });


  router.post('/:id/delete', (req,res) => {
    const mapID = req.params.id;

    db.query(`
    DELETE
    FROM favourites
    WHERE map_id = ${mapID}
    ;`)
    .then(data => {
      const favMap = data.rows;
      res.redirect('/favourite');
    })
  });

  return router;
};



