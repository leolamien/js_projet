var express = require("express");
var router = express.Router();
const { Jeux } = require("../model/jeux");
const { authorizeFromCookie } = require("../utils/authorize");
const { authorize } = require("../utils/authorize");

const jeuModel = new Jeux();

router.get("/", function (req, res) {
  console.log("req.params", req.query);
  const gameName = req.query ? req.query["name"] : undefined;

  const jeux = jeuModel.getAll();
  if (!gameName) return res.json(jeuModel.getAll());
  else {
    res.json(jeuModel.getOneByName(gameName));
  }
});

router.get("/:name", function (req, res) {
  console.log(`GET /jeux/${req.params.name}`);

  const jeu = jeuModel.getOneByName(req.params.name);

  if (!jeu) return res.status(404).end();

  return res.json(jeu);
});

router.post("/", authorizeFromCookie, function (req, res) {
  console.log("POST /jeux");

  if (
    !req.body ||
    (req.body.hasOwnProperty("name") && req.body.name === 0) ||
    (req.body.hasOwnProperty("age_rating") && req.body.age_rating === 0) ||
    (req.body.hasOwnProperty("category") && req.body.category.length === 0) ||
    (req.body.hasOwnProperty("cover") && req.body.cover.length === 0) ||
    (req.body.hasOwnProperty("first_release_date") &&
      req.bodyfirst_release_date === 0) ||
    (req.body.hasOwnProperty("involved_companies") &&
      req.body.involved_companies.length === 0) ||
    (req.body.hasOwnProperty("multiplayer_modes") &&
      req.body.multiplayer_modes.length === 0) ||
    (req.body.hasOwnProperty("platforms") && req.body.platforms.length === 0) ||
    (req.body.hasOwnProperty("summary") && req.body.summary.length === 0) ||
    (req.body.hasOwnProperty("url") && req.body.url.length === 0)
  )
    return res.status(400).end();

  const jeu = jeuModel.addOne(req.body);

  return res.json(jeu);
});

router.delete("/delete/:name", authorizeFromCookie, function (req, res) {
  console.log(`DELETE /games/${req.params.id}`);
  if (req.user.username !== "admin") return res.status(403).end();
  const jeu = jeuModel.deleteOne(req.params.name);
  if (!jeu) return res.status(404).end();
  return res.json(jeu);
});

router.put("/update/:name", authorizeFromCookie, function (req, res) {
  console.log(`PUT /jeux/${req.params.id}`);
  if (
    !req.body ||
    (req.body.hasOwnProperty("name") && req.body.name === 0) ||
    (req.body.hasOwnProperty("age_rating") && req.body.age_rating === 0) ||
    (req.body.hasOwnProperty("category") && req.body.category.length === 0) ||
    (req.body.hasOwnProperty("cover") && req.body.cover.length === 0) ||
    (req.body.hasOwnProperty("first_release_date") &&
      req.bodyfirst_release_date === 0) ||
    (req.body.hasOwnProperty("involved_companies") &&
      req.body.involved_companies.length === 0) ||
    (req.body.hasOwnProperty("multiplayer_modes") &&
      req.body.multiplayer_modes.length === 0) ||
    (req.body.hasOwnProperty("platforms") && req.body.platforms.length === 0) ||
    (req.body.hasOwnProperty("summary") && req.body.summary.length === 0) ||
    (req.body.hasOwnProperty("url") && req.body.url.length === 0)
  )
    return res.status(400).end();
  if (req.user.username !== "admin") return res.status(403).end();

  const jeu = jeuModel.updateOne(req.params.name, req.body);
  if (!jeu) return res.status(404).end();
  return res.json(jeu);
});




router.get("/recommandations/:category", function (req, res) {
  console.log(`GET /jeux/${req.params.name}`);

  const jeu = jeuModel.getOneByCategory(req.params.category);

  if (!jeu) return res.status(404).end();

  return res.json(jeu);
});
module.exports = router;
