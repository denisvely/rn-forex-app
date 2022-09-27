import * as actionTypes from "./actionTypes";
import moment from "moment";
import { signalRStart } from "./signalRActions";
import simplexServices from "../../services/simplexServices";

const getSimplexOpenTrades = simplexServices.getSimplexOpenTrades();
const getSimplexPendingOrders = simplexServices.getSimplexPendingOrders();
const getSimplexClosedPositions = simplexServices.getSimplexClosedPositions();
const getSimplexTradingSettings = simplexServices.getSimplexTradingSettings();
const getSimplexAssetSettings = simplexServices.getSimplexAssetSettings();
const getSimplexPrices = simplexServices.getSimplexPrices();
const getSimplexOptions = simplexServices.getSimplexOptions();
const getSimplexNotifications = simplexServices.getSimplexNotifications();
const getSimplexAssetsOrder = simplexServices.getSimplexAssetsOrder();
const getUserFullBalance = simplexServices.getUserFullBalance();

export const loadInitialSimplexData = (dispatch) => {
  getSimplexOpenTrades
    .fetch()
    .then(({ response }) => {
      const body = response.body.data.forexOpenTrades.data;
      dispatch({
        type: actionTypes.SIMPLEX_OPEN_POSITIONS,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  getSimplexPendingOrders
    .fetch()
    .then(({ response }) => {
      const body = response.body.data.results;
      dispatch({
        type: actionTypes.SIMPLEX_PENDING_ORDERS,
        payload: body,
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
  getSimplexTradingSettings
    .fetch()
    .then(({ response }) => {
      const body = response.getBody();
      dispatch({
        type: actionTypes.SIMPLEX_TRADING_SETTINGS,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  getSimplexAssetSettings
    .fetch()
    .then(({ response }) => {
      const body = response.body.data.forexassetsettings.data;
      dispatch({
        type: actionTypes.SIMPLEX_ASSETS_SETTINGS,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  getSimplexPrices
    .fetch()
    .then(({ response }) => {
      const body = response.body.data.forexPrices.data;

      dispatch({
        type: actionTypes.SIMPLEX_PRICES,
        payload: body,
      });
      // Start SignalR
      signalRStart(body, dispatch);
    })
    .catch((err) => {
      console.log(err);
    });
  getSimplexOptions
    .fetch()
    .then(({ response }) => {
      const body = response.body.data;
      dispatch({
        type: actionTypes.SIMPLEX_OPTIONS_AND_BALANCE,
        payload: body,
      });
      getAssetsOrder(dispatch);
    })
    .catch((err) => {
      console.log(err);
    });
  getSimplexNotifications
    .fetch()
    .then(({ response }) => {
      const notificationsData = response.body.data.slice(0, 100);
      dispatch({
        type: actionTypes.SIMPLEX_NOTIFICATIONS,
        payload: notificationsData,
      });
    })
    .catch((err) => {
      console.log(err);
    });

  getBalance(dispatch);
};

export const setSelectedAsset = async (dispatch, asset) => {
  dispatch({ type: actionTypes.SET_SELECTED_ASSET, payload: asset });
};

export const setCurrentTrade = async (dispatch, trade) => {
  dispatch({ type: actionTypes.SET_CURRENT_TRADE, payload: trade });
};

export const setCurrentlyModifiedOrder = async (dispatch, order) => {
  dispatch({ type: actionTypes.SET_CURRENTLY_MODIFIED_ORDER, payload: order });
};

export const getBalance = (dispatch) => {
  getUserFullBalance
    .fetch()
    .then(({ response }) => {
      if (!response || !response.body || response.body.code != 200) {
        return false;
      }
      dispatch({
        type: actionTypes.SIMPLEX_USER_BALANCE,
        payload: response.body.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAssetsOrder = (dispatch) => {
  getSimplexAssetsOrder
    .fetch()
    .then(({ response }) => {
      const body = response.body.data.Favorite;
      dispatch({
        type: actionTypes.SIMPLEX_ASSETS_ORDER,
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
  getSimplexClosedPositions
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
      const body = response.body.data.trades;
      dispatch({
        type: actionTypes.SIMPLEX_CLOSED_POSITIONS,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
