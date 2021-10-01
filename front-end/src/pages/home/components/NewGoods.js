import React from 'react';
import useStyle from '../styles'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import classnames from 'classnames'
import {newGoodsRequest} from "../../../api/api_goods";
import {toast} from "react-toastify";
import {
  setGoodsText as setGoods,
  updateHashTagList,
  useGoodsDispatch,
  useGoodsState, usePriceDispatch, usePriceState,
  setGoodsPrice as setPrice,
} from "../../../context/StoreContext";
import {useTranslation} from "react-i18next";
import {loginApi} from "../../../api/api_auth";

const NewGoods = ({updateGoods}) => {

  const inputFile = React.useRef();

  const {t} = useTranslation();

  const {goodsText: goods} = useGoodsState();
  const goodsDispatch = useGoodsDispatch();

  const {goodsPrice: price} = usePriceState();
  const priceDispatch = usePriceDispatch();





  const [imageFile, setImageFile] = React.useState();
  const [imagePath, setImagePath] = React.useState();


  const newGoodsClick = () => {
    const goodsText = goods;
    if (!goodsText)
      return;
    const goodsPrice = price;
    if (!goodsPrice)
      return;
    const formData = new FormData();
    formData.append("text", goodsText);
    formData.append("price", goodsPrice);
    if (imageFile)
      formData.append("image", imageFile);
    newGoodsRequest(formData, (isOk, data) => {
      if (!isOk)
        return toast.error(data);
      toast.success(t("success.newGoods"));
      updateGoods();
      setGoods(goodsDispatch, "");
      setPrice(priceDispatch, 0);
      setImagePath();
      setImageFile();
      if (goodsText.includes("#"))
        updateHashTagList(goodsDispatch);
    })
  };

  const getImage = () => {
    if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
      return localStorage.getItem("image");
    return "/images/person.png"
  };

  const onChangeImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePath(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const selectImg = () => {
    inputFile.current.click();
  };

  const classes = useStyle();



  return (
    <div className={classes.newGoods}>
      <Grid container>
        <img src={getImage()} style={{width: 60, height: 60, borderRadius: '50%'}}/>


        <input placeholder={"اطلاعات محصول و تخفیف ها ..."} className={classnames(classes.input)}
               value={goods} onChange={e => setGoods(goodsDispatch, e.target.value)}
        />


        <input type={"number"} placeholder={"قیمت"} className={classes.price}
               value={price} onChange={e => setPrice(priceDispatch, e.target.value)}
        />

        <input type={"file"} style={{display: 'none'}} ref={inputFile} onChange={onChangeImg}/>
      </Grid>
      {
        imagePath &&
        <div>
          <div style={{backgroundImage: `url(${imagePath})`}} className={classes.goodsImg}/>
        </div>
      }
      <Grid container direction={"row-reverse"} style={{marginTop: 16}}>
        <Button variant={"contained"} color={"primary"}
                className={classes.newGoodsBtn} onClick={newGoodsClick}>{t("btn.goods")}</Button>
        <IconButton className={classes.newGoodsImgBtn} onClick={selectImg}>
          <img src={"/images/tweetpic.png"} className={classes.newGoodsImg}/>
        </IconButton>
      </Grid>
    </div>
  );
};

export default NewGoods;