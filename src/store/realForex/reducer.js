import * as actionTypes from "./actionTypes";
import { cloneDeep } from "lodash";

import {
  sortOptionsByType,
  formatRealForexOptions,
  getRealForexTotalNotifications,
  updateFavourites,
} from "./helpers";

const initialState = {
  realForexTradingSettings: null,
  realForexAssetsSettings: null,
  realForexPrices: null,
  realForexSwapRates: null,
  realForexOpenPositions: null,
  realForexPendingOrders: null,
  realForexClosedPositions: null,
  realForexOptions: null,
  realForexBalance: null,
  hash: "",
  realForexOptionsByType: {
    All: {},
    Currencies: {},
    CryptoCoins: {},
    CryptoTokens: {},
    Indices: {},
    Stocks: {},
    Commodities: {},
    Futures: {},
    Favourites: [],
  },
  realForexNotifications: null,
  realForexTotalNewNotifications: null,
  realForexTraderInsight: null,
  selectedAsset: null,
};

const realForexReducer = (state = initialState, action) => {
  const stateClone = cloneDeep(state);
  switch (action.type) {
    case actionTypes.REAL_FOREX_TRADING_SETTINGS: {
      return {
        ...stateClone,
        realForexTradingSettings: action.payload,
      };
    }
    case actionTypes.REAL_FOREX_ASSETS_SETTINGS: {
      return {
        ...stateClone,
        realForexAssetsSettings: action.payload,
      };
    }
    case actionTypes.REAL_FOREX_PRICES: {
      return {
        ...stateClone,
        realForexPrices: action.payload,
      };
    }
    case actionTypes.REAL_FOREX_SWAP_RATES: {
      return {
        ...stateClone,
        realForexSwapRates: action.payload,
      };
    }
    case actionTypes.REAL_FOREX_OPEN_POSITIONS: {
      return {
        ...stateClone,
        realForexOpenPositions: action.payload,
      };
    }
    case actionTypes.REAL_FOREX_PENDING_ORDERS: {
      return {
        ...stateClone,
        realForexPendingOrders: action.payload,
      };
    }
    case actionTypes.REAL_FOREX_CLOSED_POSITIONS: {
      return {
        ...stateClone,
        realForexClosedPositions: action.payload,
      };
    }
    case actionTypes.REAL_FOREX_OPTIONS_AND_BALANCE: {
      return {
        ...stateClone,
        realForexOptions: formatRealForexOptions(action.payload.options.data),
        realForexOptionsByType: sortOptionsByType(action.payload.options.data),
        hash: action.payload.options.hash,
        realForexBalance: action.payload.balanceRealForex.data,
      };
    }
    case actionTypes.REAL_FOREX_NOTIFICATIONS: {
      return {
        ...stateClone,
        realForexNotifications: action.payload,
        realForexTotalNewNotifications: getRealForexTotalNotifications(
          action.payload
        ),
      };
    }
    case actionTypes.REAL_FOREX_ASSETS_ORDER: {
      return {
        ...stateClone,
        realForexOptionsByType: updateFavourites(
          action.payload,
          stateClone.realForexOptionsByType
        ),
      };
    }
    case actionTypes.REAL_FOREX_TRADER_INSIGHT: {
      return {
        ...stateClone,
        realForexTraderInsight: action.payload,
      };
    }
    case actionTypes.SET_SELECTED_ASSET: {
      return {
        ...stateClone,
        selectedAsset: action.payload,
      };
    }
    case actionTypes.REAL_FOREX_CLOSE_POSITION: {
      return {
        ...stateClone,
        selectedAsset: action.payload,
      };
    }

    default:
      return state;
  }
};

export default realForexReducer;
