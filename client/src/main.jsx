import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error("Root element not found");
}

