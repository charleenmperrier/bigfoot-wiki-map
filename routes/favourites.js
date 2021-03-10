const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {
    db.query(`SELECT map_id FROM favourites WHERE user_id = 3;`)
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
      });

  });

  return router;
};
