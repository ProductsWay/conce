import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import App from "./app";
import store, { persistor } from "./app/store";
import ErrorBoundary from "./error_boundary";
import "./index.css";

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);
