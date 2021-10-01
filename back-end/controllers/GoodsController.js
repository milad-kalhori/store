const {goodsValidate} = require("../validator/goodsValidator");
const _ = require("lodash");
const mongoose = require('mongoose')
const moment = require('jalali-moment');
const config = require("config")


module.exports = new class GoodsController {
  async getAllGoods(req, res) {
    const Goods = require("../models/Goods");
    if (req.body.user) {
      const goods = await Goods.find({user: new mongoose.Types.ObjectId(req.body.user)}).populate("user").sort({'date': -1}).limit(20);
      return res.send(goods);
    } else if (req.body.hashTag) {
      const goods = await Goods.find({hashTags: {$elemMatch: {$in: ["sword", req.body.hashTag]}}}).populate("user").sort({'date': -1}).limit(20);
      res.send(goods);
    } else {
      const goods = await Goods.find().sort({'date': -1}).populate("user").limit(20);
      res.send(goods);
    }
  }

  async newGoods(req, res) {
    const {error} = goodsValidate(req.body);
    if (error) return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
    const hashTags = req.body.text.includes("#") ? req.body.text.match(/#\S+/g).map(item => item.replace("#", "")) : [];
    const Goods = require("../models/Goods");
    const HashTag = require("../models/HashTags");
    const goods = new Goods({
      text: req.body.text,
      user: req.user._id,
      image: req.body.image,
      price: req.body.price,
      hashTags,
      date: moment(new Date()).locale('fa').format('YYYY-MM-DDTHH:mm:ss')
    });
    if (req.file) {
      let filePath = req.file.path.slice(7);
      const imagePath = `${config.get('DOMAIN')}/` + filePath.replace(/\\/g, '/');
      // const imagePath = `${config.get('DOMAIN')}:${config.get('PORT')}/` + filePath.replace(/\\/g, '/');
      goods.image = imagePath;
    }
    for (const item of hashTags) {
      const hashTag = await HashTag.findOne({text: item.toLowerCase()});
      if (!hashTag) {
        await new HashTag({text: item.toLowerCase()}).save();
      } else {
        hashTag.count += 1;
        await hashTag.save();
      }
    }
    await goods.save();
    res.status(200).send(_.pick(goods, ['type','text', "_id", 'image', 'hashTags', 'date','price','count','number','total']));
  }

  async likeGoods(req, res) {
    const goodsId = req.params.goodsId;
    const ObjectId = require('mongoose').Types.ObjectId;
    if (!ObjectId.isValid(goodsId)) return res.status(400).json({
      success: false,
      message: "کالا مورد نظر پیدا نشد"
    });
    const Goods = require("../models/Goods");
    const goods = await Goods.findById(goodsId);
    if (!goods) return res.status(404).json({
      success: false,
      message: "کالا مورد نظر پیدا نشد"
    });
    if(goods.total !== 0) {
      goods.number++;
      goods.count++;
      goods.total--;
    }
    await goods.save();
    res.status(200).json(_.pick(goods, ['type','text', "_id", 'user', 'image', 'hashTags','price','count','number','total']));
  }
  async removeGoods(req, res) {
    const goodsId = req.params.goodsId;
    const ObjectId = require('mongoose').Types.ObjectId;
    if (!ObjectId.isValid(goodsId)) return res.status(400).json({
      success: false,
      message: "کالا مورد نظر پیدا نشد"
    });
    const Goods = require("../models/Goods");
    const goods = await Goods.findById(goodsId);
    if (!goods) return res.status(404).json({
      success: false,
      message: "کالا مورد نظر پیدا نشد"
    });

    if(goods.number!== 0){
      goods.number--;
      goods.count--;
      goods.total++;
    }

    await goods.save();
    res.status(200).json(_.pick(goods, ['type','text', "_id", 'user', 'image', 'hashTags','price','count','number','total']));
  }


  async getAllUser(req, res) {
    const User = require("../models/User");
    const goods = await User.find().sort({'date': +1}).limit(20);
    return res.send(goods);
  }
  async getAllHashTags(req, res) {
    const HashTag = require("../models/HashTags");
    const goods = await HashTag.find().sort({'count': -1}).limit(20);
    return res.send(goods);
  }

  async sendAllGoods(req, res) {
    const Goods = require("../models/Goods");
      const goods = await Goods.find();
      return res.send(goods);
  }


};