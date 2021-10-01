const jwt = require('jsonwebtoken');
const config = require('config');
const User = require("../models/User")
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
    });

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        User.findById(req.user._id).then(user => {
            if (user) {
                if (user.role==="admin"){
                    next();
                }else{
                    console.log("you dont admin")
                }
            }
            else
                res.status(401).json({
                    message: 'اطلاعات کاربری شما یافت نشد',
                    success: false,
                });
        })
    } catch (ex) {
        res.status(401).json({
            message: 'اطلاعات کاربری شما یافت نشد',
            success: false,
        });
    }
}