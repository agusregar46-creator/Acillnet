import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AuthPage from "./routes/auth";

import "./styles.css";

const path = window.location.pathname;

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    {path === "/auth" ? <AuthPage /> : <App />}
  </React.StrictMode>
);