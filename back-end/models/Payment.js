const mongoose = require('mongoose');


const basketSchema = new mongoose.Schema({
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

const schema = new mongoose.Schema({
    user: {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        username : String,
    },
    basket : basketSchema,
    paymentCode : String,
    success : {
        type : Boolean,
        default : false,
    },
    amount : Number,
    refId : String
});


const model = mongoose.model('Payment', schema);

module.exports = model;

