// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const morgan        = require('morgan');
const cookieSession = require('cookie-session')
// const cookieParser = require('cookie-parser')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
// app.use(cookieParser())
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const pinsRoutes = require("./routes/pins");
const usersRoutes = require("./routes/users");
const mapsRoutes = require('./routes/maps');
const loginRoutes = require('./routes/login')
const favRoutes = require('./routes/favourites')
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/pins", pinsRoutes(db));
app.use("/api/users", usersRoutes(db));
// app.use("/api/maps", mapsRoutes(db));
app.use('/login', loginRoutes(db));
app.use("/maps", mapsRoutes(db));
app.use("/favourite", favRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.redirect("maps");
// });
app.get("/", (req, res) => {
  const username = req.session.user_id;
    const templateVars = {username}
  res.render('index', templateVars)
})

//testing map constrain page
app.get("/test", (req, res) => {
  const username = req.session.user_id;
  const templateVars = {username}
  res.render("map-constrain", templateVars);
});

// app.get("/login", (req,res) => {
//   const username = req.session.user_id;
//   const templateVars = {username}
//   res.render("logged-in", templateVars);
// });


// Logged in page
// app.post("/login", (req, res) => {

//   console.log('req.body: ', req.body)
//     req.session.user_id = req.body.username;

//   res.redirect('/login')
// });
// app.post("/favourite", (req, res) => {
//   console.log('did it')
//   // const username = req.session.user_id;

//     // console.log("reqqq: ", req.body)
//     res.redirect('/favourite');
// });

app.get("/logout", (req, res) => {
  // req.session.user_id = req.params.id;
  req.session = null;
  res.redirect('maps');

});

app.get('/error', (req, res) => {
  res.render('error')
})

app.listen(PORT, () => {
  console.log(`Bigfoot is watching you from ${PORT}! 👀`);
});
