const express = require("express");
const exphbs = require("express-handlebars");
const port = process.env.PORT || 3002;
const db = require("./util/db");
const bodyParser = require("body-parser");
const router = require("./router");
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const path = require("path");

const app = express();

app.engine("handlebars", exphbs());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
db.connectDB();

passport.use(
  new Strategy(function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello irene!");
});

app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}`)
);
