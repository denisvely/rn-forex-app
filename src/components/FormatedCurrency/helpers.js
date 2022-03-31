//whether to separate the thousands with commas like 1,000,000 (1 million)
const separateThousands = false;

//if set to true in web.config - all prices in site wil be formated as '123,456'
const allPricesCommaFormatted = false;

//$(36), '¥'(165), '€'(8364), '£'(163), '₩'(8361), 'руб.'(10880+1091+1073+46)
const currenciesInfrontOfValue = [
  String.fromCharCode(36),
  String.fromCharCode(165),
  String.fromCharCode(8364),
  String.fromCharCode(8361),
  String.fromCharCode(163),
];
// currenciesSkipDecimal: [String.fromCharCode(165), String.fromCharCode(1088) + String.fromCharCode(1091) + String.fromCharCode(1073) + String.fromCharCode(46)],

// use currency code instead of symbol - false/true (#31787)
const isUsingCurrencyCode = false;

export const getCurrencySymbol = (user, tradeObj) => {
  /// <summary>Return currency symbol or code</summary>
  /// <param name="tradeObj" type="Object">(optional) openTrades/pastTrades item to get currency data from</param>
  var currency = "";

  if (typeof tradeObj == "object") {
    if (
      typeof isUsingCurrencyCode != "undefined" &&
      isUsingCurrencyCode == true
    ) {
      currency = tradeObj.currencyType;
    } else {
      currency = tradeObj.currencySymbol;
    }
  } else {
    if (
      typeof isUsingCurrencyCode != "undefined" &&
      isUsingCurrencyCode == true
    ) {
      currency = user.currencyCode;
    } else {
      currency = user.currencySymbol;
    }
  }
  return currency;
};

export const formatCurrency = (
  currencySymbol,
  value,
  numberWithCommas,
  settings
) => {
  if (numberWithCommas == undefined && separateThousands) {
    numberWithCommas = separateThousands;
  }
  //global config setting, overwrites all others
  if (allPricesCommaFormatted === true) {
    numberWithCommas = allPricesCommaFormatted;
  }

  if (
    !checkCurrencySubUnit(currencySymbol, settings) &&
    parseInt(value).toString() != "NaN" &&
    numberWithCommas
  ) {
    // removed decimal, formats in "1,234,567" format
    value = numberWithCommasFunc(Math.round(value).toString());
    // helper.getCurrenciesWithoutSubunits(currencySymbol);
  } else if (
    !checkCurrencySubUnit(currencySymbol, settings) &&
    parseInt(value).toString() != "NaN" &&
    !numberWithCommas
  ) {
    // removed decimal, formats in "1234567" format
    if (typeof value === "string" && value.indexOf(",") > -1) {
      value = parseFloat(value.replace(",", ""));
    } else {
      value = Math.round(value).toString();
    }
  } else if (
    typeof numberWithCommas != undefined &&
    numberWithCommas === true
  ) {
    // add comma as thousands separator
    value = numberWithCommasFunc(value.toString());
  }

  if (
    currenciesInfrontOfValue.indexOf(currencySymbol) > -1 ||
    (typeof isUsingCurrencyCode != "undefined" && isUsingCurrencyCode == true)
  ) {
    //the currency symbol must be infront of the value
    return currencySymbol + " " + value;
  } else return value + " " + currencySymbol;
};

export const numberWithCommasFunc = (x) => {
  if (!x) {
    return "";
  }
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const checkCurrencySubUnit = (
  currencySymbol,
  currencyCode,
  settings
) => {
  ///<summary>true if currency has subunits and false otherwise</summary>
  /// <param name="currencySymbol" type="string">The currency symbol to check whether it has subunits</param>
  var currenciesWithoutSubunits = getGlobalSetting(
      "CurrenciesWithoutSubunits",
      settings
    ),
    returnResult = true; //currency has subunits by default

  if (currenciesWithoutSubunits.length > 0) {
    $.each(currenciesWithoutSubunits, function (i, key) {
      var skipCurrency = key.symbol;
      if (skipCurrency == currencySymbol && currencyCode == key.name) {
        returnResult = false;
        return false;
      }
    });
  }

  return returnResult;
};

export const getGlobalSetting = (settingName, settings) => {
  ///<summary>Gets the setting value if the setting. If the setting  type is boolean it return bool value, if it is not, returns the current value . </summary>
  /// <param name="settingName" type="string">The name of the boolean setting </param>
  if (settings && settings.application) {
    var property = settings.application[settingName];
    if (property && property.Value) {
      if (property.Value.toString().toLowerCase() == "true") return true;
      else if (property.Value.toString().toLowerCase() == "false") return false;
      else return property.Value;
    }
  }
  return false;
};
