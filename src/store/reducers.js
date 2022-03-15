import { combineReducers } from "redux";

import appReducer from "./app/reducer";
import realForexReducer from "./realForex/reducer";
import simplexReducer from "./simplex/reducer"

const rootReducer = combineReducers({
  app: appReducer,
  realForex: realForexReducer,
  simplex: simplexReducer
});

export default rootReducer;
