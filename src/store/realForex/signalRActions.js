import signalr from "react-native-signalr";
import * as actionTypes from "./actionTypes";

import ServiceManager from "utils/serviceManager";

const connection = signalr.hubConnection("https://api.finte.co");

export const signalRStop = () => {
  connection.stop();
};

export const signalRStart = (assetsPrices, dispatch) => {
  //This is the server under /example/server published on azure.
  connection.logging = true;
  connection.qs = { token: ServiceManager.getAccessToken() };

  const pricesHubProxy = connection.createHubProxy("pricesHub"),
    eventsHubProxy = connection.createHubProxy("monitoringHub"),
    mergeHubProxy = connection.createHubProxy("murgeHub");

  pricesHubProxy.on("onChangePrice", (allPrices) => {
    realForexHubPrices(assetsPrices, allPrices, dispatch);
  });

  eventsHubProxy.on("forexPosition", (event) => {
    if (event.Event === 2) {
      // debugger;
    }
  });

  //connection-handling
  connection.connectionSlow(() => {
    console.log(
      "We are currently experiencing difficulties with the connection."
    );
  });

  connection.disconnected(function () {
    console.log("Disconnected");
    connection.start();
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

export const realForexHubPrices = (assetsPrices, allPrices, dispatch) => {
  let newPrices = [],
    arrayForexPrices = allPrices["21"];

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
      var isExists = false;
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
