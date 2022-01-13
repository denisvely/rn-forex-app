import { get } from "lodash";

export const getApplication = (state) => get(state, "app");
export const getUser = (state) => get(state, "app.user");
