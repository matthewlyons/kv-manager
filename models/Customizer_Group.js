const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Customizer_Group_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  instruments: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productStore'
      }
    }
  ],
  components: [
    {
      name: {
        type: String,
        required: true
      },
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productStore'
          }
        }
      ]
    }
  ]
});

module.exports = Customizer_Group = mongoose.model('customizerGroup', Customizer_Group_Schema);
