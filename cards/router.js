const Router = require("express").Router;
const router = new Router();
const Cards = require("./model");

router.get("/cards", (req, res) => {
  const cards = Cards.findAll()
    .then(cards => {
      res.json(cards);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.json({ message: "There was a server error" });
    });
});

module.exports = router;
