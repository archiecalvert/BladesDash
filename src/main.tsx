import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { inject } from '@vercel/analytics';

const root = document.getElementById("root")
if (root === null) throw new Error("Root undefined")
inject()
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
