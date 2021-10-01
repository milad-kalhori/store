import React from 'react';
import {useTranslation} from "react-i18next";

const P404= () => {

  const {t}= useTranslation()

  return (
    <div>
      <h1 style={{paddingRight:350}}>404</h1>
      <p style={{paddingRight:340}}>{t("404_desc")}</p>
        <img src={'images/404.png'}  style={{width : 760}}/>
    </div>
  );
};

export default P404;