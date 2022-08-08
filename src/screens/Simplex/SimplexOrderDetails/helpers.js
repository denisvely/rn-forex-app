import Toast from "react-native-toast-message";
import moment from "moment";

export const checkInvestmentValues = (
  amount,
  simplexTradingSettings,
  stopLoss,
  takeProfit,
  user
) => {
  if (
    amount <
    parseInt(simplexTradingSettings.MinInvest) * user.currencyFactor
  ) {
    Toast.show({
      type: "error",
      text1: `The minimum investment amount is ${
        simplexTradingSettings.MinInvest * user.currencyFactor
      }`,
      topOffset: 100,
      visibilityTime: 3000,
      autoHide: true,
    });
    return false;
  }

  if (
    amount >
    parseInt(simplexTradingSettings.MaxInvest) * user.currencyFactor
  ) {
    Toast.show({
      type: "error",
      text1: `The maximum investment amount is ${
        simplexTradingSettings.MaxInvest * user.currencyFactor
      }`,
      topOffset: 100,
      visibilityTime: 3000,
      autoHide: true,
    });
    return false;
  }

  if (
    takeProfit <
    (parseInt(simplexTradingSettings.SimpleForexMinTakeProfit) * amount) / 100
  ) {
    Toast.show({
      type: "error",
      text1: `The minimum take profit amount is ${
        (parseInt(simplexTradingSettings.SimpleForexMinTakeProfit) * amount) /
        100
      }`,
      topOffset: 100,
      visibilityTime: 3000,
      autoHide: true,
    });
    return false;
  }

  if (
    takeProfit >
    (parseInt(simplexTradingSettings.SimpleForexMaxTakeProfit) * amount) / 100
  ) {
    Toast.show({
      type: "error",
      text1: `The maximum take profit amount is ${
        (parseInt(simplexTradingSettings.SimpleForexMaxTakeProfit) * amount) /
        100
      }`,
      topOffset: 100,
      visibilityTime: 3000,
      autoHide: true,
    });
    return false;
  }

  if (
    stopLoss <
    (parseInt(simplexTradingSettings.SimpleForexMinStopLoss) * amount) / 100
  ) {
    Toast.show({
      type: "error",
      text1: `The minimum stop loss amount is ${
        (parseInt(simplexTradingSettings.SimpleForexMinStopLoss) * amount) / 100
      }`,
      topOffset: 100,
      visibilityTime: 3000,
      autoHide: true,
    });
    return false;
  }

  if (parseFloat(stopLoss) > parseFloat(amount)) {
    Toast.show({
      type: "error",
      text1: `The maximum stop loss amount is ${parseInt(amount)}`,
      topOffset: 100,
      visibilityTime: 3000,
      autoHide: true,
    });
    return false;
  }

  return true;
};

export const processMarketOrder = (response, currTrade) => {
  if (response && response.code == 200) {
    if (response.data.type === "EditOrder_Successful") {
      currTrade.title = "Position modified";
      currTrade.isError = false;
      showNotification("success", currTrade);
    } else {
      currTrade.title = currTrade.isMarket
        ? "Position opened"
        : "Pending order created";
      currTrade.isError = false;
      showNotification("success", currTrade);
    }
  } else {
    if (response.data.type === "Fraud_User_Suspended") {
      currTrade.title = "User suspended";
      currTrade.isError = true;
      showNotification("error", currTrade);
    } else if (response.data.type === "TradeOrder_PriceOutOfDate") {
      currTrade.title = "Missing price";
      currTrade.isError = true;
      showNotification("error", currTrade);
    } else if (
      response.data.type === "TradeOrder_QuantityValidationError" ||
      response.data.type === "LimitationException_MaxOpenTradesAmountForex"
    ) {
      currTrade.title = "Failed limitation";
      currTrade.isError = true;
      showNotification("error", currTrade);
    } else if (response.data.type === "TradeOrder_InsufficientBalance") {
      currTrade.title = "Insufficient balance";
      currTrade.isError = true;
      showNotification("error", currTrade);
    } else if (response.data.type == "TradeOrder_MinOpenIntervalSimplexError") {
      // TODO
      // $(window).trigger(
      //   widgets.events.showTradingLimitsPopup,
      //   easyForexHelper.SimplexMinOpenInterval
      // );
    } else {
      currTrade.title = currTrade.isMarket
        ? "Position failed"
        : "Pending order failed";
      currTrade.isError = true;
      showNotification("error", currTrade);
    }
  }
};

export const showNotification = (toastType, values) => {
  if (!toastType || !values) {
    return;
  }
  if (values.isError) {
    Toast.show({
      type: "error",
      text1: values.title,
      topOffset: 100,
      visibilityTime: 5000,
      autoHide: true,
    });
  } else {
  }

  if (values.type == "CountryNotAllowed") {
    let text1 = "Trade Rejected";
    let text2 = "Action is not allowed for this country.";
    Toast.show({
      type: "error",
      text1: text1,
      text2: text2,
      topOffset: 100,
      visibilityTime: 5000,
      autoHide: true,
    });
  } else {
    Toast.show({
      type: "success",
      text1: values.title,
      topOffset: 100,
      visibilityTime: 3000,
      autoHide: true,
    });
  }
};

export const remainingTime = (asset) => {
  let currTime = new Date(),
    optionStart = new Date(asset.rules[0].dates.from.timestamp);

  if (optionStart.getTime() - currTime.getTime() < 0) {
    for (let i = 0; i < asset.rules.length; i++) {
      if (!asset.rules[i].availableForTrading) {
        optionStart = new Date(asset.rules[i].dates.from.timestamp);

        if (optionStart.getTime() - currTime.getTime() > 0) {
          break;
        }
      }
    }
  }

  let timeDiff = optionStart.getTime() - currTime.getTime(),
    diffMinutes = Math.ceil(timeDiff / (1000 * 60)),
    remainingMins = diffMinutes % 60,
    remainingHrs =
      Math.floor(diffMinutes / 60) > 24
        ? Math.floor(diffMinutes / 60) % 24
        : Math.floor(diffMinutes / 60),
    remainingDays = Math.floor(Math.floor(diffMinutes / 60) / 24);

  return (
    moment(optionStart).format("HH:MM") +
    "(in " +
    (remainingDays > 0
      ? remainingDays == 1
        ? "1day "
        : remainingDays + "days "
      : "") +
    (remainingHrs > 0
      ? remainingHrs == 1
        ? "1hr "
        : remainingHrs + "hrs "
      : "") +
    (remainingMins + "min)")
  );
};

export const checkAvailableForTrading = (
  id,
  expirationDate,
  simplexOptionsByType
) => {
  if (!simplexOptionsByType.All[id].rules.length) {
    return false;
  } else {
    var currTime =
        expirationDate == null ? new Date() : new Date(expirationDate),
      availableForTrading = false;

    for (i = 0; i < simplexOptionsByType.All[id].rules.length; i++) {
      var dateFrom = new Date(
          simplexOptionsByType.All[id].rules[i].dates.from.dateTime
        ),
        dateTo = new Date(
          simplexOptionsByType.All[id].rules[i].dates.to.dateTime
        );

      if (currTime > dateFrom && currTime < dateTo) {
        availableForTrading =
          simplexOptionsByType.All[id].rules[i].availableForTrading;
      }
    }

    return availableForTrading;
  }
};
