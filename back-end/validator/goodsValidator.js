const Joi = require('joi');

function goodsValidate(goods) {
    const schema = {
        image : Joi.string(),
        text : Joi.string().required(),
        price : Joi.number(),
        total : Joi.number(),
        number : Joi.number(),
        count : Joi.number(),

    };
    return Joi.validate(goods , schema);
}
module.exports = {
    goodsValidate,
};