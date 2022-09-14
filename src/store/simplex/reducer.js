import * as actionTypes from "./actionTypes";
import { cloneDeep } from "lodash";
import {
  sortOptinsByType,
  formatSimplexOptions,
  getSimplexTotalNotifications,
  updateFavourites,
} from "./helpers";

const initialState = {
  simplexTradingSettings: null,
  simplexAssetsSettings: null,
  simplexPrices: null,
  simplexOpenPositions: null,
  simplexPendingOrders: null,
  simplexClosedPositions: null,
  simplexOptions: null,
  simplexBalance: null,
  hash: "",
  simplexOptionsByType: {
    All: {},
    Currencies: {},
    CryptoCoins: {},
    CryptoTokens: {},
    Stocks: {},
    Commodities: {},
    Futures: {},
    Favourites: [],
  },
  simplexNotifications: null,
  simplexTotalNewNotifications: null,
  simplexDailyChange: null,
  selectedAsset: null,
  currentTrade: {},
  currentlyModifiedOrder: null,
};

const simplexReducer = (state = initialState, action) => {
  const stateClone = cloneDeep(state);
  switch (action.type) {
    case actionTypes.SIMPLEX_TRADING_SETTINGS: {
      return {
        ...stateClone,
        simplexTradingSettings: action.payload,
      };
    }
    case actionTypes.SIMPLEX_ASSETS_SETTINGS: {
      return {
        ...stateClone,
        simplexAssetsSettings: action.payload,
      };
    }
    case actionTypes.SIMPLEX_PRICES: {
      return {
        ...stateClone,
        simplexPrices: action.payload,
      };
    }
    case actionTypes.SIMPLEX_OPEN_POSITIONS: {
      return {
        ...stateClone,
        simplexOpenPositions: action.payload,
      };
    }
    case actionTypes.SIMPLEX_PENDING_ORDERS: {
      return {
        ...stateClone,
        simplexPendingOrders: action.payload,
      };
    }
    case actionTypes.SIMPLEX_CLOSED_POSITIONS: {
      return {
        ...stateClone,
        simplexClosedPositions: action.payload,
      };
    }
    case actionTypes.SIMPLEX_OPTIONS_AND_BALANCE: {
      return {
        ...stateClone,
        simplexOptions: formatSimplexOptions(action.payload.options.data),
        simplexOptionsByType: sortOptinsByType(action.payload.options.data),
        hash: action.payload.options.hash,
      };
    }
    case actionTypes.SIMPLEX_NOTIFICATIONS: {
      return {
        ...stateClone,
        simplexNotifications: action.payload,
        simplexTotalNewNotifications: getSimplexTotalNotifications(
          action.payload
        ),
      };
    }
    case actionTypes.SIMPLEX_ASSETS_ORDER: {
      return {
        ...stateClone,
        simplexOptionsByType: updateFavourites(
          action.payload,
          stateClone.simplexOptionsByType
        ),
      };
    }
    case actionTypes.SET_SELECTED_ASSET: {
      return {
        ...stateClone,
        selectedAsset: action.payload,
      };
    }
    case actionTypes.SET_CURRENT_TRADE: {
      return {
        ...stateClone,
        currentTrade: action.payload,
      };
    }
    case actionTypes.SET_CURRENTLY_MODIFIED_ORDER: {
      return {
        ...stateClone,
        currentlyModifiedOrder: action.payload,
      };
    }
    case actionTypes.SIMPLEX_USER_BALANCE: {
      return {
        ...stateClone,
        simplexBalance: action.payload,
      };
    }

    default:
      return state;
  }
};

export default simplexReducer;
