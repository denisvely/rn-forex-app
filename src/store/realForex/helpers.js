export const formatRealForexOptions = (options) => {
  let allOptions = options.slice();
  let forexOptions = allOptions;

  for (var i = allOptions.length - 1; i >= 0; i--) {
    if (!availableForTrading(allOptions[i])) {
      forexOptions = reorderAssets(allOptions, i, allOptions.length - 1);
    }
  }

  return forexOptions;
};

export const availableForTrading = (option) => {
  var currTime = new Date(),
    isAvailableForTrading = false;

  for (let i = 0; i < option.rules.length; i++) {
    var dateFrom = new Date(option.rules[i].dates.from.dateTime),
      dateTo = new Date(option.rules[i].dates.to.dateTime);

    if (currTime > dateFrom && dateFrom < dateTo) {
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

export const sortOptinsByType = (options) => {
  let optionsByType = {
    All: {},
    Currencies: {},
    CryptoCoins: {},
    CryptoTokens: {},
    Indices: {},
    Stocks: {},
    Commodities: {},
    Futures: {},
    Favorites: [],
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

  for (var j = 0; j < notifications.length; j++) {
    if (!notifications[j].IsRead) {
      totalNewNotifications += 1;
    }
  }

  return totalNewNotifications;
};

export const returnStatusText = (id) => {
  var statusTxt = "";

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
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};

export const dateDiffinSeconds = (d1, d2) => {
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / 1000);
};

export const dateDiffinMinutes = (d1, d2) => {
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (60 * 1000));
};

export const dateDiffinHours = (d1, d2) => {
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (3600 * 1000));
};

export const dateDiffinDays = (d1, d2) => {
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000));
};

export const dateDiffinWeeks = (d1, d2) => {
  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
};

export const dateDiffinMonths = (d1, d2) => {
  var d1Y = d1.getFullYear();
  var d2Y = d2.getFullYear();
  var d1M = d1.getMonth();
  var d2M = d2.getMonth();

  return d2M + 12 * d2Y - (d1M + 12 * d1Y);
};

export const dateDiffinYears = (d1, d2) => {
  return d2.getFullYear() - d1.getFullYear();
};

export const getDateDiff = (timestamp) => {
  var widget = this,
    returnText = "",
    notificationDate = convertUTCDateToLocalDate(new Date(timestamp));

  const currDate = new Date();

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
    for (var k = 0; k < favouritesArray.length; k++) {
      forexOptionsByType.Favorites.push(
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