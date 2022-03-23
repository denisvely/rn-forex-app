import { get } from "lodash";

export const getRealForexTradingSettings = (state) =>
  get(state, "realForex.realForexTradingSettings");
export const getRealForexAssetsSettings = (state) =>
  get(state, "realForex.realForexAssetsSettings");
export const getRealForexPrices = (state) =>
  get(state, "realForex.realForexPrices");
export const getRealForexSwapRates = (state) =>
  get(state, "realForex.realForexSwapRates");
export const getRealForexClosedPositions = (state) =>
  get(state, "realForex.realForexClosedPositions");
export const getRealForexOpenPositions = (state) =>
  get(state, "realForex.realForexOpenPositions");
export const getRealForexPendingOrders = (state) =>
  get(state, "realForex.realForexPendingOrders");
export const getRealForexOptions = (state) =>
  get(state, "realForex.realForexOptions");
export const getRealForexBalance = (state) =>
  get(state, "realForex.realForexBalance");
export const getRealForexOptionsByType = (state) =>
  get(state, "realForex.realForexOptionsByType");
export const getRealForexNotifications = (state) =>
  get(state, "realForex.realForexNotifications");
export const getRealForexTotalNewNotifications = (state) =>
  get(state, "realForex.realForexTotalNewNotifications");
export const getSelectedAsset = (state) =>
  get(state, "realForex.selectedAsset");
export const getCurrentTrade = (state) => get(state, "realForex.currentTrade");
