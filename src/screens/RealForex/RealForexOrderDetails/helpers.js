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
      showForexNotification("error", currTrade);
    } else if (
      response.body.data.type === "TradeOrder_RejectedToPreventStopOut"
    ) {
      currTrade.title = "Rejected Stop Out";
      showForexNotification("error", currTrade);
    } else if (response.body.data.type === "TradeOrder_PriceOutOfDate") {
      currTrade.title = "Missing price";
      showForexNotification("error", currTrade);
    } else if (
      response.body.data.type === "TradeOrder_QuantityValidationError"
    ) {
      currTrade.title = "Failed limitation";
      showForexNotification("error", currTrade);
    } else if (response.body.data.type === "Fraud_User_Suspended") {
      currTrade.title = "User suspended";
      showForexNotification("error", currTrade);
    } else {
      currTrade.title = "Position Failed";
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
    currTrade.title = "Pending Order Confirmed";
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
      showForexNotification("error", currTrade);
    } else if (
      response.body.data.type === "TradeOrder_RejectedToPreventStopOut"
    ) {
      currTrade.title = "Rejected Stop Out";
      showForexNotification("error", currTrade);
    } else if (response.body.data.type === "TradeOrder_PriceOutOfDate") {
      currTrade.title = "Missing price";
      showForexNotification("error", currTrade);
    } else if (
      response.body.data.type === "TradeOrder_QuantityValidationError"
    ) {
      currTrade.title = "Failed limitation";
      showForexNotification("error", currTrade);
    } else if (response.body.data.type === "Fraud_User_Suspended") {
      currTrade.title = "User suspended";
      showForexNotification("error", currTrade);
    } else {
      currTrade.title = "Position Failed";
      showForexNotification("error", currTrade);
    }
  }
};
