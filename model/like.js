"use strict";
const { parse, serialize } = require("../utils/json");

const jsonDbPath = __dirname + "/../data/likes.json";
var escape = require("escape-html");
const e = require("express");

class Like {
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

  vote(body) {
    const coms = parse(this.jsonDbPath);
    const newComs = {
      id: this.getNextId(),
      jeu: escape(body.jeu),
      expediteur: escape(body.expediteur),
      evaluation: escape(body.evaluation),
    };
    coms.push(newComs);
    serialize(this.jsonDbPath, coms);
    return newComs;
  }

  getAll() {
    const commentaires = parse(this.jsonDbPath);
    return commentaires;
  }
  getAllgame(expediteur) {
    const commentaires = parse(this.jsonDbPath);

    const all = commentaires.filter(
      (commentaire) => commentaire.expediteur == expediteur
    );
    const all2 = all.filter((commentaire) => commentaire.evaluation >= 5);
    return all2;
  }

  getEvaluation(game) {
    const commentaires = parse(this.jsonDbPath);
    const jeux = commentaires.filter((jeu) => jeu.jeu == game);
    var somme = 0;

    jeux.forEach((element) => {
      somme += parseInt(element.evaluation);
    });

    return somme;
  }

  getNbvotant(game) {
    const commentaires = parse(this.jsonDbPath);
    const jeux = commentaires.filter((jeu) => jeu.jeu == game);
    var somme = 0;
    jeux.forEach((element) => {
      somme += parseInt(1);
    });
    return somme;
  }
}

module.exports = { Like };
