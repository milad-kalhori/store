const mongoose = require('mongoose');


const hashTagSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 1
    }
  },
);

const hashTag = mongoose.model('HashTag', hashTagSchema);

module.exports = hashTag;