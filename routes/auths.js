var express = require("express");
var router = express.Router();
const { Users } = require("../model/users");
const userModel = new Users();

router.post("/register", async function (req, res, next) {
  if (
    !req.body ||
    (req.body.hasOwnProperty("username") && req.body.username.length === 0) ||
    (req.body.hasOwnProperty("password") && req.body.password.length === 0)
  )
    return res.status(400).end();

  const authenticatedUser = await userModel.register(
    req.body.username,
    req.body.password
  );

  if (!authenticatedUser) return res.status(409).end();

  req.session.username = authenticatedUser.username;
  req.session.token = authenticatedUser.token;

  return res.json({ username: authenticatedUser.username });
});

router.post("/login", async function (req, res, next) {
  if (
    !req.body ||
    (req.body.hasOwnProperty("username") && req.body.username.length === 0) ||
    (req.body.hasOwnProperty("password") && req.body.password.length === 0)
  )
    return res.status(400).end();

  const authenticatedUser = await userModel.login(
    req.body.username,
    req.body.password
  );
  if (!authenticatedUser) return res.status(401).end();

  req.session.username = authenticatedUser.username;
  req.session.token = authenticatedUser.token;

  return res.json({ username: authenticatedUser.username });
});

module.exports = router;
