import { get } from "lodash";

export const getSimplexTradingSettings = (state) =>
  get(state, "simplex.simplexTradingSettings");
export const getSimplexAssetsSettings = (state) =>
  get(state, "simplex.simplexAssetsSettings");
export const getSimplexPrices = (state) => get(state, "simplex.simplexPrices");
export const getSimplexClosedPositions = (state) =>
  get(state, "simplex.simplexClosedPositions");
export const getSimplexOpenPositions = (state) =>
  get(state, "simplex.simplexOpenPositions");
export const getSimplexPendingOrders = (state) =>
  get(state, "simplex.simplexPendingOrders");
export const getSimplexOptions = (state) =>
  get(state, "simplex.simplexOptions");
export const getSimplexBalance = (state) =>
  get(state, "simplex.simplexBalance");
export const getSimplexOptionsByType = (state) =>
  get(state, "simplex.simplexOptionsByType");
export const getSimplexNotifications = (state) =>
  get(state, "simplex.simplexNotifications");
export const getSimplexDailyChange = (state) =>
  get(state, "simplex.simplexDailyChange");
export const getSimplexTotalNewNotifications = (state) =>
  get(state, "simplex.simplexTotalNewNotifications");
export const getSelectedAsset = (state) => get(state, "simplex.selectedAsset");
export const getCurrentTrade = (state) => get(state, "simplex.currentTrade");
export const getCurrentlyModifiedOrder = (state) =>
  get(state, "simplex.currentlyModifiedOrder");
