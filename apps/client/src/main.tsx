import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./lib/createContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider initialData={{ count: 0 }}>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
