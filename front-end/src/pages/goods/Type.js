import React, {useEffect, useState} from 'react';
import useStyle from "../home/styles";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import GoodsList from "../home/components/GoodsList";
import ListIcon from '@material-ui/icons/List';
import {getGoodsByUserRequest} from "../../api/api_goods";
import {useLocation} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import {setGoodsList, useGoodsDispatch, useGoodsState} from "../../context/StoreContext";
import {toast} from "react-toastify";


const Type = (props) => {

  const location = useLocation();

  const {goodsList} = useGoodsState();
  const goodsDispatch = useGoodsDispatch();


  useEffect(() => {
    getGoodsByUserRequest(props.match.params.id, (isOk, data) => {
      if (!isOk)
        return toast.error(data.message);
      setGoodsList(goodsDispatch, data);
    });
  }, [location]);

  const {t} = useTranslation();
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Header title={props.match.params.name} icon={<ListIcon/>}/>
      <Divider className={classes.divider}/>
      {goodsList.length === 0 &&
      <Typography>{t("warn.noGoodsFromUser")}</Typography>
      }
      <GoodsList data={goodsList}/>
    </div>
  );
};


export default Type;