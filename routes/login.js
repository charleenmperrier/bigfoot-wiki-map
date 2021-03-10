const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session')

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log('req.body: ', req.body)
    const username = req.body.username;
    console.log('username: ', username);
    db.query(`
    SELECT name
    FROM users
    WHERE name LIKE '%${username}%';`)
    .then(data => {
      if (data.rowCount !== 1) {
      // alert("whoops! username not found :(");

      }
      console.log('the query: ', data)
      console.log("row count: ", data.rowCount)
      console.log(username)
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

  router.get("/", (req, res) => {
    const username = req.session.user_id;
    const templateVars = {username}


    res.render("logged-in", templateVars);
  });

  return router;
};



