module.exports = function(err , req , res , next) {
    console.log(err);
    res.json({
        success: false,
        message: 'Something failed!'
    });
}