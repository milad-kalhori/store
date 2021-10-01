import React, {useCallback, useEffect, useState} from 'react';
import {Typography} from "@material-ui/core";
import {checkoutBasket, getBasket} from "../../api/api_goods";
import useStyle from '../home/styles'
import {toast} from "react-toastify";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {green} from "@material-ui/core/colors";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Header from "../../components/header/Header";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {useTranslation} from "react-i18next";


const Checkout = () => {

    const {t} = useTranslation();
    const classes = useStyle();

    const [basket,setBasket] = useState({});
    const [goods,setGoods] = useState([{
        id:1,
        text: "btrrtgrh",
        price: 5000,
        total:6,
        number:7,
        count:8
    }]);


    useEffect(() => {
        getBasket((isOk, data) => {
            if (!isOk)
                return toast.error(data);

            setBasket((basket) => {
                basket = data;
                return basket;
            });

            setGoods((goods) => {
                goods = data.goods;
                return goods;
            });

        });
    }, []);



    console.log(basket)

    function onSubmitForm(){
        checkoutBasket((isOk, data) => {
            if (!isOk)
                return toast.error(data);
            toast.success("صفحه زرین پال");
            localStorage.removeItem("bill");
            localStorage.setItem("url",data.url);
            window.location.assign("/checkout/zarinpal");
        });
    }

    function Barcode(){
        toast.success("صفحه ایجاد بارکد");
        window.location.assign("/checkout/qrcode-generate.html");

        //localStorage.setItem("QR","قیمت کل : 250000");
        // window.location.assign("https://kitset.ir/code/qrcode#result-qr");
    }


    return (
        <div>
            <Header  title={t("checkout")} icon={<AssignmentTurnedInIcon/>}/>
            <Divider className={classes.divider} />
            <Typography  className={classes.goodsItemName}>نوع کالا :    {basket.staffId}</Typography>
            <Divider style={{marginLeft: -24, marginRight: -24}}/>
            {goods.map((good) => (
                <div  key={good.id}>
                    <p className={classes.goodsItemName}> محصول :{good.text}</p>
                    <p className={classes.goodsItemName}> قیمت :{good.price}</p>
                    <p className={classes.goodsItemName}>تعداد کالا :{good.total}</p>
                    <p className={classes.goodsItemName}>تعداد خرید :{good.number}</p>
                    <p className={classes.goodsItemName}>تعداد سبد خرید :{good.count}</p>

                    <Divider style={{marginLeft: -24, marginRight: -24}}/>
                </div>

            ))}

            <p className={classes.goodsItemName}>نوع پرداخت</p>
            <button className={classes.Btn1} onClick={onSubmitForm}>پرداخت آنلاین</button>
            <button className={classes.Btn2} onClick={Barcode}>پرداخت حضوری</button>
            <Divider style={{marginLeft: -24, marginRight: -24}}/>
        </div>
    )
}

export default Checkout;