import { showForexNotification } from "../../../store/realForex/helpers";

export const processMarketOrder = (response, currTrade) => {
  if (response && response.body.code == 200) {
    if (
      response.body.data &&
      response.body.data.type == "EditOrder_Successful" &&
      response.body.data.parameters.forexType == "MarketOrder"
    ) {
      currTrade.title = "Position modified";
      showForexNotification("success", currTrade);
    } else if (
      (response.body.data.type == "TradeRoom_SuccessTradeModified" ||
        response.body.data.type == "EditOrder_Successful") &&
      response.body.data.parameters.forexType == "MarketOrder"
    ) {
      currTrade.title = "Position modified";
      showForexNotification("success", currTrade);
    } else {
      currTrade.title = response.body.data.parameters.PositionId
        ? "Position closed"
        : "Position opened";
      showForexNotification("successForex", currTrade);
    }
  } else if (
    response.body &&
    response.body.code == 400 &&
    response.body.data.type == "TradeOrder_MinOpenInterval"
  ) {
    // TODO
    // $(window).trigger(
    //   widgets.events.showTradingLimitsPopup,
    //   response.body.data.text
    // );
  } else if (
    response.body &&
    response.body.code == 400 &&
    response.body.data.type == "TradeOrder_MinCloseIntervalError"
  ) {
    // TODO
    // $(window).trigger(
    //   widgets.events.showTradingLimitsPopup,
    //   forexHelper.settings.MinCloseInterval
    // );
  } else {
    if (response.body.data.type === "TradeOrder_InsufficientBalance") {
      currTrade.title = "Insufficient balance";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else if (
      response.body.data.type === "TradeOrder_RejectedToPreventStopOut"
    ) {
      currTrade.title = "Rejected Stop Out";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else if (response.body.data.type === "TradeOrder_PriceOutOfDate") {
      currTrade.title = "Missing price";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else if (
      response.body.data.type === "TradeOrder_QuantityValidationError"
    ) {
      currTrade.title = "Failed limitation";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else if (response.body.data.type === "Fraud_User_Suspended") {
      currTrade.title = "User suspended";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else {
      currTrade.title = "Position Failed";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    }
  }
};

export const processPendingOrder = (response, currTrade) => {
  if (
    response.body.data &&
    response.body.data.type == "TradeOrder_Successful" &&
    response.body.data.parameters &&
    response.body.data.parameters.forexType == "PendingOrder"
  ) {
    currTrade.title = `Pending Order Confirmed`;
    currTrade.isError = false;
    showForexNotification("success", currTrade);
  } else if (
    response.body.data &&
    response.body.data.type == "EditOrder_Successful" &&
    response.body.data.parameters.forexType == "PendingOrder"
  ) {
    currTrade.title = "Pending Order Modified";
    showForexNotification("success", currTrade);
  } else {
    if (response.body.data.type === "TradeOrder_InsufficientBalance") {
      currTrade.title = "Insufficient balance";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else if (
      response.body.data.type === "TradeOrder_RejectedToPreventStopOut"
    ) {
      currTrade.title = "Rejected Stop Out";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else if (response.body.data.type === "TradeOrder_PriceOutOfDate") {
      currTrade.title = "Missing price";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else if (
      response.body.data.type === "TradeOrder_QuantityValidationError"
    ) {
      currTrade.title = "Failed limitation";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else if (response.body.data.type === "Fraud_User_Suspended") {
      currTrade.title = "User suspended";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    } else {
      currTrade.title = "Position Failed";
      currTrade.isError = true;
      showForexNotification("error", currTrade);
    }
  }
};
