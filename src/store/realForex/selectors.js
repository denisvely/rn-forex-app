import { get } from "lodash";

export const getForexTradingSettings = (state) =>
  get(state, "realForex.realForexTradingSettings");
