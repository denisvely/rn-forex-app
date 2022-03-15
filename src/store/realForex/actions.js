import * as actionTypes from "./actionTypes";
import moment from "moment";

import { signalRStart } from "./signalRActions";
import realForexServices from "../../services/realForexServices";

const getForexOpenTrades = realForexServices.getRealForexOpenTrades();
const getForexPendingOrders = realForexServices.getRealForexPendingOrders();
const getForexClosedPositions = realForexServices.getRealForexClosedPositions();
const getForexTradingSettings = realForexServices.getRealForexTradingSettings();
const getForexAssetSettings = realForexServices.getRealForexAssetSettings();
const getForexPrices = realForexServices.getRealForexPrices();
const getForexSwapRates = realForexServices.getRealForexSwapRates();
const getForexOptions = realForexServices.getRealForexOptions();
const getForexNotifications = realForexServices.getRealForexNotifications();
const getForexAssetsOrder = realForexServices.getRealForexAssetsOrder();
const getForexTraderInsight = realForexServices.getRealForexTraderInsight();
// const getForexDailyChange = realForexServices.getRealForexDailyChange();

export const loadInitialRealForexData = (dispatch) => {
  getForexOpenTrades
    .fetch()
    .then(({ response }) => {
      const body = response.body.data.forexOpenTrades.data;
      if (body.length > 0) {
        dispatch({
          type: actionTypes.REAL_FOREX_CLOSED_POSITIONS,
          payload: body,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  getForexPendingOrders
    .fetch()
    .then(({ response }) => {
      const body = response.body.data;
      if (body.length > 0) {
        dispatch({
          type: actionTypes.REAL_FOREX_PENDING_ORDERS,
          payload: body,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  getForexClosedPositions
    .fetch({
      fromDate: moment(new Date()).format("YYYY-MM-DD") + "T00:00:01",
      toDate:
        moment(new Date().setMonth(new Date().getMonth() + 1)).format(
          "YYYY-MM-DD"
        ) + "T23:59:59",
      positionId: null,
      tradableAssetId: 0,
    })
    .then(({ response }) => {
      const body = response.body.data;
      if (body.length > 0) {
        dispatch({
          type: actionTypes.REAL_FOREX_CLOSED_POSITIONS,
          payload: body,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
  getForexAssetSettings
    .fetch()
    .then(({ response }) => {
      const body = response.body.data.forexassetsettings.data;
      dispatch({
        type: actionTypes.REAL_FOREX_ASSETS_SETTINGS,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  getForexPrices
    .fetch()
    .then(({ response }) => {
      const body = response.body.data.forexPrices.data;

      dispatch({
        type: actionTypes.REAL_FOREX_PRICES,
        payload: body,
      });
      // Start SignalR
      signalRStart(body, dispatch);
    })
    .catch((err) => {
      console.log(err);
    });
  getForexSwapRates
    .fetch()
    .then(({ response }) => {
      const body = response.body.data;
      dispatch({
        type: actionTypes.REAL_FOREX_SWAP_RATES,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  getForexOptions
    .fetch()
    .then(({ response }) => {
      const body = response.body.data;
      dispatch({
        type: actionTypes.REAL_FOREX_OPTIONS_AND_BALANCE,
        payload: body,
      });
      getForexAssetsOrder
        .fetch()
        .then(({ response }) => {
          const body = response.body.data.Favorite;
          dispatch({
            type: actionTypes.REAL_FOREX_ASSETS_ORDER,
            payload: body,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  getForexNotifications
    .fetch()
    .then(({ response }) => {
      const notificationsData = response.body.data.slice(0, 100);
      dispatch({
        type: actionTypes.REAL_FOREX_NOTIFICATIONS,
        payload: notificationsData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  getForexTraderInsight
    .fetch()
    .then(({ response }) => {
      const body = response.body.data;

      let traderInsightData = {};
      for (let i = 0; i < body.length; i++) {
        traderInsightData[body[i].Taid] = {};
        traderInsightData[body[i].Taid].bid = body[i].totalBuyVolume;
        traderInsightData[body[i].Taid].ask = body[i].totalSellVolume;
      }
      dispatch({
        type: actionTypes.REAL_FOREX_TRADER_INSIGHT,
        payload: traderInsightData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setSelectedAsset = async (dispatch, asset) => {
  dispatch({ type: actionTypes.SET_SELECTED_ASSET, payload: asset });
};
