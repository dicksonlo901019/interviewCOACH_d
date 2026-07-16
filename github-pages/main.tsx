import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "../app/page";
import CoachPage from "../app/coach/page";
import "../app/globals.css";

const isCoach = /\/coach\/?$/.test(window.location.pathname);

createRoot(document.getElementById("root")!).render(
  <StrictMode>{isCoach ? <CoachPage /> : <Home />}</StrictMode>,
);
