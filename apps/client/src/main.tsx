import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore, StoreProvider } from "./lib/createContext";
import {
  createWebsocketConnection,
  WebsocketConnectionProvider,
} from "./lib/useWebsocket";

const store = createStore({ count: 0, logs: [] as string[] });
export type RootStore = ReturnType<typeof store.get>;

const connection = createWebsocketConnection("ws://localhost:4000");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <WebsocketConnectionProvider connection={connection}>
        <App />
      </WebsocketConnectionProvider>
    </StoreProvider>
  </React.StrictMode>
);
