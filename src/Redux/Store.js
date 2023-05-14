import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";



const middleWare = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
