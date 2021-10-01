import React, {useEffect, useState} from 'react';
import {getAllGoods, payment} from "../../api/api_goods";
import {toast} from "react-toastify";
import {Typography} from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import useStyle from "../home/styles";
import {useTranslation} from "react-i18next";
import {setGoodsList, useGoodsDispatch} from "../../context/StoreContext";


const BillSlip = () => {
    const {t} = useTranslation();
    const classes = useStyle();

    const goodsDispatch = useGoodsDispatch();

    const params = new URLSearchParams(window.location.search);
    const paymentCode = params.get("paymentCode");

    const [user,setUser] = useState({});
    const [ref,setRef] = useState();
    const [type,setType] = useState();
    const [amount,setAmount] = useState("");
    const [pay,setPay] = useState([{
        id:1,
        username:"a",
        text: "btrrtgrh",
        count:8,
        price: 5000,
        ref:"a"
    }]);


    useEffect(() => {
        payment(paymentCode,(isOk, data) => {
            if (!isOk)
                return toast.error(data);
            toast.success("از خرید شما متشکریم");
            setUser((user) => {
                user = data.user;
                return user;
            });
            setPay((pay) => {
                pay = data.basket.goods;
                return pay;
            });
            setRef((ref) => {
                ref = data.refId;
                return ref;
            });
            setType((type) => {
                type = data.basket.staffId;
                return type;
            });


            const amount2 = data.basket.goods.reduce((acc, item) => acc + (item.price * item.count), 0) + " تومان";

            setAmount((amount) => {
                amount = amount2;
                return amount;
            });

        })
    }, []);




    const QR = {"نام کاربری":user.username,"نوع کالا":type," مبلغ پرداختی":amount};
    localStorage.setItem("QR",JSON.stringify(QR));

    localStorage.setItem("bill",window.location.href);


    return (
        <div>
            <Header  title={t("billSlip")} icon={<MonetizationOnIcon/>}/>
            <Divider className={classes.divider} />
            <p className={classes.goodsItemName}> از خرید شما متشکریم </p>

            <p className={classes.goodsItemName}> نام کاربری :{user.username}</p>
            <p className={classes.goodsItemName}>  نوع کالا :{type}</p>
            <p className={classes.goodsItemName}>  مبلغ پرداختی :{amount}</p>
            <p className={classes.goodsItemName}> شماره پیگیری :{ref}</p>
            <Divider style={{marginLeft: -24, marginRight: -24}}/>
        </div>
    );
};

/*
            {pay.map((item) => (
                <div  key={item.id}>
                    <p className={classes.goodsItemName}> محصول :{item.text}</p>
                    <p className={classes.goodsItemName}> قیمت :{item.price}</p>
                    <p className={classes.goodsItemName}>تعداد سبد خرید :{item.count}</p>
                    <Divider style={{marginLeft: -24, marginRight: -24}}/>
                </div>
            ))}
    */

export default BillSlip;