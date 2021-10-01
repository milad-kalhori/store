
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const moment = require('jalali-moment');


const basketSchema = new mongoose.Schema({
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        goods: [
            {
                text: String,
                image: String,
                price: Number,
                total: Number,
                number: Number,
                count: Number,

            }
        ]
});

const historySchema = new mongoose.Schema({
    staffId  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    goods : [
        {
            text : String,
            image : String,
            price : Number,
            total : Number,
            number : Number,
            count : Number,
        }
    ]
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: {type: String, unique: true},
    image: String,
    password: String,
    role: {
          type: String,
          enum: ['user', 'staff', 'admin'],
          default: 'user'
    },
    date: {
      type: String,
      default: moment().locale('fa').format('YYYY-MM-DDTHH:mm:ss')
    },

    basket : basketSchema,
    history : [historySchema],
    coordinates : []
  }
);


userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({
    _id: this._id,
  } , config.get('jwtPrivateKey'));
  return token;
};
const user = mongoose.model('User', userSchema);


module.exports = user;