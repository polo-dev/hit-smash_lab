const Hero = require('../model/hero');

exports.getHeroes = (req, res) => {
  Hero.find()
  .exec((err, heroes) => {
    if (err) { res.send(err); }
    res.json(heroes);
  });
}

exports.createHero = async (req, res) => {
  const hero = await new Hero(req.body).save();
  res.json(hero);
}