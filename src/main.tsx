import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/index.tsx";
import "./index.css";
import { LogtoProviderWrap } from "./provider/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LogtoProviderWrap>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </LogtoProviderWrap>
  </React.StrictMode>
);
