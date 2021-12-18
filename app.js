var express = require("express");
var path = require("path");
var cookieSession = require("cookie-session");
var logger = require("morgan");
var authsRouter = require("./routes/auths");
var jeuRouter = require("./routes/jeu");
var usersRouter = require("./routes/users");
var commentaireRouter = require("./routes/commentaires")
var likeRouter = require("./routes/liked");
var cors = require("cors");
let corsOptions = {
  origin: "http://localhost:8080",
};




var app = express();

let expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1h;
app.use(
  cookieSession({
    name: "user",
    keys: ["689HiHoveryDi79*"],
    cookie: {
      httpOnly: true,
      expires: expiryDate,
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/auths", cors(corsOptions),authsRouter);
app.use("/jeu", cors(corsOptions),jeuRouter);
app.use("/users", cors(corsOptions),usersRouter);
app.use("/commentaires", cors(corsOptions),commentaireRouter);
app.use("/liked",cors(corsOptions),likeRouter)


module.exports = app;
