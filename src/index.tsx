import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SolanaProvider } from "./context";

import "./assets/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/react-odometer-theme.css";
import "./assets/css/default.scss";
import "./assets/css/style.scss";
import "./assets/css/responsive.scss";

import "bootstrap/dist/js/bootstrap.bundle.min";

createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <SolanaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SolanaProvider>
  </>
);
