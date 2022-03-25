const mongoose = require('mongoose')
const superheroSchema = mongoose.Schema({

  superHero:{
    type: String,
    require: true,
  },
  realName:{
    type: String,
    require: true,
  },
  features:{
    type: Object,
    require: true,
    universe:{
      type: String,
      require: true,
    },
    superPower:{
      type: Array,
      require: true,
    },
  },
  superHero_sideKick:{
    type: Object,
    require: true,
    sideKick:{
      type: String,
      require: true,
    },
    superPower_sideKick:{
      type: Array,
      require: true,
    },
  }


})

module.exports = mongoose.model('SuperHeroCollection', superheroSchema)