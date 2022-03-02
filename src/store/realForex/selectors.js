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
