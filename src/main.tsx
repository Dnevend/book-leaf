import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/index.tsx";
import { SupabaseAuthProvider } from "./provider/index.ts";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SupabaseAuthProvider>
        <Router />
        <Toaster />
        <SonnerToaster />
      </SupabaseAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
