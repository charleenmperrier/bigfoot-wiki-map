const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {
    const username = req.session.user_id;
    console.log('fav user: ', username)
    db.query(`
    SELECT map_id, maps.name
    FROM favourites
    JOIN users ON user_id = users.id
    JOIN maps ON maps.id = map_id
    WHERE users.name LIKE '%${username}%';`)
    .then(data => {
      // const favs = data.rows;
      const username = req.session.user_id
          const templateVars = {
            username,
            favs: data.rows
          }
          console.log('tempV: ', templateVars)

      res.render('logged-in', templateVars)
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
      });

  });

  return router;
};

// %${username}%

// router.get("/", (req, res) => {
//   db.query(`SELECT * FROM maps;`)
//   .then(data => {
//     const username = req.session.user_id
//     const templateVars = {
//       username,
//       maps: data.rows
//     }
//     res.render('maps', templateVars);
//   })
