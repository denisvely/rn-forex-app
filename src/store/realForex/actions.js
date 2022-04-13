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
const closePositionRealForexNetting = realForexServices.closePositioNetting();
const addForexTradeOrderV2 = realForexServices.addRealForexTradeOrderV2();

export const loadInitialRealForexData = async (dispatch) => {
  getForexOpenTrades
    .fetch()
    .then(({ response }) => {
      const body = response.body.data;
      dispatch({
        type: actionTypes.REAL_FOREX_OPEN_POSITIONS,
        payload: body.forexOpenTrades.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  getForexPendingOrders
    .fetch()
    .then(({ response }) => {
      const body = response.body.data;

      dispatch({
        type: actionTypes.REAL_FOREX_PENDING_ORDERS,
        payload: body.results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  getClosedPositions(dispatch, {
    fromDate: null,
    toDate: null,
    positionId: null,
    tradableAssetId: null,
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
      dispatch({
        type: actionTypes.REAL_FOREX_PRICES_DONE,
      });
      // Start SignalR
      // signalRStart(body, dispatch);
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
      getAssetsOrder(dispatch);
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
  getNotifications(dispatch);
};

export const getNotifications = (dispatch) => {
  getForexNotifications
    .fetch()
    .then(({ response }) => {
      const notificationsData = response.body.data;
      dispatch({
        type: actionTypes.REAL_FOREX_NOTIFICATIONS,
        payload: notificationsData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getAssetsOrder = (dispatch) => {
  getForexAssetsOrder
    .fetch()
    .then(({ response }) => {
      const body = Object.keys(response.body.data.Favorite);
      dispatch({
        type: actionTypes.REAL_FOREX_ASSETS_ORDER,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClosedPositions = (
  dispatch,
  { fromDate, toDate, positionId, tradableAssetId }
) => {
  getForexClosedPositions
    .fetch({
      fromDate: fromDate
        ? moment(fromDate).format("YYYY-MM-DD") + "T00:00:01"
        : moment(new Date().setMonth(new Date().getMonth() - 1)).format(
            "YYYY-MM-DD"
          ) + "T00:00:01",
      toDate: toDate
        ? moment(toDate).format("YYYY-MM-DD") + "T23:59:59"
        : moment(new Date().setMonth(new Date().getMonth())).format(
            "YYYY-MM-DD"
          ) + "T23:59:59",
      positionId: positionId ? positionId : null,
      tradableAssetId: tradableAssetId ? tradableAssetId : 0,
    })
    .then(({ response }) => {
      const body = response.body.data;
      dispatch({
        type: actionTypes.REAL_FOREX_CLOSED_POSITIONS,
        payload: body.trades,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setSelectedAsset = async (dispatch, asset) => {
  dispatch({ type: actionTypes.SET_SELECTED_ASSET, payload: asset });
};

export const setCurrentTrade = async (dispatch, trade) => {
  dispatch({ type: actionTypes.SET_CURRENT_TRADE, payload: trade });
};

export const closeForexTradeNetting = (dispatch, orderId) => {
  closePositionRealForexNetting
    .fetch({ orderID: orderId })
    .then(({ response }) => {
      // TODO => ?
      // dispatch({
      //   type: actionTypes.REAL_FOREX_CLOSE_POSITION,
      //   payload: body,
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addRealForexTradeOrderV2Service = (
  dispatch,
  optionId,
  ruleId,
  isBuy,
  rate,
  volume,
  takeProfit,
  StopLoss,
  leverage,
  TakeProfitDistance,
  StoplossDistance,
  pip,
  pendingPrice,
  slippage,
  orderId,
  expirationDate,
  delay,
  ask,
  bid,
  takeProfitRate,
  stopLossRate
) => {
  addForexTradeOrderV2
    .fetch(
      optionId,
      ruleId,
      isBuy,
      rate,
      volume,
      takeProfit,
      StopLoss,
      leverage,
      TakeProfitDistance,
      StoplossDistance,
      pip,
      pendingPrice,
      slippage,
      orderId,
      expirationDate,
      delay,
      ask,
      bid,
      takeProfitRate,
      stopLossRate
    )
    .then(({ response }) => {
      // Show Notification
      // TODO => Handle Response from eventsHubProxy.on("forexPosition", (event) => {
    })
    .catch((err) => {
      console.log(err);
    });
};
