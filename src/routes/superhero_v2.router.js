const { json } = require('express')
const express = require('express')
const Boom = require('@hapi/boom')
const superheroService = require('../services/superhero_v2.service')
const superheroModel = require('../models/superhero_v2.model')
const superherov2Router = express.Router()
const service = new superheroService()

/*
201: Creado
200: Listado
302: Encontrado
404: No encontrado
*/

superherov2Router.post('/superhero', async (req, res) => {

  try {
    const superherov2 = superheroModel(req.body)

    const data = await service.createSuperHero(superherov2)
    res.status(201).json(data)
  } catch (error) {
    res.status(404).json({ message: error })
  }


});

superherov2Router.get('/', async (req, res, next) => {

  try {
    const data = await service.find()
    .listSuperHero()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }

});

superherov2Router.get('/:superheroId', async (req, res, next) => {

  try {
    const { superheroId } = req.params;

    const data = await service
      .showSuperHero(superheroId)
      res.status(302).json(data)
  } catch (error) {
    next(error)
  }

});

superherov2Router.put('/:superheroId', async (req, res, next) => {

  try {
    const { superheroId } = req.params;
    const { superHero, realName, superPower } = req.body;

    const data = await service
      .editSuperHero(superheroId, superHero, realName, superPower)
      res.status(200).json(data)
  } catch (error) {
    next(error)
  }

});

superherov2Router.delete('/:superheroId', async (req, res, next) => {

  try {
    const { superheroId } = req.params;

    const data = await service
      .removeSuperHero(superheroId)
      res.status(200).json(data)
  } catch (error) {
    next(error)
  }

});

module.exports = superherov2Router;
