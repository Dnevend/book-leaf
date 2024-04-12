import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/index.tsx";
import { SupabaseAuthProvider } from "./provider/index.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SupabaseAuthProvider>
        <Router />
      </SupabaseAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
