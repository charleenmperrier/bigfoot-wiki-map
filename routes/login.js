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
      req.session.user_id = req.body.username;
    res.redirect('/login')});
  // router.get("/logout", (req, res) => {
  //     // req.session.user_id = req.params.id;
  //     req.session = null;
  //     res.redirect('/');

  //   });

  return router;
};

