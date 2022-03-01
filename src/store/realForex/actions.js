import * as actionTypes from "./actionTypes";
import moment from "moment";

import { Storage } from "utils";

import ServiceManger from "utils/serviceManager";

import realForexServices from "../../services/realForexServices";

// const getForexTradesResults = realForexServices.getRealForexTradesResults();
// const getForexTradesOrders = realForexServices.getRealForexTradesOrders();
// const getForexClosedTrades = realForexServices.getRealForexClosedTrades();
const getForexTradingSettings = realForexServices.getRealForexTradingSettings();
const getForexAssetSettings = realForexServices.getRealForexAssetSettings();
const getForexPrices = realForexServices.getRealForexPrices();

export const loadInitialRealForexData = async (dispatch) => {
  // getForexTradesResults
  //   .fetch({
  //     fromDate: moment(new Date()).format("YYYY-MM-DD") + "T00:00:01",
  //     toDate:
  //       moment(new Date().setMonth(new Date().getMonth() + 1)).format(
  //         "YYYY-MM-DD"
  //       ) + "T23:59:59",
  //     positionId: null,
  //     filterTradableAssetId: null,
  //   })
  //   .then(({ response }) => {
  //     debugger;
  //     const body = response.getBody();
  //   })
  //   .catch((err) => {
  //     debugger;
  //     console.log(err);
  //   });
  // getForexTradesOrders
  //   .fetch({
  //     fromDate: moment(new Date()).format("YYYY-MM-DD") + "T00:00:01",
  //     toDate:
  //       moment(new Date().setMonth(new Date().getMonth() + 1)).format(
  //         "YYYY-MM-DD"
  //       ) + "T23:59:59",
  //     positionId: null,
  //     orderId: null,
  //     tradableAssetId: null,
  //   })
  //   .then(({ response }) => {
  //     debugger;
  //     const body = response.getBody();
  //   })
  //   .catch((err) => {
  //     debugger;
  //     console.log(err);
  //   });
  // getForexClosedTrades
  //   .fetch({
  //     fromDate: moment(new Date()).format("YYYY-MM-DD") + "T00:00:01",
  //     toDate:
  //       moment(new Date().setMonth(new Date().getMonth() + 1)).format(
  //         "YYYY-MM-DD"
  //       ) + "T23:59:59",
  //     positionId: null,
  //     tradableAssetId: null,
  //   })
  //   .then(({ response }) => {
  //     debugger;
  //     const body = response.getBody();
  //   })
  //   .catch((err) => {
  //     debugger;
  //     console.log(err);
  //   });
  getForexTradingSettings
    .fetch()
    .then(({ response }) => {
      const body = response.getBody();
      dispatch({
        type: actionTypes.REAL_FOREX_TRADING_SETTINGS,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // getForexAssetSettings
  //   .fetch()
  //   .then(({ response }) => {
  //     const body = response.getBody();
  //     debugger;
  //   })
  //   .catch((err) => {
  //     debugger;
  //     console.log(err);
  //   });
  // getForexPrices
  //   .fetch()
  //   .then(({ response }) => {
  //     debugger;
  //     const body = response.getBody();
  //   })
  //   .catch((err) => {
  //     debugger;
  //     console.log(err);
  //   });
};
