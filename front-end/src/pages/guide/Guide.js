import React from 'react';
import Header from "../../components/header/Header";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Divider from "@material-ui/core/Divider";
import useStyle from "../home/styles";
import {useTranslation} from "react-i18next";

const Guide = () => {


    const classes = useStyle();
    const {t} = useTranslation();

    return (
        <div>
            <Header title={("راهنمای سایت")} icon={<HelpOutlineIcon/>}/>
            <Divider className={classes.divider} />

           <video width={"780"} height={"500"} controls>
               <source src={"/videos/1.mp4"} type={"video/mp4"}/>
           </video>
        </div>
    );
};


export default Guide;