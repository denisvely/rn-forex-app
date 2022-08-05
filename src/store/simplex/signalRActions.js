import signalr from "react-native-signalr";
import * as actionTypes from "./actionTypes";
import ServiceManager from "../../utils/serviceManager";
import simplexServices from "../../services/simplexServices";
import moment from "moment";

const connection = signalr.hubConnection("https://api.finte.co");

export const signalRStop = () => {
  connection.stop();
};

export const signalRStart = (assetsPrices, dispatch) => {
  connection.logging = false;
  connection.qs = { token: ServiceManager.getAccessToken(), OptionType: "18" };

  const pricesHubProxy = connection.createHubProxy("pricesHub"),
    eventsHubProxy = connection.createHubProxy("monitoringHub"),
    mergeHubProxy = connection.createHubProxy("murgeHub");

  eventsHubProxy.on("simplexOpenPosition", () => {
    simplexServices
      .getSimplexOpenTrades(dispatch)
      .fetch()
      .then(({ response }) => {
        const body = response.body.data
          ? response.body.data.forexOpenTrades.data
          : [];
        dispatch({
          type: actionTypes.SIMPLEX_OPEN_POSITIONS,
          payload: body,
        });
      });
  });

  eventsHubProxy.on("simplexClosedPosition", () => {
    simplexServices
      .getSimplexClosedPositions(dispatch)
      .fetch({
        fromDate:
          moment(new Date().setMonth(new Date().getMonth() - 1)).format(
            "YYYY-MM-DD"
          ) + "T00:00:01",
        toDate: moment(new Date()).format("YYYY-MM-DD") + "T23:59:59",
      })
      .then(({ response }) => {
        const body = response.body.data.trades;
        dispatch({
          type: actionTypes.SIMPLEX_CLOSED_POSITIONS,
          payload: body,
        });
      });
  });

  eventsHubProxy.on("forexPendingOrder", () => {
    simplexServices
      .getSimplexPendingOrders(dispatch)
      .fetch()
      .then(({ response }) => {
        const body = response.body.data ? response.body.data.results : [];
        dispatch({
          type: actionTypes.SIMPLEX_PENDING_ORDERS,
          payload: body,
        });
      });
  });

  pricesHubProxy.on("onChangePrice", (allPrices) => {
    simplexHubPrices(assetsPrices, allPrices, dispatch);
  });

  connection.start({ withCredentials: false }).fail(function () {
    console.log("Could not connect");
  });

  connection.disconnected(function () {
    console.log("Disconnected");
    connection.start({ withCredentials: false });
  });

  connection.error((error) => {
    const errorMessage = error.message;
    let detailedError = "";
    if (error.source && error.source._response) {
      detailedError = error.source._response;
    }
    if (
      detailedError ===
      "An SSL error has occurred and a secure connection to the server cannot be made."
    ) {
      console.log(
        "When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14"
      );
    }
    console.debug("SignalR error: " + errorMessage, detailedError);
  });

  connection.connectionSlow(() => {
    console.log(
      "We are currently experiencing difficulties with the connection."
    );
  });

  connection.error((error) => {
    const errorMessage = error.message;
    let detailedError = "";
    if (error.source && error.source._response) {
      detailedError = error.source._response;
    }
    if (
      detailedError ===
      "An SSL error has occurred and a secure connection to the server cannot be made."
    ) {
      console.log(
        "When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14"
      );
    }
    console.debug("SignalR error: " + errorMessage, detailedError);
  });
};

export const simplexHubPrices = (assetsPrices, allPrices, dispatch) => {
  let newPrices = [],
    arrayForexPrices = allPrices["18"];

  if (assetsPrices === null && arrayForexPrices !== null) {
    arrayForexPrices.forEach(function (i, price) {
      assetsPrices[price.T] = {};
      assetsPrices[price.T].id = price.T;
      assetsPrices[price.T].ask = price.A.toFixed(price.C);
      assetsPrices[price.T].bid = price.B.toFixed(price.C);
      assetsPrices[price.T].rate = price.R.toFixed(price.C);
      assetsPrices[price.T].accuracy = price.C;
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
    assetsPrices[value.T].TAID = value.T;
    assetsPrices[value.T].id = value.T;
    assetsPrices[value.T].ask = value.A.toFixed(value.C);
    assetsPrices[value.T].bid = value.B.toFixed(value.C);
    assetsPrices[value.T].marketAsk = value.a.toFixed(value.C);
    assetsPrices[value.T].marketBid = value.b.toFixed(value.C);
    assetsPrices[value.T].rate = value.R.toFixed(value.C);
    assetsPrices[value.T].accuracy = value.C;
  });

  dispatch({
    type: actionTypes.SIMPLEX_PRICES,
    payload: assetsPrices,
  });
  newPrices = [];
};
