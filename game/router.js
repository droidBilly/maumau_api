const Router = require("express").Router;
const Games = require("./model");
const router = new Router();
const { createGame } = require("../lib/game")

// Send all games
router.get("/games", (req, res) => {
  const games = Games.findAll()
    .then(games => {
      games.sort(function (a, b) { return a.id - b.id;  })
      res.json(games.map(game => {
        return {
          id: game.id,
          player1: game.userid_to_player1
          }
      }))
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.json({ message: "There was a server error" });
    });
});

// Get game by id
router.get("/games/:gameId/:userId", (req, res) => {
  const userId = Number(req.params.userId)
  const gameId = req.params.gameId;
  const game = Games.findById(gameId)
    .then(game => {
      if (game) {
        if (userId === game.userid_to_player1) {
          res.status(201);
          res.send({
            active: game.active,
            cards_on_hand: game.player1
          })
        } else if (userId === game.userid_to_player2 ) {
          res.status(201);
          res.send({
            active: game.active,
            cards_on_hand: game.player2
          })
        }
        else {
          res.status(404);
          res.json({ message: "User not found" });
        }
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
  const userId = req.body.userId
  const game = createGame(userId)
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

//Join game as Player2
router.put("/games/:gameId/join", (req, res) => {
  const updates =  {
			userid_to_player2: req.body.userId
		}
  const gameId = req.params.gameId;
  const game = Games.findById(gameId)
  .then(entity => {
    if (entity) {
      return entity.update(updates);
    }
    else {
        res.status(404);
        res.json({ message: "User not found, can't update." });
      }
    })
    .then(final => {
      // return update
      res.status(200);
      res.send({
        message: "User with the id: " + final.userid_to_player2 + " added to game: " + final.id
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});


module.exports = router
