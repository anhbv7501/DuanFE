import { jsx, css } from "@emotion/react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import App from "./App";
import { persistor, store } from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
