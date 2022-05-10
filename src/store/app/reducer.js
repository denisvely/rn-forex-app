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
  game: null,
  dailyChanges: null,
  hash: null,
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
        limitations: action.payload.body.limitations.data,
        settings: action.payload.body.settings.data,
        games: action.payload.body.games.data,
        hash: action.payload.hash,
      };
    }
    case actionTypes.SET_GAME: {
      const stateClone = cloneDeep(state);

      return {
        ...stateClone,
        game: action.payload,
      };
    }
    case actionTypes.SET_DAILY_CHANGES: {
      const stateClone = cloneDeep(state);

      return {
        ...stateClone,
        dailyChanges: action.payload,
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
