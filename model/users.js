"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { parse, serialize } = require("../utils/json");
var escape = require("escape-html");
const jwtSecret = "secrettest";
const LIFETIME_JWT = 24 * 60 * 60 * 1000;

const jsonDbPath = __dirname + "/../data/users.json";
const saltRounds = 10;
const defaultItems = [
  {
    username: "admin",
    password: "$2b$10$RqcgWQT/Irt9MQC8UfHmjuGCrQkQNeNcU6UtZURdSB/fyt6bMWARa",
  },
];

class Users {
  constructor(dbPath = jsonDbPath, items = defaultItems) {
    this.jsonDbPath = dbPath;
    this.defaultItems = items;
  }

  getOneByUsername(username) {
    const items = parse(this.jsonDbPath, this.defaultItems);
    const foundIndex = items.findIndex((item) => item.username == username);
    if (foundIndex < 0) return;

    return items[foundIndex];
  }

  async login(username, password) {
    const userFound = this.getOneByUsername(username);
    if (!userFound) return;
    const match = await bcrypt.compare(password, userFound.password);
    if (!match) return;

    const authenticatedUser = {
      username: escape(username),
      token: "Future signed token",
    };

    const token = jwt.sign(
      { username: authenticatedUser.username },
      jwtSecret,
      { expiresIn: LIFETIME_JWT }
    );

    authenticatedUser.token = token;
    return authenticatedUser;
  }

  async register(username, password) {
    const items = parse(this.jsonDbPath, this.defaultItems);
    const userFound = this.getOneByUsername(username);
    if (userFound) return;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newitem = {
      username: escape(username),
      password: escape(hashedPassword),
    };
    items.push(newitem);
    serialize(this.jsonDbPath, items);
    const authenticatedUser = {
      username: username,
      token: "Future signed token",
    };

    const token = jwt.sign(
      { username: authenticatedUser.username },
      jwtSecret,
      { expiresIn: LIFETIME_JWT }
    );

    authenticatedUser.token = token;
    return authenticatedUser;
  }

  async login(username, password) {
    const userFound = this.getOneByUsername(username);
    if (!userFound) return;

    const match = await bcrypt.compare(password, userFound.password);
    if (!match) return;

    const authenticatedUser = {
      username: username,
      token: "Future signed token",
    };

    const token = jwt.sign(
      { username: authenticatedUser.username },
      jwtSecret,
      { expiresIn: LIFETIME_JWT }
    );

    authenticatedUser.token = token;
    return authenticatedUser;
  }

  updateOne(idValue, body, idKey = "id") {
    const items = parse(this.jsonDbPath, this.defaultItems);
    const foundIndex = items.findIndex((item) => item[idKey] == idValue);
    if (foundIndex < 0) return;
    const updateditem = { ...items[foundIndex], ...body };
    items[foundIndex] = updateditem;

    serialize(this.jsonDbPath, items);
    return updateditem;
  }
  async updateOnes(username, body, idKey = "id") {
    const items = parse(this.jsonDbPath, this.defaultItems);
    const foundIndex = items.findIndex((item) => item.username == username);
    if (foundIndex < 0) return;
    const hashedPassword = await bcrypt.hash(body, saltRounds);
    body = hashedPassword;
    const updateditem = { ...items[foundIndex], ...body };
    items[foundIndex].password = hashedPassword;
    serialize(this.jsonDbPath, items);

    return updateditem;
  }

  async update(username, password) {
    const items = parse(this.jsonDbPath, this.defaultItems);
    const userFound = items.getOneByUsername(username);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    userFound.password = hashedPassword;

    serialize(this.jsonDbPath, userFound);
    return userFound;
  }
  async crypt(password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}

module.exports = { Users };
