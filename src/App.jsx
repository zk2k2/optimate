import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

// stylesheet
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// components
import Objectives from "./components/Objectives";
import Home from "./components/Home";
import Chat from "./components/Chat";
import WebsiteNavbar from "./components/WebsiteNavbar";
import Footer from "./components/Footer";
import Focus from "./components/Focus";

const App = () => {
  return (
    <div>
      <Router basename="/">
        <WebsiteNavbar></WebsiteNavbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="objectives" element={<Objectives />} />
          <Route path="focus" element={<Focus />}></Route>
          <Route path="chat" element={<Chat />}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
