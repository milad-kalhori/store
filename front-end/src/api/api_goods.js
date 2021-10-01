import {getAxiosInstanceApi, getAxiosInstanceJsonServer} from "./api";


export const getAllGoods = (callback) => {
  getAxiosInstanceApi().post("getAllGoods")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};
export const getGoodsByHashTagRequest = (hashTag ,callback) => {
  getAxiosInstanceApi().post("getAllGoods" , {hashTag})
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};
export const getGoodsByUserRequest = (user ,callback) => {
  getAxiosInstanceApi().post("getAllGoods" , {user})
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};


export const getHashTags = (callback) => {
  getAxiosInstanceApi().get("getAllHashTags")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};
export const getUsers = (callback) => {
  getAxiosInstanceApi().get("getAllUser")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};
export const newGoodsRequest = (data, callback) => {
  getAxiosInstanceApi().post("newGoods", data)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  });
};
export const likeGoodsRequest = (id, callback) => {
  getAxiosInstanceApi().get("likeGoods/"+id)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  });
};
export const removeGoodsRequest = (id, callback) => {
  getAxiosInstanceApi().get("removeGoods/"+id)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  });
};

export const updateBasket = (data, callback) => {
    getAxiosInstanceApi().post("/updateBasket",data)
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    });
};


export const getBasket = (callback) => {
    getAxiosInstanceApi().get("/getBasket")
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    });
};

export const checkoutBasket = (callback) => {
    getAxiosInstanceApi().get("/checkoutBasket")
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    });
};

export const payment = (paymentCode,callback) => {
    getAxiosInstanceApi().get("/payment/" + paymentCode)
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    });
};

export const updateCoordinates = (data, callback) => {
    getAxiosInstanceApi().post("/updateCoordinates",data)
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    });
};

export const sendAllGoods = (callback) => {
    getAxiosInstanceApi().get("/sendAllGoods")
        .then(response => {
            const data = response.data;
            callback(true, data);
        }).catch(error => {
        console.log(error);
        callback(false, error);
    })
};



