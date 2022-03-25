const mongoose = require('mongoose')
const personBillSchema = mongoose.Schema({

  name: {
    type: String,
    require: true,
  },

  lastName: {
    type: String,
    require: true,
  },

  dni: {
    type: String,
    require: true,
    unique: true,
  },

  address: {
    type: Object,
    require: true,
    city:{
      type: String,
      require: true
    },
    zip_code:{
        type: Number,
        require: true,
    },
    geo: {
      type: Array,
      require: true,
    },
  },
})

module.exports = mongoose.model('PersonBillCollection', personBillSchema)
