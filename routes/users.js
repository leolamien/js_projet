var express = require("express");
var router = express.Router();
const { Users } = require("../model/users");
const userModel = new Users();
const { authorizeFromCookie } = require("../utils/authorize");
const bcrypt = require("bcrypt");

router.put("/:username", authorizeFromCookie, function (req, res) {
  if (!req.body || !req.body.username) return res.sendStatus(400);
  if (req.params.username !== req.user.username) return res.sendStatus(403);
  const user = userModel.getOneByUsername(req.params.username);
  if (!user) return res.sendStatus(404);
  const users = userModel.updateOne(req.params.username, req.body, "username");

  return res.json(users);
});

router.put("/:username/test", authorizeFromCookie, function (req, res) {
  if (!req.body || !req.body.password) return res.sendStatus(400);
  if (req.params.username !== req.user.username) return res.sendStatus(403);
  const user = userModel.getOneByUsername(req.params.username);
  if (!user) return res.sendStatus(404);
  const users = userModel.updateOnes(req.params.username, req.body.password);
  return res.json(users);
});

module.exports = router;
