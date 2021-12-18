var express = require("express");
var router = express.Router();
const { Commentaire } = require("../model/commentaire");
const { authorizeFromCookie } = require("../utils/authorize");
const { authorize } = require("../utils/authorize");
const comModel = new Commentaire();

router.get("/:game",authorizeFromCookie, function (req, res) {
  console.log("GET /commentaire");
  return res.json(comModel.getGame(req.params.game));
});

router.post("",authorizeFromCookie, function (req, res) {
  if (
    !req.body ||
    (req.body.hasOwnProperty("message") && req.body.message.length === 0)
  )
    return res.status(400).end();
  const jeu = comModel.addOne(req.body);
  return res.json(jeu);
});

module.exports = router;
