const Router = require("express").Router;
const router = new Router();
const Game = require("./model");
const { createGame } = require("../lib/game");




router.get("/game", (req, res) => {
  const games = Game.findAll()
    .then(games => {
      res.json(games);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.json({ message: "There was a server error" });
    });
});

router.get("/game/:id", (req, res) => {
  const gameId = req.params.id;
  Game.findById(gameId)
  .then(game => {
    if (game) {
      res.status(201);
      res.send(game);
    } else {
      res.status(404);
      res.json({ message: "Game not found" });
      }
    })
  .catch(err => {
    console.log(err);
    res.status(500);
    res.json({ message: "There was a server error" });
  });
});

router.post("/game", (req, res) => {
  const game = createGame();
  Game.create(game)
    .then(entity => {
      res.status(201)
      .send({
        id: entity.id
      });
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      });
    });
});

router.get("/game/:id/active", (req, res) => {
  const gameId = req.params.id;
  const game = Game.findById(gameId)
  .then(game => {
    if (game) {
      res.status(201);
      res.send({
        active: game.active
      });
    } else {
      res.status(404);
      res.json({ message: "Game not found" });
      }
    })
  .catch(err => {
    console.log(err);
    res.status(500);
    res.json({ message: "There was a server error" });
  });
});


module.exports = router;
