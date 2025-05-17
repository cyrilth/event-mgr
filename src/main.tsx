import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/layout/globals.css";
import App from "./app/layout/App.tsx";
import { store } from "./lib/stores/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
