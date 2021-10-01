import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import useStyle from '../styles'
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import StoreIcon from '@material-ui/icons/Store';
import {Link} from "react-router-dom";

import {
  likeGoods,
  removeGoods,
  setGoodsText,
  useGoodsState,
  useGoodsDispatch,
  usePriceDispatch
} from "../../../context/StoreContext";
import {getUsers, likeGoodsRequest, updateBasket} from "../../../api/api_goods";
import {removeGoodsRequest} from "../../../api/api_goods";
import {toast} from "react-toastify";
import {green} from "@material-ui/core/colors";
import MenuItem from "@material-ui/core/MenuItem";
import {useTranslation} from "react-i18next";

const Goods = ({data}) => {
  const {t, i18n} = useTranslation();


  const empty = ["1"] ;
  const [emp,setEmp] = useState([]);

  const goodsDispatch = useGoodsDispatch();


  const renderGoods = (text) => {
    return {__html: text.replace(/#\S+/g, "<a href='/tags/$&' style='color:cornflowerblue'>$&</a>")};
  };

  const getImage = () => {
    if (data.user.image)
      return data.user.image;
    else return "/images/person.png";
  };

  const handleLike = () => {
    likeGoodsRequest(data._id, (isOk, data) => {
      if (!isOk)
        return toast.error(data);
      likeGoods(goodsDispatch, data._id);

      changeBasketGood(data, data.count,data.total )

    });
  }
  const removeLike = () => {
    removeGoodsRequest(data._id, (isOk, data) => {
      if (!isOk)
        return toast.error(data);
      removeGoods(goodsDispatch, data._id);

      changeBasketGood(data, data.count,data.total )
    });
  }

  //////////////////// basket
  //  JSON.parse(localStorage.getItem("basket"))

  const BASKET = "basket";

  function readBasketGoods() {
    try {
      //{
      //     staffId : "233343fevdv43fwc30",
      //       godds : []
      // }
      const basket = JSON.parse(localStorage.getItem(BASKET));
      if (basket.staffId !== data.user._id) {
        localStorage.removeItem(BASKET);
        return null;
      } else return basket;
    } catch (e) {
      return null;
    }
  }

  function changeBasketGood(good, number,total) {
    let basket = readBasketGoods();
    if (!basket) {
      basket = {staffId: data.user._id, goods: [{...good, count: number,number: number,total:total}]};
      return localStorage.setItem(BASKET, JSON.stringify(basket));
    }
    if (number === 0)
      basket = deleteGoodFromBasket(good._id);
    else {
      let item = basket.goods.find(item => item._id === good._id);
      if (item){
        item.count = number;
        item.number = number;
        item.total = total;
      }
      else basket.goods.push({...good, count: 1});
    }
    localStorage.setItem(BASKET, JSON.stringify(basket));
  }

  function deleteGoodFromBasket(goodId) {
    const basket = readBasketGoods();
    try {
      const index = basket.goods.findIndex(item => item._id === goodId);
      return {...basket,goods: [...basket.goods.slice(0, index), ...basket.goods.slice(index + 1)]}
    } catch (e) {
      console.log(e);
      return basket;
    }
  }

  const updateBasketGoods = () => {

    let goodsBody = readBasketGoods();
    const staffId = goodsBody.staffId;


    if (goodsBody.goods.length === 0) {
      setEmp((emp)=>{
        emp = goodsBody.goods;
        return emp
      })
      return toast.error("سبد شما خالیه");
    }


      if (localStorage.getItem("role") !== "user") {
        return toast.error("شما کاربر عادی نیستید");
      }



    window.location.assign('http://localhost:3000/checkout');

    goodsBody = goodsBody.goods.map(item => ({
      text: item.text,
      price: item.price,
      total : item.total,
      count: item.count,
      number: item.number,
      image : item.image,
      hashTags : item.hashTags,
      type : item.type
    }));


    const body = {
      goods: goodsBody, staffId
    };

    updateBasket(body, (isOk, data) => {
      if (!isOk)
        return toast.error(data);
      console.log(data)
      toast.success("سبد شما ثبت شد");
    });

  }





  const classes = useStyle();
  return (
    <div className={classes.goodsItem}>

      <Grid container>
        <img src={getImage()} style={{height: 60, width: 60, borderRadius: '50%'}}/>
        <Grid item container direction={"column"} style={{flex: 1, marginRight: '1rem'}}>
          <Grid item container>
            <Typography className={classes.goodsItemName}>{data.user.name}</Typography>
            <Typography className={classes.goodsItemId}>{data.user.id}</Typography>
          </Grid>
          <Typography dangerouslySetInnerHTML={renderGoods(data.text)} className={classes.goodsText} component={"p"}/>
          <Typography> قیمت : {data.price} تومان </Typography>
          {
            data.image &&
            <div>
              <div style={{backgroundImage: `url(${data.image})`}} className={classes.goodsImg}/>
            </div>
          }


        </Grid>
      </Grid>

      <Grid container direction={"row-reverse"} style={{marginTop: 16}} alignItems={'center'}>



        {
          empty.map(() => {
            if (emp.length === 0) {
              return <IconButton className={classes.newGoodsImgBtn} onClick={updateBasketGoods}>
                  <img src={"/images/1x/outline_shopping_cart_black_24dp.png"} className={classes.newGoodsImg}/>
                </IconButton>
            } else {
              return <Link to={"/checkout"}>
                <IconButton className={classes.newGoodsImgBtn} onClick={updateBasketGoods}>
                  <img src={"/images/1x/outline_shopping_cart_black_24dp.png"} className={classes.newGoodsImg}/>
                </IconButton>
              </Link>
            }
          })
        }


        <IconButton className={classes.newGoodsImgBtn} onClick={handleLike}>
          <AddShoppingCartIcon style={{ color: green[500] }}/>
        </IconButton>
        <Typography className={classes.likeCount}>{data.count}</Typography>


        <IconButton className={classes.newGoodsImgBtn} onClick={removeLike}>
          <RemoveShoppingCartIcon color="secondary"/>
        </IconButton>

        <IconButton className={classes.newGoodsImgBtn} onClick={handleLike}>
          <StoreIcon color="primary"/>
        </IconButton>
        <Typography className={classes.likeCount}>{data.total}</Typography>

      </Grid>

    </div>
  );
}

export default Goods;
/*
  //retweet :

  const replayClick = () => {
    setGoodsText(goodsDispatch, data.text);
  }
*/
/*
<IconButton className={classes.newGoodsImgBtn} onClick={replayClick}>
     <img src={"/images/retweet.png"} className={classes.newGoodsImg}/>
</IconButton>
 */