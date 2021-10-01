const mongoose = require('mongoose');
const moment = require('jalali-moment');


const goodsSchema = new mongoose.Schema({
    type: {
            staffId  : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            }
      },
    text: {
      type: String,
      required: true,
    },
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    hashTags: {type: [{type: String}], default: []},

    date: {
      type: String,
    },

      price: {type: Number, default: 0},
      total: {type: Number, default: 10},
      number: {type: Number, default: 0},
      count: {type: Number, default: 0},

  },
);

const goods = mongoose.model('Goods', goodsSchema);

module.exports = goods;