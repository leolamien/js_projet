
"use strict";

const { parse, serialize } = require("../utils/json");
var escape = require("escape-html");
const jsonDbPath = __dirname + "/../data/jeux.json";

const defaultJeux = [
  {
    id: 1,
    name: "New World",
    age_ratings: 16,
    category: "MMORPG",
    cover:
      "https://images.ctfassets.net/j95d1p8hsuun/6gC9WvAePBYvVW3b4LHMTI/24f791f3de9d6e332a73ad8f82639f60/NW_TWITTERSHARE_600x300.jpg",
    first_release_date: "28 septembre 2021 ",
    involved_companies: " Amazon Game Studios",
    keywords: " MMO",
    multiplayer_modes: "oui",
    platforms: "PC",
    rating: 11,
    screenshots: false,
    summary:
      " Parcourez un MMO en monde ouvert palpitant plein de dangers et d’opportunités dans lequel vous vous forgerez une nouvelle destinée en tant qu’aventurier échoué sur l’île surnaturelle d’Aeternum. Des opportunités infinies de combattre, de rassembler des ressources et de fabriquer des objets vous attendent dans les contrées sauvages et les ruines de l’île. Exploitez des forces surnaturelles et maniez des armes d’une extrême précision dans un système de combat en temps réel et sans classes. Jouez en solitaire, en petite équipe ou au sein d’une énorme armée lors de combats en JcE et JcJ : le choix vous appartient.",
    url: " https://www.newworld.com/fr-fr/",
    videos: false,
  },
  {
    id: 2,
    name: "Forza Horizon 5",
    age_ratings: 7,
    category: "course",
    cover: "https://picfiles.alphacoders.com/478/478026.jpg",
    first_release_date: " 04 novembre 2021 ",
    involved_companies: " Playground Games",
    keywords: " course ",
    multiplayer_modes: "oui",
    platforms: "PC- XBOX SERIE X- XBOX ONE ",
    rating: 15.1,
    screenshots: false,
    summary:
      "Forza Horizon 5 est un jeu de course en monde ouvert développé par Playground Games. Il prend place dans les villes et magnifiques décors du Mexique. Le jeu propose aussi bien des courses solo que des épreuves compétitives et collaboratives en ligne.",
    url: "https://www.xbox.com/fr-BE/games/store/forza-horizon-5-edition-standard/9NKX70BBCDRN",
    videos: false,
  },

  {
    id: 3,
    name: "Battlefield 2042",
    age_ratings: 18,
    category: "FPS, Aventure, Action",
    cover: "https://picfiles.alphacoders.com/453/453967.jpg",
    first_release_date: " 19 novembre 2021 ",
    involved_companies: " DICE",
    keywords: "FPS ",
    multiplayer_modes: "oui",
    platforms: "PC- XBOX SERIE X- XBOX ONE, PS4, PS5 ",
    rating: 6,
    screenshots: false,
    summary:
      "Battlefield 2042 est un jeu de tir à la première personne multijoueur ancré dans un futur dystopique. Deux nations mènent une guerre totale, les Etats-Unis et la Russie.",
    url: "https://www.ea.com/fr-fr/games/battlefield/battlefield-2042",
    videos: false,
  },

  {
    id: 4,
    name: "It Takes Two",
    age_ratings: 12,
    category: "Aventure",
    cover: "https://picfiles.alphacoders.com/469/469565.jpg",
    first_release_date: "  26 mars 2021 ",
    involved_companies: " Electronic Arts",
    keywords: "Aventure ",
    multiplayer_modes: "oui multi local",
    platforms: "PC- XBOX SERIE X- XBOX ONE, PS4, PS5 ",
    rating: 18,
    screenshots: false,
    summary:
      "It Takes Two est un jeu de plateforme, d'action et de coopération sur PC. Au coeur d'une famille qui se déchire, vous incarnez les deux poupées qui prennent vie, représentant les parents qui vont devoir passer des épreuves dans l'imaginaire de leur fille.",
    url: "https://www.ea.com/fr-fr/games/it-takes-two",
    videos: false,
  },

  {
    id: 5,
    name: "NieR Replicant",
    age_ratings: 18,
    category: "Action, RPG",
    cover: "https://picfiles.alphacoders.com/129/129453.jpg",
    first_release_date: "  23 avril 2021 ",
    involved_companies: "Square Enix ",
    keywords: "Action, RPG",
    multiplayer_modes: "non",
    platforms: "PC- XBOX SERIE X- XBOX ONE, PS4, PS5 ",
    rating: 17.6,
    screenshots: false,
    summary:
      "Nier Automata est un jeu d'action de type RPG jouable en solo. Le titre amène le joueur dans un futur lointain où la Terre a été envahie par des formes extra-terrestres armées de bio-machines. Après s'être réfugiée sur la lune, l'humanité envoie sur leur planète natale des androïdes capable de lutter avec les extra-terrestres et reconquérir la planète.",
    url: "https://store.steampowered.com/agecheck/app/524220/",
    videos: false,
  },
];

class Jeux {
  constructor(dbPath = jsonDbPath, defaultItems = defaultJeux) {
    this.jsonDbPath = dbPath;
    this.defaultJeux = defaultItems;
  }

  getNextId() {
    const jeux = parse(this.jsonDbPath, this.defaulJeux);
    let nextId;
    if (jeux.length === 0) nextId = 1;
    else nextId = jeux[jeux.length - 1].id + 1;
    return nextId;
  }

  getAll(filterPredicate) {
    let jeux;
    jeux = parse(this.jsonDbPath, this.defaultJeux);
    if (filterPredicate) return jeux.filter(filterPredicate);
    else return jeux;
  }

  getOneByName(name) {
    const jeux = parse(this.jsonDbPath, this.defaultJeux);
    const foundIndex = jeux.findIndex((jeu) => jeu.name == name);
    if (foundIndex < 0) return;
    return jeux[foundIndex];
  }


  getOneByCategory(category) {
    const jeux = parse(this.jsonDbPath, this.defaultJeux);
    const tableauJeuParcategory=jeux.filter((jeu) => jeu.category == category);
    const tab= [];
    const foundIndex = jeux.filter((jeu) => jeu.category == category);
    let indice =Math.floor(Math.random() * foundIndex.length);
    let indiceRemoved =foundIndex.splice(indice,1)
    let indice2 =Math.floor(Math.random() * foundIndex.length);
    let indiceRemoved2 = foundIndex.splice(indice2,1)
    let indice3 =Math.floor(Math.random() * foundIndex.length);
    let indiceRemoved3 =foundIndex.splice(indice3,1)
    while(indice === indice2 || indice === indice3 || indice2 === indice3){
      indice =Math.floor(Math.random() * tableauJeuParcategory.length);
      indice2 =Math.floor(Math.random() * tableauJeuParcategory.length);
      indice3 =Math.floor(Math.random() * tableauJeuParcategory.length);
    }
    tab.push(tableauJeuParcategory[indice])
    tab.push(tableauJeuParcategory[indice2])
    tab.push(tableauJeuParcategory[indice3])
    //return `${foundIndex[indice].name}  ${foundIndex[indice2].name}  ${foundIndex[indice3].name}`;
    return tab
  } 
  addOne(body) {
    const jeux = parse(this.jsonDbPath, this.defaultJeux);
    const newJeu = {
      id: this.getNextId(),
      name: escape(body.name),
      age_ratings: escape(body.age_ratings),
      category: escape(body.category),
      cover: escape(body.cover),
      first_release_date: escape(body.first_release_date),
      involved_companies: escape(body.involved_companies),
      multiplayer_modes: escape(body.multiplayer_modes),
      platforms: escape(body.platforms),
      summary: escape(body.summary),
      url: escape(body.url),
    };
    jeux.push(newJeu);
    serialize(this.jsonDbPath, jeux);
    return newJeu;
  }

  deleteOne(name) {
    const jeux = parse(this.jsonDbPath, this.defaultJeux);
    const foundIndex = jeux.findIndex((jeu) => jeu.name == name);
    if (foundIndex < 0) return;
    const itemRemoved = jeux.splice(foundIndex, 1);
    serialize(this.jsonDbPath, jeux);

    return itemRemoved[0];
  }

  updateOne(name, body) {
    const jeux = parse(this.jsonDbPath, this.defaultJeux);
    const foundIndex = jeux.findIndex((jeu) => jeu.name == name);
    if (foundIndex < 0) return;
    const updatedJeu = { ...jeux[foundIndex], ...body };
    jeux[foundIndex] = updatedJeu;
    serialize(this.jsonDbPath, jeux);
    return updatedJeu;
  }

  updateRating(id, body) {
    const jeux = parse(this.jsonDbPath, this.defaultJeux);
    const foundIndex = jeux.findIndex((jeu) => jeu.id == id);
    if (foundIndex < 0) return;
    const updatedJeu = { ...jeux[foundIndex], ...body };
    jeux[foundIndex] = updatedJeu;
    serialize(this.jsonDbPath, jeux);
    return updatedJeu;
  }
}

module.exports = { Jeux };
