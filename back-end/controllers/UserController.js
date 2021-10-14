const {registerValidate, loginValidate} = require("../validator/authvalidate");
const _ = require("lodash");
const bcrypt = require('bcrypt');
const config = require('config');
const User = require('../models/User');
const Payment = require("../models/Payment")
const Goods = require("../models/Goods");
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('00000000-0000-0000-0000-000000000000', true);

module.exports = new class UserController {
  async login(req, res) {
    const {error} = loginValidate(req.body);
    if (error) return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
    let user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).json({
      success: false,
      message: 'نام کاربری و رمز عبور همخوانی ندارند'
    });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({
      success: false,
      message: 'نام کاربری و رمز عبور همخوانی ندارند'
    });
    const token = user.generateAuthToken();
    await res.json({..._.pick(user, ['name', 'username', 'image','role','basket','history','coordinates']), 'x-auth-token': token});
  }

  async register(req, res) {
    const {error} = registerValidate(req.body);
    if (error) return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
    if ((await User.find({username: req.body.username})).length > 0)
      return res.status(400).json({
        success: false,
        message: "کاربری با این نام کاربری وجود دارد"
      });
    let user = new User(_.pick(req.body, ['username', 'name', 'password', 'image',"role",'basket','history','coordinates']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    await res.json({..._.pick(user, ['name', 'username', 'image','role','basket','history','coordinates']), 'x-auth-token': token});
  }

  async uploadUserPhoto(req, res) {
    if (req.file) {
      console.log(req.file.path);
      let filePath = req.file.path.slice(7);
      const imagePath = `${config.get('DOMAIN')}/` + filePath.replace(/\\/g, '/');
      // const imagePath = `${config.get('DOMAIN')}:${config.get('PORT')}/` + filePath.replace(/\\/g, '/');
      let profile = await User.findById(req.user._id);
      profile.image = imagePath;
      await profile.save();
      res.status(200).send({imagePath});
    } else
      return res.status(500).json({
        message: 'آپلود انجام نشد.',
        success: false
      })
  }

  async getProfile(req, res) {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({
      message: "اطلاعات کاربری شما یافت نشد"
    });
    console.log(user);
    await res.send({..._.pick(user, ['name', 'username', 'image','role','basket','history','coordinates']), 'x-auth-token': req.headers['x-auth-token']});
  }


  async updateBasket(req, res) {
    const basketBody = _.pick(req.body, ["staffId", "goods"]);
    if (!basketBody.goods)
      return res
          .status(400)
          .send({message: "حداقل یه دونه کالا باید برگردونی"});
    if (!basketBody.staffId)
      return res
          .status(400)
          .send({message: " نوع کالا رو هم باید بفرستی"});
    const user = await User.findById(req.user._id);
    if (!user)
      return res
          .status(401)
          .send({message: "شما کاربر لاگین شده نیستید"});


    user.basket = basketBody;
    const i = user.history.length;
    user.history[i] = basketBody;

    await user.save();
    res.send(200);
  }

  async getBasket(req, res) {
    const user = await User.findById(req.user._id);
    res.send(user.basket)
  }


  async checkoutBasket(req, res) {
    const user = await User.findById(req.user._id);
    const basket = user.basket;


    const amount = user.basket.goods.reduce((acc, item) => {
      return acc + (item.price * item.count);
    }, 0);

    const payment = new Payment({
      user: {
        _id: user._id,
        username: user.username,
      },
      basket,
      amount
    });
    const response = await zarinpal.PaymentRequest({
      Amount: amount, // In Tomans
      CallbackURL: 'http://localhost:8080/api/verifyPayment',
      Description: `پرداخت به Smart Store`,
      UserName: user.username,
    });


    payment.paymentCode = response.authority;
    await payment.save();


    const Goods2 = require("../models/Goods");
    const goods = await Goods2.find();
    const j = goods.length;

    goods[43].count = 0;


    for (let i=0 ; i<j;i++){
        goods[i].count = 0;
        await goods[i].save()
    }


    user.basket=undefined;
    await user.save();
    console.log(response);
    res.send({url: response.url});
  }



  async verifyPayment(req, res) {
    const paymentCode = req.query.Authority;
    const status = req.query.Status;
    const payment = await Payment.findOne({
      paymentCode
    });
    if (status === "OK") {
      const response = await zarinpal.PaymentVerification({
        Amount: payment.amount, // In Tomans
        Authority: paymentCode,
      });
      if (response.status === -21) {
        res.send('پرداخت پیدا نشد');
      } else {
        payment.refId = response.RefID;
        payment.success = true;
        await payment.save();
        res.send(`<div style="margin-left: 300px;margin-top: 650px"> <h1 >Verified! Ref ID: ${response.RefID}</h1>
         <button style="background-color:#87ceeb;margin-left: 140px;">
           <a style="color: black;  text-decoration: none;" href="http://localhost:3000/checkout/zarinpal/billSlip?paymentCode=${paymentCode}">رفتن به سایت اصلی </button> </div></a>`);
      }
    } else return res.send("پرداخت ناموفق")
  }


  async getPaymentDetail(req, res) {
    const paymentCode = req.params.paymentCode;
    const payment = await Payment.findOne({paymentCode})
    if (payment)
      res.send(payment);
    else res.status(404).send("پیدا نشد")
  }

  async updateCoordinates(req, res) {
    const coordinates = _.pick(req.body, ["coordinates"]);

    const user = await User.findById(req.user._id);
    if (!user)
      return res
          .status(401)
          .send({message: "شما کاربر لاگین شده نیستید"});


    user.coordinates.push(coordinates)

    await user.save();
    res.send(200);
  }

};

