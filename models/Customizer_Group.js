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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shopifyProduct'
    }
  ],
  tabs: [
    {
      name: {
        type: String,
        required: true
      },
      sections: [
        {
          name: {
            type: String,
            required: true
          },
          products: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'shopifyProduct'
            }
          ]
        }
      ]
    }
  ]
});

module.exports = Customizer_Group = mongoose.model(
  'customizerGroup',
  Customizer_Group_Schema
);
