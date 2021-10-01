const Joi = require('joi');

function registerValidate(user) {
    const schema = {
        image : Joi.string(),
        role : Joi.string(),
        username : Joi.string().required(),
        name : Joi.string().required(),
        password : Joi.string().required(),

    };
    return Joi.validate(user , schema);
}

function loginValidate(user) {
    const schema = {
        username : Joi.string().required(),
        password : Joi.string().required(),
    };
    return Joi.validate(user , schema);
}

module.exports = {
    registerValidate,
    loginValidate,
};