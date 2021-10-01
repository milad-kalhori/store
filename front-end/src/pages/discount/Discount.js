import React, {useEffect} from 'react';
import useStyle from "../home/styles";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import GoodsList from "../home/components/GoodsList";
import {getGoodsByHashTagRequest} from "../../api/api_goods";
import {toast} from "react-toastify";
import {setGoodsList, useGoodsDispatch, useGoodsState} from "../../context/StoreContext";
import {useLocation} from 'react-router-dom';

const Discount = (props) => {

  const location = useLocation();
  const {goodsList} = useGoodsState();
  const goodsDispatch = useGoodsDispatch();

  useEffect(() => {
    getGoodsByHashTagRequest(props.match.params.hashtag, (isOk, data) => {
      if (!isOk)
        return toast.error(data.message);
      setGoodsList(goodsDispatch, data);
    })

 }, [location]);


  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Header title={props.match.params.hashtag} icon={<img src={"/images/discount.png"}/>}/>
      <Divider className={classes.divider}/>
      <GoodsList data={goodsList}/>
    </div>
  );
};

export default Discount;