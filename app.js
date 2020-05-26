const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var corsOptions = {
  origin: "http://localhost:8081"
};
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to loan application." });
});
//use sessions for tracking logins
app.use(session({
    secret: 'session',
    resave: true,
    saveUninitialized: false,
   // store: new MongoStore({mongooseConnection: db})
}));
require("./routes/")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
