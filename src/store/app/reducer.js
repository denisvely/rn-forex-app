/* eslint-disable camelcase */
import * as actionTypes from "./actionTypes";
import { cloneDeep } from "lodash";

const initialState = {
  isConnected: false,
  loading: true,
  hasInternetConnection: true,
  token: null,
  user: null,
  limitations: null,
  settings: null,
  games: null,
  isLogged: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INVALID_TOKEN:
      return {
        ...state,
        invalidToken: true,
      };
    case actionTypes.CONNECTION:
      return {
        ...state,
        isConnected: action.payload,
      };
    case actionTypes.NO_INTERNET_CONNECTION:
      return {
        ...state,
        hasInternetConnection: action.payload,
      };
    case actionTypes.SET_TOKEN: {
      const stateClone = cloneDeep(state);

      return {
        ...stateClone,
        token: action.payload,
        loading: false,
      };
    }
    case actionTypes.LOGIN: {
      const stateClone = cloneDeep(state);

      return {
        ...stateClone,
        token: action.payload,
        isLogged: true,
      };
    }

    case actionTypes.SET_USER: {
      const stateClone = cloneDeep(state);

      return {
        ...stateClone,
        user: action.payload,
      };
    }
    case actionTypes.SET_SERVER_SETTINGS: {
      const stateClone = cloneDeep(state);

      return {
        ...stateClone,
        limitations: action.payload.limitations.data,
        settings: action.payload.settings.data,
        games: action.payload.games.data,
      };
    }
    case actionTypes.SIGN_OUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default appReducer;
