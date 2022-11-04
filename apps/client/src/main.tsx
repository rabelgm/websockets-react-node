import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore, StoreProvider } from "./lib/createContext";

const store = createStore({ count: 0 });
export type RootStore = ReturnType<typeof store.get>;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
