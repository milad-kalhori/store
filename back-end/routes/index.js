const express = require('express');
const router = express.Router();
const GoodsController = require("../controllers/GoodsController");
const UserController = require("../controllers/UserController");
const {uploadImg} = require("../middleware/upload");
const auth = require('../middleware/auth');
const authStaff = require('../middleware/authStaff');
const authAdmin = require('../middleware/authAdmin');
const user = require('../middleware/user');


router.get('/', (req, res) => {
  res.send("salam")
});
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/uploadUserPhoto', [auth], uploadImg.single('image'), UserController.uploadUserPhoto);
router.get('/getProfile', [auth], UserController.getProfile);
router.post('/getAllGoods', [auth], GoodsController.getAllGoods);
router.get('/getAllUser', [auth], GoodsController.getAllUser);
router.post('/newGoods', [authStaff], uploadImg.single('image'), GoodsController.newGoods);
router.get('/getAllHashTags', [auth], GoodsController.getAllHashTags);
router.get('/likeGoods/:goodsId', [auth], GoodsController.likeGoods);;
router.get('/removeGoods/:goodsId', [auth], GoodsController.removeGoods);;

router.post("/updateBasket",[auth,user],UserController.updateBasket);
router.get("/getBasket",[auth,user],UserController.getBasket);

router.get("/checkoutBasket",[auth,user],UserController.checkoutBasket);
router.get("/verifyPayment",UserController.verifyPayment);
router.get("/payment/:paymentCode",UserController.getPaymentDetail);

router.get("/getHistory",[authAdmin],GoodsController.getAllUser);

router.post("/updateCoordinates",[auth,user],UserController.updateCoordinates);
router.get("/getCoordinates",[authAdmin],GoodsController.getAllUser);

router.get("/sendAllGoods",[authAdmin],GoodsController.sendAllGoods);

module.exports = router;
