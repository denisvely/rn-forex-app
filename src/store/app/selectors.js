import { get } from "lodash";

export const getApplication = (state) => get(state, "app");
export const getUser = (state) => get(state, "app.user");
export const getSettings = (state) => get(state, "app.settings");
export const getToken = (state) => get(state, "app.token");
export const getHash = (state) => get(state, "app.hash");
