import { combineReducers } from "redux";

import appReducer from "./app/reducer";
import realForexReducer from "./realForex/reducer";

const rootReducer = combineReducers({
  app: appReducer,
  realForex: realForexReducer,
});

export default rootReducer;
