import * as actionTypes from "./actionTypes";
import { cloneDeep } from "lodash";

const initialState = {
  realForexTradingSettings: null,
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
    default:
      return state;
  }
};

export default realForexReducer;
