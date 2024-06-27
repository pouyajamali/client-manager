import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import ClientsList from "./Pages/ClientsList/ClientsList";
import "./index.scss";
import ClientDetails from "./Pages/ClientDetails/ClientDetails";
import CreateNewDocument from "./Pages/Document/CreateNewDocument/CreateNewDocument";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <div className="MainContainer">
        <Routes>
          <Route exact path="/" element={<ClientsList />} />
          <Route exact path="/:clientId" element={<ClientDetails />} />
          <Route exact path="/document/create" element={<CreateNewDocument />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
