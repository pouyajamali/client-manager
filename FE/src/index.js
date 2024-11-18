import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes, useLocation  } from "react-router-dom";
import Header from "./Components/Header/Header";
import ClientsList from "./Pages/ClientsList/ClientsList";
import "./index.scss";
import ClientDetails from "./Pages/ClientDetails/ClientDetails";
import CreateNewDocument from "./Pages/Document/CreateNewDocument/CreateNewDocument";
import Login from "./Pages/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

function RouteWrapper() {
  const location = useLocation();
  const isLoginPage  = location.pathname === "/";
  return (
    <>
      {!isLoginPage && <Header />}
      <div className={`MainContainer ${isLoginPage ? 'LoginPage' : ''}`}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/clients" element={<ClientsList />} />
          <Route exact path="/:clientId" element={<ClientDetails />} />
          <Route
            exact
            path="/document/create"
            element={<CreateNewDocument />}
          />
        </Routes>
      </div>
    </>
  );
}

root.render(
  <React.StrictMode>
    <Router>
      <RouteWrapper />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
