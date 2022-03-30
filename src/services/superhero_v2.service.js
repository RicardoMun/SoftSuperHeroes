const superheroModel = require('../models/superhero_v2.model');
const Boom = require('@hapi/boom')

class superHeroService {
  /* Promesas y funciones asincrónicas
  Una funcion asincronica devuelve una promesa */

  async createSuperHero(superherov2) {
    superherov2.save()
    return superherov2
  }

  async listSuperHero() {
    return superheroModel.find()
  }

  /* Función que nos devuelve una promesa */
  find(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(superheroModel.find())
      }, 3000)
    })
  }

  async showSuperHero(superheroId) {
    return superheroModel.findById({ _id: superheroId })
  }

  async editSuperHero(superheroId, superHero, realName, superPower) {
    return superheroModel
      .findById({ _id: superheroId }, {superHero, realName, superPower})
      .then((superheroFind) => {
        if (!superheroFind) throw Boom.notFound('No se encontró el superheroe')
        return superheroMoodel.updateOne(
          { superheroId },
          { superHero, realName, superPower }
        )
      })
  }

  async removeSuperHero(superheroId) {
    const superhero_remove = superHeroModel.findById({ _id: superheroId })
    if (!superheroFind) throw Boom.notFound('No se encontró el superheroe')
    superheroModel.deleteOne(superhero_remove)
  }
}

module.exports = superHeroService;
