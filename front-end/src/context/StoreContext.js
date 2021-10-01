import React from "react";
import {getHashTags} from "../api/api_goods";
import {toast} from "react-toastify";

var GoodsStateContext = React.createContext();
var GoodsDispatchContext = React.createContext();


function goodsReducer(state, action) {
  switch (action.type) {
    case "SET_GOODS_TEXT":
      return {...state, goodsText: action.payload};
    case "SET_GOODS_PRICE":
      return {...state, goodsPrice: action.payload};
    case "SET_GOODS_LIST":
      return {...state, goodsList: action.payload};
    case "SET_HASHTAG_LIST":
      // overwrite and after return
      return {...state, hashTags: action.payload};
    case "LIKE_GOODS":
      const goodsId = action.payload;
      const foundIndex = state.goodsList.findIndex(item => item._id === goodsId);
      if (foundIndex === -1)
        return state;
      if(state.goodsList[foundIndex].total !== 0) {
        return {
          ...state,
          goodsList: [...state.goodsList.slice(0, foundIndex), {
            ...state.goodsList[foundIndex],
            number: state.goodsList[foundIndex].number + 1,
            count: state.goodsList[foundIndex].count + 1,
            total: state.goodsList[foundIndex].total - 1
          }, ...state.goodsList.slice(foundIndex + 1)]
        };
      }else toast.error("تعداد این کالا به اتمام رسید");
      return state;
    case "REMOVE_GOODS":
       const goodsId2 = action.payload;
       const foundIndex2 = state.goodsList.findIndex(item => item._id === goodsId2);
      if (foundIndex2 === -1)
        return state;
      if(state.goodsList[foundIndex2].count !== 0) {
        return {
          ...state,
          goodsList: [...state.goodsList.slice(0, foundIndex2), {
            ...state.goodsList[foundIndex2],
            number: state.goodsList[foundIndex2].number - 1,
            count: state.goodsList[foundIndex2].count - 1,
            total: state.goodsList[foundIndex2].total + 1
          }, ...state.goodsList.slice(foundIndex2 + 1)]
        };
      }else toast.error("تعداد از صفر کمتر نمیشه");
      return state;

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}


function StoreProvider({children}) {
  var [state, dispatch] = React.useReducer(goodsReducer, {
    goodsText: '',
    price : 0,
    goodsList: [],
    hashTags: [],

  });
  return (
    <GoodsStateContext.Provider value={state}>
      <GoodsDispatchContext.Provider value={dispatch}>
        {children}
      </GoodsDispatchContext.Provider>
    </GoodsStateContext.Provider>
  );
}


function useGoodsState() {
  var context = React.useContext(GoodsStateContext);
  if (context === undefined) {
    throw new Error("useGoodsState must be used within a StoreProvider");
  }
  return context;
}


function useGoodsDispatch() {
  var context = React.useContext(GoodsDispatchContext);
  if (context === undefined) {
    throw new Error("useGoodsDispatch must be used within a StoreProvider");
  }
  return context;
}

function usePriceState() {
  var context = React.useContext(GoodsStateContext);
  if (context === undefined) {
    throw new Error("usePriceState must be used within a StoreProvider");
  }
  return context;
}


function usePriceDispatch() {
  var context = React.useContext(GoodsDispatchContext);
  if (context === undefined) {
    throw new Error("usePriceDispatch must be used within a StoreProvider");
  }
  return context;
}



export {StoreProvider, useGoodsState, useGoodsDispatch, setGoodsText, likeGoods,removeGoods, setGoodsList, setHashTagList,updateHashTagList,usePriceState,usePriceDispatch,setGoodsPrice};



function setGoodsText(dispatch, goodsText) {
  dispatch({
    type: "SET_GOODS_TEXT",
    payload: goodsText
  });
}

function setGoodsPrice(dispatch, goodsPrice) {
  dispatch({
    type: "SET_GOODS_PRICE",
    payload: goodsPrice
  });
}


function likeGoods(dispatch, id) {
  dispatch({
    type: "LIKE_GOODS",
    payload: id
  });
}


function removeGoods(dispatch, id) {
  dispatch({
    type: "REMOVE_GOODS",
    payload: id
  });
}


function setGoodsList(dispatch, list) {
  dispatch({
    type: "SET_GOODS_LIST",
    payload: list
  });
}

function setHashTagList(dispatch, list) {
  dispatch({
    type: "SET_HASHTAG_LIST",
    payload: list
  });
}

function updateHashTagList(dispatch) {
  getHashTags((isOk, data) => {
    if (isOk) {
      dispatch({
        type: "SET_HASHTAG_LIST",
        payload: data
      });
    }
  })
}

