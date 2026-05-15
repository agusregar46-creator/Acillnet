import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import AuthPage from "./routes/auth";

import "./styles.css";

const pathname = window.location.pathname;

function Root() {
  if (pathname === "/auth") {
    return <AuthPage />;
  }

  return <App />;
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);