import { combineReducers } from "redux";
import InvoiceReducer from "./InvoiceReducer";
import ModalReducer from "./ModalReducer";

const rootReducer = combineReducers({
  Invoice: InvoiceReducer,
  ModalToggle: ModalReducer,
});

export default rootReducer;
