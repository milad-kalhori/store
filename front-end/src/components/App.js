import React, {useState} from 'react';
import Layout from "./layout/Layout";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "../pages/home/Home";
import Page404 from '../pages/404/404'
import Discount from "../pages/discount/Discount";
import Type from "../pages/goods/Type";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import AuthPage from "../pages/auth/AuthPage";
import Admin from "../pages/admin/Admin"
import Staff from "../pages/staff/Staff";
import Map from "../pages/maps/Map";
import Map2 from "../pages/maps/Map2";
import Location from "../pages/location/Location";
import Checkout from "../pages/checkout/Checkout";
import BillSlip from "../pages/billSip/BillSlip";
import Zarinpal from "../pages/zarinpal/Zarinpal";

import {StoreProvider} from "../context/StoreContext";
import '../i18n'
import User from "../pages/user/User";
import ChatRoom from "../pages/chatroom/ChatRoom";
import History from "../pages/history/History";
import Qrcode from "../pages/qrcode/generate/Qrcode";
import Qrcode2 from "../pages/qrcode/scan/Qrcode2";


import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import RouteInformation from "../pages/routeInformation/RouteInformation";
import Guide from "../pages/guide/Guide";




const App = () => {




  return (
    <>
      <BrowserRouter>
        <Switch>

          <PublicRoute  path="/login" component={AuthPage}/>
          <PrivateRoute path={"/"} render={() =>
            <StoreProvider>
              <Layout>
                <Switch>
                  <PrivateRoute2 exact path={"/admin"}  render={() =>
                      <Route exact component={Admin}/>
                  }/>
                  <PrivateRoute3 exact path={"/staff"}  render={() =>
                      <Route exact component={Staff}/>
                  }/>
                  <Route exact path={"/user"} component={User}/>
                  <Route exact path={"/"} component={Home}/>
                  <Route exact path={"/hashtags/:hashtag"} component={Discount}/>
                  <Route exact path={"/users/:id/:name"} component={Type}/>
                  <Route exact path={"/checkout"} component={Checkout}/>
                  <Route exact path={"/checkout/zarinpal"} component={Zarinpal}/>
                  <Route path={"/checkout/zarinpal/billSlip"} component={BillSlip}/>
                  <Route path={"/admin/chatroom"} component={ChatRoom}/>
                  <Route path={"/user/chatroom"} component={ChatRoom}/>
                  <Route exact path={"/admin/history"} component={History}/>
                  <Route path={"/checkout/qrcode-generate.html"} component={Qrcode}/>
                  <Route exact path={"/user/qrcode-scanner"} component={Qrcode2}/>
                  <Route exact path="/map" component={Map} />
                  <Route exact path="/user/location" component={Location} />
                  <Route path={"/admin/routeInformation"} component={RouteInformation}/>
                  <Route exact path="/maps2" component={Map2} />
                  <Route exact path="/user/guide" component={Guide} />
                  <Route component={Page404}/>
                </Switch>
              </Layout>
            </StoreProvider>
          }/>

        </Switch>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
};


const isLogin = () => !!localStorage.getItem("x-auth-token");

const PublicRoute = ({component, ...props}) => {
  return <Route {...props} render={(props) => {
    if (isLogin()){
      if (role === "admin") {
        toast.success("به صفحه مدیر خوش آمدید");
        return <Redirect to={"/admin"}/>
      }
      if (role === "staff") {
        toast.success("به صفحه کارکنان خوش آمدید");
        return <Redirect to={"/staff"}/>}
      else {
        toast.success("خوش آمدید");

        confirmAlert({
          title: "مجوز دسترسی",
          message: "آیا اجازه دریافت مختصات مسیر حرکت خود را به ما می دهید؟",
          buttons: [
            {
              label: "بله",
              onClick: () => window.open('http://localhost:3000/location',"_blank")
            },
            {
              label: "خیر"
              // onClick: () => alert("Click No")
            }
          ]
        });

        return <Redirect to={"/"}/>}
    }
    else {
      return React.createElement(component, props);
    }

  }}/>
};

const PrivateRoute = ({render, ...props}) => {
  return <Route {...props} render={(props) => {
    if (isLogin())
      return render(props);
    else return <Redirect to={"/login"}/>
  }}/>
}




const role = localStorage.getItem("role");

const PrivateRoute2 = ({render, ...props}) => {
  return <Route {...props} render={(props) => {
    if (role === "admin") {
      return render(props);
    }
    else {
      toast.error("شما مدیر نیستید");
      return <Redirect to={"/"}/>
    }
  }}/>
}

const PrivateRoute3 = ({render, ...props}) => {
  return <Route {...props} render={(props) => {
    if (role === "staff") {
      return render(props);
    }
    else {
      toast.error("شما کارکنان نیستید");
      return <Redirect to={"/"}/>
    }
  }}/>
}

export default App;