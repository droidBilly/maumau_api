const Router = require("express").Router;
const router = new Router();
const Game = require("./model");
const { createGame } = require("../lib/game");



//Get all the game(test)
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


//Get game Id
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


//Create new game
router.post("/game", (req, res) => {
  const userid = req.body.userid;
  const game = createGame(userid);
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

//get the active card
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


//Join game as Player2
router.put("/game/:id/join", (req, res) => {
  const gameId = Number(req.params.id);
  const updates =  {
			userid_to_player2: req.body.userId,
		}

  Game.findById(gameId)
  .then(entity => {
    if (entity) {
      return entity.update(updates);
    } else {
        res.status(404);
        res.json({ message: "User not found, can't update." });
      }
      })
      .then(final => {
    // return update
    res.status(200);
    res.send({ message: "User with the id " + final.userid_to_player2 + " is added to game " + gameId });
  })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});



module.exports = router;
