import * as actionTypes from "./actionTypes";
import NetInfo from "@react-native-community/netinfo";
import ServiceManager from "../../utils/serviceManager/ServiceManager";
import { Storage } from "../../utils";

import tokenService from "../../services/tokenService";
import serverSettingsService from "../../services/serverSettingsService";
import userService from "../../services/userService";

export const checkConnection = (dispatch) => {
  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      dispatch({ type: actionTypes.CONNECTION, payload: state.isConnected });
    }

    dispatch({
      type: actionTypes.NO_INTERNET_CONNECTION,
      payload: state.isConnected,
    });
  });
};

// Check if we have token saved in AsyncStorage
export const checkAsyncStorage = (dispatch) => {
  Storage.getAllEssentialToServiceData().then(async ([token, sessionId]) => {
    await (token && ServiceManager.setToken(JSON.parse(token)));

    if (!token) {
      tokenService
        .getToken()
        .fetch()
        .then(async ({ response }) => {
          token = response.body.data;
          Storage.set("token", JSON.stringify(token));
          ServiceManager.setToken(token);

          const payload = {
            token,
          };

          dispatch({
            type: actionTypes.SET_TOKEN,
            payload: payload,
          });
        });
      return;
    }

    token = JSON.parse(token);
    ServiceManager.setToken(token);

    if (!isTokenValid(token)) {
      getTokenWithRefresh(token, dispatch);
      return;
    } else {
      if (token.sessionId) {
        login(dispatch, token);
      }
    }

    const payload = token;

    dispatch({
      type: actionTypes.SET_TOKEN,
      payload: payload,
    });
  });
};

export const login = (dispatch, token) => {
  Storage.set("token", JSON.stringify(token));
  ServiceManager.setToken(token);

  userService
    .getUser()
    .fetch()
    .then(({ response }) => {
      if (response.body.code !== 200) {
        return;
      }
      const body = response.getBody();

      dispatch({
        type: actionTypes.SET_USER,
        payload: body,
      });

      serverSettingsService
        .getServerSettings()
        .fetch()
        .then(({ response }) => {
          if (response.body.code !== 200) {
            return;
          }
          const body = response.getBody();

          dispatch({
            type: actionTypes.SET_SERVER_SETTINGS,
            payload: body,
          });
        });
    });

  dispatch({
    type: actionTypes.LOGIN,
    payload: token,
  });
};

export const logout = (dispatch) => {
  ServiceManager.removeToken();
  Storage.removeToken().then(() => {
    dispatch({ type: actionTypes.SIGN_OUT });
  });
};

// Helper functions for TOKEN
const isTokenValid = (token) => {
  var result = false,
    isValidObject = token && token.expire && token.expire.timestamp;

  if (isValidObject) {
    var now = new Date();
    result = token.expire.timestamp - now.getTime() > 20000;
  }

  return result;
};

const getTokenWithRefresh = (token, dispatch) => {
  if (!token) {
    return;
  }

  tokenService
    .updateRefreshToken()
    .fetch({ refreshToken: token.refreshToken })
    .then(async ({ response }) => {
      console.log("new token updateRefreshToken");
      console.log("new token updateRefreshToken");
      console.log("new token updateRefreshToken");
      console.log("new token updateRefreshToken");
      console.log("new token updateRefreshToken");
      console.log("new token updateRefreshToken");
      console.log("new token updateRefreshToken");
      if (response.body && response.body.code === 400) {
        tokenService
          .getToken()
          .fetch()
          .then(async ({ response }) => {
            let newToken = response.body.data;
            Storage.set("token", JSON.stringify(newToken));
            await ServiceManager.setToken(newToken);

            const payload = {
              newToken,
            };

            dispatch({
              type: actionTypes.SET_TOKEN,
              payload: payload,
            });
          });
      } else {
        let newToken = response.body.data;
        Storage.set("token", JSON.stringify(newToken));
        await ServiceManager.setToken(newToken);

        const payload = {
          newToken,
        };

        dispatch({
          type: actionTypes.SET_TOKEN,
          payload: payload,
        });
      }
    });
};

export const setGame = (dispatch, payload) => {
  dispatch({ type: actionTypes.SET_GAME, payload });
};
export const setDailyChanges = (dispatch, payload) => {
  dispatch({ type: actionTypes.SET_DAILY_CHANGES, payload });
};

export const setUser = (dispatch, payload) => {
  dispatch({ type: actionTypes.SET_USER, payload });
};
