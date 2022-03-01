import * as actionTypes from "./actionTypes";
import NetInfo from "@react-native-community/netinfo";
import ServiceManager from "../../utils/serviceManager";
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
    // TODO => sessionId
    // sessionId && ServiceManager.sessionId(token);
    // await (token && ServiceManager.setToken(JSON.parse(token)));

    if (!token) {
      tokenService
        .getToken()
        .fetch()
        .then(async ({ response }) => {
          token = response.body.data;
          Storage.set("token", JSON.stringify(token));
          await ServiceManager.setToken(token);

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

    if (!isTokenValid(token)) {
      getTokenWithRefresh(token);
      return;
    }
    const payload = token;

    dispatch({
      type: actionTypes.SET_TOKEN,
      payload: payload,
    });
  });
};

export const login = async (dispatch, token) => {
  // Storage.set("token", JSON.stringify(token));
  // await ServiceManager.setToken(token);

  userService
    .getUser()
    .fetch()
    .then(({ response }) => {
      const body = response.getBody();

      dispatch({
        type: actionTypes.SET_USER,
        payload: body,
      });

      serverSettingsService
        .getServerSettings()
        .fetch()
        .then(({ response }) => {
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

const getTokenWithRefresh = (token) => {
  if (!token) {
    return;
  }

  tokenService
    .updateRefreshToken()
    .fetch({ refreshToken: token.refreshToken })
    .then(async (response) => {
        if (response.response && response.response.body.code === 400) {
            tokenService
                .getToken()
                .fetch()
                .then(async ({ response }) => {
                    token = response.body.data;
                    Storage.set("token", JSON.stringify(token));
                    await ServiceManager.setToken(token);

                    const payload = {
                        token,
                    };
                });
        } else {
            const token = response.getBody();
            Storage.set("token", JSON.stringify(token));
            await ServiceManager.setToken(token);

            const payload = {
                token,
            };
        }

        dispatch({
            type: actionTypes.SET_TOKEN,
            payload: payload,
        });
    });
};

export const setGame = (dispatch, payload) => {
  dispatch({ type: actionTypes.SET_GAME, payload });
};
