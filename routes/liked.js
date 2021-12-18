var express = require("express");
var router = express.Router();
const { Like } = require("../model/like");
const { authorizeFromCookie } = require("../utils/authorize");
const { authorize } = require("../utils/authorize");
const comModel = new Like();

router.get("/:expediteur", function (req, res) {
  console.log("GET /commentaire");
  return res.json(comModel.getAllgame(req.params.expediteur));
});

router.post("", authorizeFromCookie, function (req, res) {
  const jeu = comModel.vote(req.body);

  return res.json(jeu);
});

router.get("/game/:game", function (req, res) {
  console.log("GET /commentaire");
  return res.json(comModel.getEvaluation(req.params.game));
});

router.get("/votant/:game", function (req, res) {
  console.log("GET /commentaire");
  return res.json(comModel.getNbvotant(req.params.game));
});
module.exports = router;
