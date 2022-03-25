import * as actionTypes from "./actionTypes";
import moment from "moment";
import {signalRStart} from "./signalRActions";
import simplexServices from "../../services/simplexServices";

const getSimplexOpenTrades = simplexServices.getSimplexOpenTrades();
const getSimplexPendingOrders = simplexServices.getSimplexPendingOrders();
const getSimplexClosedPositions = simplexServices.getSimplexClosedPositions();
const getSimplexTradingSettings = simplexServices.getSimplexTradingSettings();
const getSimplexAssetSettings = simplexServices.getSimplexAssetSettings();
const getSimplexPrices = simplexServices.getSimplexPrices();
const getSimplexOptions = simplexServices.getSimplexOptions();
const getSimplexNotifications = simplexServices.getSimplexNotifications();
const getSimplexAssetsOrder = simplexServices.getSimplexAssetsOrder();

export const loadInitialSimplexData = (dispatch) => {
    getSimplexOpenTrades
        .fetch()
        .then(({response}) => {
            const body = response.body.data.forexOpenTrades.data;
            if (body.length > 0) {
                dispatch({
                    type: actionTypes.SIMPLEX_OPEN_POSITIONS,
                    payload: body,
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    getSimplexPendingOrders
        .fetch()
        .then(({response}) => {
            const body = response.body.data.results;
            if (body.length > 0) {
                dispatch({
                    type: actionTypes.SIMPLEX_PENDING_ORDERS,
                    payload: body,
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    getSimplexClosedPositions
        .fetch({
            fromDate: moment(new Date().setMonth(new Date().getMonth() - 1)).format("YYYY-MM-DD") + "T00:00:01",
            toDate: moment(new Date()).format("YYYY-MM-DD") + "T23:59:59"
        })
        .then(({response}) => {
            const body = response.body.data.trades;
            dispatch({
                type: actionTypes.SIMPLEX_CLOSED_POSITIONS,
                payload: body,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    getSimplexTradingSettings
        .fetch()
        .then(({response}) => {
            const body = response.getBody();
            dispatch({
                type: actionTypes.SIMPLEX_TRADING_SETTINGS,
                payload: body,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    getSimplexAssetSettings
        .fetch()
        .then(({response}) => {
            const body = response.body.data.forexassetsettings.data;
            dispatch({
                type: actionTypes.SIMPLEX_ASSETS_SETTINGS,
                payload: body,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    getSimplexPrices
        .fetch()
        .then(({response}) => {
            const body = response.body.data.forexPrices.data;

            dispatch({
                type: actionTypes.SIMPLEX_PRICES,
                payload: body,
            });
            // Start SignalR
            signalRStart(body, dispatch);
        })
        .catch((err) => {
            console.log(err);
        });
    getSimplexOptions
        .fetch()
        .then(({response}) => {
            const body = response.body.data;
            dispatch({
                type: actionTypes.SIMPLEX_OPTIONS_AND_BALANCE,
                payload: body,
            });
            getSimplexAssetsOrder
                .fetch()
                .then(({response}) => {
                    const body = response.body.data.Favorite;
                    dispatch({
                        type: actionTypes.SIMPLEX_ASSETS_ORDER,
                        payload: body,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
    getSimplexNotifications
        .fetch()
        .then(({response}) => {
            const notificationsData = response.body.data.slice(0, 100);
            dispatch({
                type: actionTypes.SIMPLEX_NOTIFICATIONS,
                payload: notificationsData,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
