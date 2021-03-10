const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session')

module.exports = (db) => {
  router.get("/", (req, res) => {
    const username = req.session.user_id;
    const templateVars = {username}


    res.render("logged-in", templateVars);
  });
  router.post("/", (req, res) => {
    console.log('req.body: ', req.body)
    const username = req.body.username;
    console.log('username: ', username);
    db.query(`SELECT * FROM users
    WHERE name = 'Bob';`)

    .then(data => {
          req.session.user_id = username
          const templateVars = {username}
          res.render('logged-in', templateVars);
        })
    .catch(err => {
      res
          .status(403)
          .send('error 403: username not found');
      });

  });
  return router;
};



