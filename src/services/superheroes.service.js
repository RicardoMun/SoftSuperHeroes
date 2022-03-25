const superheroModel = require('../models/superheroModel');

class superHeroService {
 /* Promesas y funciones asincrónicas
  Una funcion asincronica devuelve una promesa */

  async createSuperhero(superhero) {
    superhero.save()
    return superhero
  }

  async listSuperheroes() {
    return superheroModel.find()
  }

  async showSuperhero(superheroId) {
    return superheroModel.findById({ _id: superheroId })
  }

  async editSuperhero(superheroId, superHero, realName, features, superHero_sideKick) {
    return superheroModel
      .findByIdAndUpdate({ _id: superheroId }, {superHero, realName, features, superHero_sideKick})
      .then(
        (superheroFind) => {
          if (!superheroFind) throw Error('No se encontró el superheroe')
          return superheroModel.updateOne(
            { superheroId },
            { realName, features, superHero_sideKick }
          )
        }
      )
  }

  async removeSuperhero(superheroId) {
    const superhero_remove = superheroModel.findById({ _id: superheroId })
    return superheroModel.deleteOne(superhero_remove);
  }
}

module.exports = superHeroService;