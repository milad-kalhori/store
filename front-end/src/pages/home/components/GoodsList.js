import React from 'react';
import Goods from "./Goods";

const GoodsList = ({data}) => {
  return (
    <div>
      {data.map(goods => <Goods data={goods} />)}
    </div>
  );
};

export default GoodsList;