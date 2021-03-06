const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

module.exports = (db) => {
  router.post("/", (req, res) => {
    const username = req.body.username;

    db.query(`
    SELECT name
    FROM users
    WHERE name LIKE '%${username}%'
    ;`)
      .then(data => {
        if (data.rowCount !== 1) {
        res.redirect("/error");
        return;
        }
        req.session.user_id = username;
        res.redirect('/maps');
      })
      .catch(err => {
        res
        .status(403)
        .send('error 403: username not found');
        });
  });

  router.get("/", (req, res) => {
    const username = req.session.user_id;
    const templateVars = {username};
    res.render("logged-in", templateVars);
  });

  return router;
};



