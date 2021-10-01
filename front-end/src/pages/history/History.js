import React, {useEffect, useState} from 'react';
import {getUsers} from "../../api/api_goods";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import useStyle from "../home/styles";
import Header from "../../components/header/Header";
import Divider from "@material-ui/core/Divider";
import HistoryIcon from '@material-ui/icons/History';
import Typography from "@material-ui/core/Typography";


const History = () => {

    const {t} = useTranslation();
    const classes = useStyle();

    const [users,setUsers] = useState([]);




    useEffect(() => {
        getUsers((isOk, data) => {
            if (!isOk)
                return toast.error(t("error.userFetchError"));
            setUsers(data)
        })

    }, []);


    return (
        <div>
            <Header  title={"سوابق خرید"} icon={<HistoryIcon/>}/>
            <Divider className={classes.divider} />
                {
                    users.map((item, index) => {

                        if (item.role !== 'user') return

                        let hl = item.history.length;
                        let g = [];
                        let i; let j;
                        let gs = [];
                        for (i = 0;i<hl;i++) {

                            let gl = item.history[i].goods.length;

                            for(j = 0 ;j<gl;j++) {
                                g[j]= item.history[i].goods[j].text;
                                gs.push(g[j]);
                            }
                        }

                            return (
                                <div>
                                    <Typography> نام کاربر : {item.name} </Typography>
                                    <Typography> سوابق خرید : </Typography>
                                    <Typography> {gs}</Typography>
                                    {index !== users.length - 1 &&
                                    <Divider style={{marginLeft: -24, marginRight: -24}}/>
                                    }
                                </div>)


                    })
                }

            <Divider style={{marginLeft: -24, marginRight: -24}}/>
        </div>
    );
};

export default History;