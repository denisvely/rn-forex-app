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
