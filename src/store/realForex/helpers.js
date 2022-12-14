import Toast from "react-native-toast-message";
import moment from "moment";

export const formatRealForexOptions = (options) => {
  let allOptions = options.slice();
  let forexOptions = allOptions;

  for (let i = allOptions.length - 1; i >= 0; i--) {
    if (availableForTrading(allOptions[i])) {
      forexOptions = reorderAssets(allOptions, i, allOptions.length - 1);
    }
  }

  return forexOptions;
};

export const availableForTrading = (option) => {
  let currTime = new Date(),
    isAvailableForTrading = false;

  for (let i = 0; i < option.rules.length; i++) {
    let dateFrom = new Date(option.rules[i].dates.from.dateTime),
      dateTo = new Date(option.rules[i].dates.to.dateTime);

    if (currTime > dateFrom && currTime < dateTo) {
      isAvailableForTrading = option.rules[i].availableForTrading;
    }
  }

  return isAvailableForTrading;
};

export const reorderAssets = (assets, oldIndex, newIndex) => {
  if (newIndex >= assets.length) {
    return;
  }

  assets.splice(newIndex, 0, assets.splice(oldIndex, 1)[0]);

  return assets;
};

export const sortOptionsByType = (options) => {
  let optionsByType = {
    All: {},
    Currencies: {},
    CryptoCoins: {},
    CryptoTokens: {},
    Indices: {},
    Stocks: {},
    Commodities: {},
    Futures: {},
    Favourites: [],
  };

  options.map((option, i) => {
    if (option == "Games_OptionsNotChanged" || option == null) {
      return;
    }

    optionsByType.All[option.id] = option;

    Object.keys(optionsByType).forEach((type) => {
      if (option.type == type) {
        optionsByType[type][option.id] = option;
      }
    });
  });

  return optionsByType;
};

export const getRealForexTotalNotifications = (notifications) => {
  let totalNewNotifications = 0;

  for (let j = 0; j < notifications.length; j++) {
    if (!notifications[j].IsRead) {
      totalNewNotifications += 1;
    }
  }

  return totalNewNotifications;
};

export const returnStatusText = (id) => {
  let statusTxt = "";

  switch (id) {
    case 1:
      statusTxt = "Position opened";
      break;
    case 2:
      statusTxt = "Position closed";
      break;
    case 3:
      statusTxt = "Position modified";
      break;
    case 4:
      statusTxt = "Position cancelled";
      break;
    case 5:
      statusTxt = "Position partially closed";
      break;
    case 6:
      statusTxt = "Position summed";
      break;
    case 7:
      statusTxt = "Position aggregated";
      break;
    case 8:
      statusTxt = "Position reversed";
      break;
    case 9:
      statusTxt = "Margin call";
      break;
    case 10:
      statusTxt = "Take Profit or Stop Loss reached";
      break;
    case 11:
      statusTxt = "Pending order cancelled";
      break;
    case 12:
      statusTxt = "Pending order activated";
      break;
    case 13:
      statusTxt = "Pending order saved";
      break;
    case 14:
      statusTxt = "Pending order expired";
      break;
    case 15:
      statusTxt = "Pending order modified";
      break;
    case 16:
      statusTxt = "Aggregate social order";
      break;
    case 17:
      statusTxt = "Trader copied successfully";
      break;
    case 18:
      statusTxt = "Copy modified succesfully";
      break;
    case 19:
      statusTxt = "Trader uncopied succesfully";
      break;
    case 20:
      statusTxt = "Copy failed";
      break;
    case 21:
      statusTxt = "Uncopy failed";
      break;
    default:
      statusTxt = "Error";
      break;
  }

  return statusTxt;
};

export const convertUTCDateToLocalDate = (date) => {
  let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  let offset = date.getTimezoneOffset() / 60;
  let hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};

export const dateDiffinSeconds = (d1, d2) => {
  let t2 = d2.getTime();
  let t1 = d1.getTime();

  return parseInt((t2 - t1) / 1000);
};

export const dateDiffinMinutes = (d1, d2) => {
  let t2 = d2.getTime();
  let t1 = d1.getTime();

  return parseInt((t2 - t1) / (60 * 1000));
};

export const dateDiffinHours = (d1, d2) => {
  let t2 = d2.getTime();
  let t1 = d1.getTime();

  return parseInt((t2 - t1) / (3600 * 1000));
};

export const dateDiffinDays = (d1, d2) => {
  let t2 = d2.getTime();
  let t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000));
};

export const dateDiffinWeeks = (d1, d2) => {
  let t2 = d2.getTime();
  let t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
};

export const dateDiffinMonths = (d1, d2) => {
  let d1Y = d1.getFullYear();
  let d2Y = d2.getFullYear();
  let d1M = d1.getMonth();
  let d2M = d2.getMonth();

  return d2M + 12 * d2Y - (d1M + 12 * d1Y);
};

export const dateDiffinYears = (d1, d2) => {
  return d2.getFullYear() - d1.getFullYear();
};

export const getDateDiff = (timestamp) => {
  let returnText = "",
    notificationDate = convertUTCDateToLocalDate(new Date(timestamp));

  const currDate = convertUTCDateToLocalDate(new Date());

  if (dateDiffinYears(notificationDate, currDate) > 0) {
    returnText = dateDiffinYears(notificationDate, currDate) + "y";
  } else if (dateDiffinWeeks(notificationDate, currDate) > 0) {
    if (dateDiffinWeeks(notificationDate, currDate) > 4) {
      returnText = dateDiffinMonths(notificationDate, currDate) + "M";
    } else {
      returnText = dateDiffinWeeks(notificationDate, currDate) + "w";
    }
  } else if (dateDiffinDays(notificationDate, currDate) > 0) {
    returnText = dateDiffinDays(notificationDate, currDate) + "d";
  } else if (dateDiffinHours(notificationDate, currDate) > 0) {
    returnText = dateDiffinHours(notificationDate, currDate) + "h";
  } else if (dateDiffinMinutes(notificationDate, currDate) > 0) {
    returnText = dateDiffinMinutes(notificationDate, currDate) + "m";
  } else {
    returnText = dateDiffinSeconds(notificationDate, currDate) + "s";
  }

  return returnText;
};

export const updateFavourites = (favouritesArray, forexOptionsByType) => {
  let result = false;

  if (favouritesArray.length > 0 && forexOptionsByType) {
    for (let k = 0; k < favouritesArray.length; k++) {
      forexOptionsByType.Favourites.push(
        forexOptionsByType.All[favouritesArray[k]]
      );
    }
    result = forexOptionsByType;
  } else {
    forexOptionsByType["Favourites"] = [];
    result = forexOptionsByType;
  }

  return result;
};

export const getFormattedBidPrice = (asset) => {
  let accuracy = asset.accuracy,
    accuracySplit = asset.accuracy,
    bidSplit = asset.bid.split("."),
    bidPriceMedium,
    bidPriceSmall,
    bidPriceBig;

  if (accuracySplit > 2) {
    bidPriceMedium =
      bidSplit[0] + "." + bidSplit[1].substring(0, accuracySplit - 3);

    bidPriceSmall = bidSplit[1].substring(
      bidSplit[1].length - 3,
      bidSplit[1].length - 2
    );

    bidPriceBig = bidSplit[1].substring(
      bidSplit[1].length - 2,
      bidSplit[1].length
    );
  } else {
    bidPriceMedium =
      bidSplit[0] +
      (accuracySplit > 0
        ? "." + bidSplit[1].substring(0, accuracySplit - 3)
        : "");

    bidPriceBig =
      accuracySplit > 0
        ? bidSplit[1].substring(bidSplit[1].length - 3, bidSplit[1].length)
        : "";
  }

  return { bidPriceMedium, bidPriceSmall, bidPriceBig };
};

export const getFormattedAskPrice = (asset) => {
  let accuracy = asset.accuracy,
    accuracySplit = asset.accuracy,
    askSplit = asset.ask.split("."),
    askPriceMedium,
    askPriceSmall,
    askPriceBig;

  if (accuracySplit > 2) {
    askPriceMedium =
      askSplit[0] + "." + askSplit[1].substring(0, accuracySplit - 3);

    askPriceSmall = askSplit[1].substring(
      askSplit[1].length - 3,
      askSplit[1].length - 2
    );

    askPriceBig = askSplit[1].substring(
      askSplit[1].length - 2,
      askSplit[1].length
    );
  } else {
    askPriceMedium =
      askSplit[0] +
      (accuracySplit > 0
        ? "." + askSplit[1].substring(0, accuracySplit - 3)
        : "");

    askPriceBig =
      accuracySplit > 0
        ? askSplit[1].substring(askSplit[1].length - 3, askSplit[1].length)
        : "";
  }

  return { askPriceMedium, askPriceSmall, askPriceBig };
};

export const convertUnits = (value, assetId, reverse, settings) => {
  return settings.IsVolumeInUnits
    ? value
    : reverse
    ? value * settings.UnitsInLot[assetId]
    : value / settings.UnitsInLot[assetId];
};

export const formatDeciamlWithComma = (num) => {
  return num.toFixed(2).replace(/./g, function (c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  });
};

export const getSpread = (askPrice, bidPrice, accuracy) => {
  return parseFloat(parseFloat(askPrice) - parseFloat(bidPrice)).toFixed(
    accuracy
  );
};

export const getGlobalSetting = (settingName, settings) => {
  ///<summary>Gets the setting value if the setting. If the setting  type is boolean it return bool value, if it is not, returns the current value . </summary>
  /// <param name="settingName" type="string">The name of the boolean setting </param>
  if (settings && settings.application) {
    let property = settings.application[settingName];
    if (property && property.Value) {
      if (property.Value.toString().toLowerCase() == "true") return true;
      else if (property.Value.toString().toLowerCase() == "false") return false;
      else return property.Value;
    }
  }
  return false;
};

export const showForexNotification = (toastType, values) => {
  if (typeof values.quantity == "undefined" || isNaN(values.quantity)) {
    return;
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
    if (values.isError) {
      Toast.show({
        type: "error",
        text1: values.title,
        text2: values.text,
        topOffset: 100,
        visibilityTime: 5000,
        autoHide: true,
      });
    } else {
      const orderInfo = `${values.isBuy ? "BUY" : "SELL"} ${values.quantity} ${
        values.option
      } at ${values.strike}`;
      const orderTPandSL = `${values.takeProfit ? "TP" : ""} ${
        values.takeProfit ? values.takeProfit : ""
      } ${values.stopLoss ? "SL" : ""} ${
        values.stopLoss ? values.stopLoss : ""
      }`;
      const expirationDate = `${values.pendingDate ? "EXP" : ""} ${
        values.pendingDate
          ? `${values.pendingDate.split("T")[0]} ${
              values.pendingDate.split("T")[1]
            }`
          : ""
      }`;

      Toast.show({
        type: toastType,
        props: {
          text1: values.title,
          text2: orderInfo,
          text3: orderTPandSL.trim() !== "" ? orderTPandSL : "",
          text4: expirationDate.trim() !== "" ? expirationDate : "",
        },
        topOffset: 100,
        visibilityTime: 5000,
        autoHide: true,
      });
    }
  }
};

export const getSpreadValue = (askPrice, bidPrice, accuracy) => {
  let stringifyAskPrice = askPrice.toString().split("."),
    stringifyBidPrice = bidPrice.toString().split("."),
    askPriceResult = stringifyAskPrice[0] + stringifyAskPrice[1],
    bidPriceResult = stringifyBidPrice[0] + stringifyBidPrice[1];

  if (parseFloat(askPrice) < 1 && parseFloat(bidPrice) < 1) {
    return Math.round(
      askPrice * Math.pow(10, accuracy) - bidPrice * Math.pow(10, accuracy)
    );
  } else {
    return (
      parseFloat(askPriceResult - bidPriceResult) *
      Math.pow(10, askPriceResult > 9999 ? 0 : accuracy)
    );
  }
};

export const remainingTime = (asset) => {
  let currTime = new Date(),
    optionStart = new Date(asset.rules[0].dates.from.timestamp);

  if (optionStart.getTime() - currTime.getTime() < 0) {
    for (i = 1; asset.rules.length; i++) {
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

export const checkPendingOrdersCache = (
  data,
  pendingOrdersCache,
  pendingOrderEvent
) => {
  if (typeof data.results == "undefined") {
    if (data.results.length == 0) {
      pendingOrdersCache.forEach((item, index) => {
        var values = {
          title: pendingOrderEvent
            ? "Pending Order Filled"
            : "Pending Order Cancelled",
          action: item.IsBuy ? true : false,
          quantity: item.Volume,
          option: item.Description,
          strike: item.TradeRate,
          takeProfit:
            parseFloat(item.TakeProfitRate) === 0 ? null : item.TakeProfitRate,
          stopLoss:
            parseFloat(item.StopLossRate) === 0 ? null : item.StopLossRate,
          pendingDate: item.ExpirationDate,
        };

        const orderInfo = `${values.isBuy ? "BUY" : "SELL"} ${
          values.quantity
        } ${values.option} at ${values.strike}`;
        const orderTPandSL = `${values.takeProfit ? "TP" : ""} ${
          values.takeProfit ? values.takeProfit : ""
        } ${values.stopLoss ? "SL" : ""} ${
          values.stopLoss ? values.stopLoss : ""
        }`;
        const expirationDate = `${values.pendingDate ? "EXP" : ""} ${
          values.pendingDate
            ? `${values.pendingDate.split("T")[0]} ${
                values.pendingDate.split("T")[1]
              }`
            : ""
        }`;

        Toast.show({
          type: "successForex",
          props: {
            text1: values.title,
            text2: orderInfo,
            text3: orderTPandSL.trim() !== "" ? orderTPandSL : "",
            text4: expirationDate.trim() !== "" ? expirationDate : "",
          },
          topOffset: 100,
          visibilityTime: 5000,
          autoHide: true,
        });

        if (item.type !== "editTrade" && !pendingOrderEvent) {
          if (item.ExpirationDate !== null) {
            var currDate = new Date();

            if (currDate > new Date(item.ExpirationDate)) {
              Toast.show({
                type: "success",
                text1: "Pending Order Expired",
                topOffset: 100,
                visibilityTime: 5000,
                autoHide: true,
              });
            }
          }
        }
      });
    }
  } else {
    pendingOrdersCache.forEach((item, index) => {
      let orderId = item.OrderID,
        existed = false;

      data.results.forEach((trade, index) => {
        if (trade && trade.OrderID == orderId) {
          existed = true;
        }
      });

      if (!existed) {
        var title = "";

        if (pendingOrdersCache[orderId].ExpirationDate) {
          var currDate = new Date();

          if (currDate > new Date(pendingOrdersCache[orderId].ExpirationDate)) {
            var title = "Pending Order Expired";
          }
        }

        let values = {
          title: forexHelper.pendingOrderEvent
            ? "Pending Order Filled"
            : title
            ? title
            : "Pending Order Cancelled",
          action: pendingOrdersCache[orderId].IsBuy ? true : false,
          quantity: pendingOrdersCache[orderId].Volume,
          option: pendingOrdersCache[orderId].Description,
          strike: pendingOrdersCache[orderId].TradeRate,
          takeProfit:
            parseFloat(pendingOrdersCache[orderId].TakeProfitRate) === 0
              ? null
              : pendingOrdersCache[orderId].TakeProfitRate,
          stopLoss:
            parseFloat(pendingOrdersCache[orderId].StopLossRate) === 0
              ? null
              : pendingOrdersCache[orderId].StopLossRate,
          pendingDate: pendingOrdersCache[orderId].ExpirationDate,
        };

        const orderInfo = `${values.isBuy ? "BUY" : "SELL"} ${
          values.quantity
        } ${values.option} at ${values.strike}`;
        const orderTPandSL = `${values.takeProfit ? "TP" : ""} ${
          values.takeProfit ? values.takeProfit : ""
        } ${values.stopLoss ? "SL" : ""} ${
          values.stopLoss ? values.stopLoss : ""
        }`;
        const expirationDate = `${values.pendingDate ? "EXP" : ""} ${
          values.pendingDate
            ? `${values.pendingDate.split("T")[0]} ${
                values.pendingDate.split("T")[1]
              }`
            : ""
        }`;

        if (pendingOrdersCache[orderId].type !== "editTrade") {
          Toast.show({
            type: "successForex",
            props: {
              text1: values.title,
              text2: orderInfo,
              text3: orderTPandSL.trim() !== "" ? orderTPandSL : "",
              text4: expirationDate.trim() !== "" ? expirationDate : "",
            },
            topOffset: 100,
            visibilityTime: 5000,
            autoHide: true,
          });
        }
      }
    });
  }
};
