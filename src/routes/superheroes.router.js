const express = require('express')
const superheroRouter = express.Router()
const Boom = require('@hapi/boom')
const superheroSchema = require('../models/superheroModel')
const superHeroService = require('../services/superheroes.service')
const service = new superHeroService();


/* POST: http://localhost:5000/api/v1/superheroes/superhero */
superheroRouter.post('/superhero', async (req, res) => {
  const superhero = superheroSchema(req.body);

  await service
    .createSuperhero(superhero)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/* GET:  http://localhost:5000/api/v1/superheroes*/
superheroRouter.get('/', async (req, res) => {

  await service
    listSuperheroes()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/* GET{:id}:  http://localhost:5000/api/v1/superheroes/superheroId */
superheroRouter.get('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;

  await service
    .showSuperhero(superheroId)
    .then((data) => res.status(302).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/* PUT{:id}: http://localhost:5000/api/v1/superheroes/superheroId */
superheroRouter.put('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  const { superHero, realName, features = { universe, superPower },
                      superHero_sideKick = { sideKick, superPower_sideKick } } = req.body;
  await service
    .editSuperhero(superheroId, superHero, realName, features, superHero_sideKick)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(304).json({ message: err }));
});

/* DELETE{:id}: http://localhost:5000/api/v1/superheroes/superheroId */
superheroRouter.delete('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;

  await service
  .removeSuperHero(superheroId)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = superheroRouter;