const mongoose = require('mongoose')
const superhero_v2Schema = mongoose.Schema({


  superHero: {
    type: String,
    require: true,
    unique: true
  },

  realName: {
    type: String,
    require: true
  },

  superPower: {
    type: String,
    require: true
  },

})

module.exports = mongoose.model('superhero_v2_collection', superhero_v2Schema)