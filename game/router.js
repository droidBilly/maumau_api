const Router = require("express").Router;
const Games = require("./model");
const router = new Router();
const { createGame } = require("../lib/game")

// Send all games - only for testing
router.get("/games", (req, res) => {
  const games = Games.findAll()
    .then(cards => {
      res.json(games);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.json({ message: "There was a server error" });
    });
});

// Get game by id
router.get("/games/:id", (req, res) => {
  const gameId = req.params.id;
  const game = Games.findById(gameId)
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
      res.status(500).send({
        message: `Something went wrong`,
        err
      });
    });
});

//Create new game
router.post("/games", (req, res) => {
  const game = createGame()
  Games.create(game)
    .then(entity => {
      res.status(201)
      .send({
        id: entity.id
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});

// Get game by id
router.get("/games/:id/active", (req, res) => {
  const gameId = req.params.id;
  const game = Games.findById(gameId)
    .then(game => {
      if (game) {
        res.status(201).send({
         active: game.active  
        });
      } else {
        res.status(404);
        res.json({ message: "Game not found" });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Something went wrong`,
        err
      });
    });
});


module.exports = router
