import signalr from "react-native-signalr";
import moment from "moment";
import * as actionTypes from "./actionTypes";
import ServiceManager from "../../utils/serviceManager";
import realForexServices from "../../services/realForexServices";

const connection = signalr.hubConnection("https://api.finte.co");

export const signalRStop = () => {
  connection.stop();
};

const signalRMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type === "REAL_FOREX_PRICES_DONE") {
      connection.logging = false;
      connection.qs = {
        token: ServiceManager.getAccessToken(),
      };

      const state = getState();
      const assetsPrices = state.realForex.realForexPrices;

      const pricesHubProxy = connection.createHubProxy("pricesHub"),
        eventsHubProxy = connection.createHubProxy("monitoringHub"),
        mergeHubProxy = connection.createHubProxy("murgeHub");

      // event handlers, you can use these to dispatch actions to update your Redux store
      pricesHubProxy.on("onChangePrice", (allPrices) => {
        realForexHubPrices(assetsPrices, allPrices, dispatch);
      });

      eventsHubProxy.on("forexPosition", (event) => {
        if (event.Event === 2) {
          realForexServices
            .getRealForexOpenTrades(dispatch)
            .fetch()
            .then(({ response }) => {
              const body = response.body.data;
              dispatch({
                type: actionTypes.REAL_FOREX_OPEN_POSITIONS,
                payload: body.forexOpenTrades.data,
              });
            });
          realForexServices
            .getRealForexClosedPositions(dispatch)
            .fetch({
              fromDate:
                moment(new Date().setMonth(new Date().getMonth() - 1)).format(
                  "YYYY-MM-DD"
                ) + "T00:00:01",
              toDate:
                moment(new Date().setMonth(new Date().getMonth())).format(
                  "YYYY-MM-DD"
                ) + "T23:59:59",
              positionId: null,
              tradableAssetId: 0,
            })
            .then(({ response }) => {
              const body = response.body.data;
              dispatch({
                type: actionTypes.REAL_FOREX_CLOSED_POSITIONS,
                payload: body.trades,
              });
            });
        }
      });

      eventsHubProxy.on("forexPendingOrder", (event) => {
        realForexServices
          .getRealForexPendingOrders(dispatch)
          .fetch()
          .then(({ response }) => {
            const body = response.body.data;

            dispatch({
              type: actionTypes.REAL_FOREX_PENDING_ORDERS,
              payload: body.results,
            });
          });
      });

      mergeHubProxy.on("forexTradingSettings", (response) => {
        console.log(response);
        // forexHelper.settings.MarginUsage = response.MarginUsage;
        // forexHelper.settings.MinCloseInterval = response.MinCloseInterval;
        // widgets.user.MarginCallLevel = response.MarginCallLevel;
        // widgets.user.StopOutLevel = response.StopOutLevel;
      });

      //connection-handling
      connection.connectionSlow(() => {
        console.log(
          "We are currently experiencing difficulties with the connection."
        );
      });

      connection.start().fail(function () {
        console.log("Could not connect");
      });

      connection.disconnected(function () {
        console.log("Disconnected");
        connection.start();
      });
    }

    return next(action);
  };

export default signalRMiddleware;

export const realForexHubPrices = (assetsPrices, allPrices, dispatch) => {
  let newPrices = [],
    arrayForexPrices = allPrices["21"];

  if (assetsPrices === null && arrayForexPrices !== null) {
    arrayForexPrices.forEach(function (i, price) {
      widget.assetsPrices[price.T] = {};
      widget.assetsPrices[price.T].id = price.T;
      widget.assetsPrices[price.T].ask = price.A.toFixed(price.C);
      widget.assetsPrices[price.T].bid = price.B.toFixed(price.C);
      widget.assetsPrices[price.T].marketAsk = price.a.toFixed(price.C);
      widget.assetsPrices[price.T].marketBid = price.b.toFixed(price.C);
      widget.assetsPrices[price.T].rate = price.R.toFixed(price.C);
      widget.assetsPrices[price.T].accuracy = price.C;
      widget.assetsPrices[price.T].delay = price.d;
    });
  } else if (arrayForexPrices != null && assetsPrices != null) {
    arrayForexPrices.forEach(function (priceNewValue, priceNewKey) {
      let isExists = false;

      Object.keys(assetsPrices).map(function (priceOldKey, priceOldValue) {
        if (priceNewValue.T === priceOldValue.id) {
          assetsPrices[priceOldKey].ask = priceNewValue.A.toFixed(
            priceNewValue.C
          );
          assetsPrices[priceOldKey].bid = priceNewValue.B.toFixed(
            priceNewValue.C
          );
          assetsPrices[priceOldKey].rate = priceNewValue.R.toFixed(
            priceNewValue.C
          );
          assetsPrices[priceOldKey].accuracy = priceNewValue.C;
          isExists = true;
        }
      });

      if (!isExists) {
        newPrices.push(priceNewValue);
      }
    });
  }

  newPrices.forEach(function (value, key) {
    assetsPrices[value.T] = {};
    assetsPrices[value.T].id = value.T;
    assetsPrices[value.T].ask = value.A.toFixed(value.C);
    assetsPrices[value.T].bid = value.B.toFixed(value.C);
    assetsPrices[value.T].marketAsk = value.a.toFixed(value.C);
    assetsPrices[value.T].marketBid = value.b.toFixed(value.C);
    assetsPrices[value.T].rate = value.R.toFixed(value.C);
    assetsPrices[value.T].accuracy = value.C;
  });

  dispatch({
    type: actionTypes.REAL_FOREX_PRICES,
    payload: assetsPrices,
  });
  newPrices = [];
};
