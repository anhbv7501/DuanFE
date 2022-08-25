import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import commonReducer from "./common.reducer";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";

const persistConfigAuth = {
  key: "auth",
  storage,
  whitelist: ["isLogin", "user"],
};

const persistConfigProduct = {
  key: "product",
  storage,
  whitelist: ["carts", "receipt"],
};

const rootReducer = combineReducers({
  common: commonReducer,
  auth: persistReducer(persistConfigAuth, authReducer),
  product: persistReducer(persistConfigProduct, productReducer),
});

export default rootReducer;
