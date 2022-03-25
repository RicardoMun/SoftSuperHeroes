const { json } = require('express');
const express = require('express');
const superheroService = require('../services/superhero_v2.service');
const superheroModel = require('../models/superhero_v2.model');
const superherov2Router = express.Router();
const service = new superheroService();

/*
201: Creado
200: Listado
302: Encontrado
404: No encontrado */

superherov2Router.post('/superhero', async (req, res) => {
  const superherov2 = superheroModel(req.body);

  await service
    .createSuperHero(superherov2)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superherov2Router.get('/', async (req, res) => {
  await service
    .listSuperHero()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superherov2Router.get('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;

  await service
    .showSuperHero(superheroId)
    .then((data) => res.status(302).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

superherov2Router.put('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  const { superHero, realName, superPower } = req.body;

  await service
    .editSuperHero(superheroId, superHero, realName, superPower)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(304).json({ message: err }));
});

superherov2Router.delete('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  await service
    .removeSuperHero(superheroId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

module.exports = superherov2Router;
