"use strict";
const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/commentaires.json";
var escape = require("escape-html");

class Commentaire {
  constructor(dbPath = jsonDbPath) {
    this.jsonDbPath = dbPath;
  }

  getNextId() {
    const coms = parse(this.jsonDbPath);
    let nextId;
    if (coms.length === 0) nextId = 1;
    else nextId = coms[coms.length - 1].id + 1;
    return nextId;
  }

  getDateHour() {
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    return `${day}/${month}/${year}     ${hour}:${min}`;
  }

  addOne(body) {
    const coms = parse(this.jsonDbPath);
    const newComs = {
      id: this.getNextId(),
      game: escape(body.game),
      message: escape(body.message),
      date: this.getDateHour(),
      expediteur: escape(body.expediteur),
      like: 0,
    };
    coms.push(newComs);
    serialize(this.jsonDbPath, coms);
    return newComs;
  }

  getGame(game) {
    const all = parse(this.jsonDbPath);
    return all.filter((commentaire) => commentaire.game == game);
  }

}

module.exports = { Commentaire };
