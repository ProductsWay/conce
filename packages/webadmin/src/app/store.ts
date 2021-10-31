import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import loggerMiddleware from "redux-logger";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import emptySplitApi from "../services/empty_split_api";
import rootReducer from "./root_reducer";

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage,
    whitelist: ["user"],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loggerMiddleware, emptySplitApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
