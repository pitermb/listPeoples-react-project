import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreProvider from "./components/Store/Provider";
import RoutesPrivate from "./components/Routes/Private/Private";
import LoginScreen from "./components/Login/LoginScreen";
import Home from "./components/Home/Home";

//Rotas para renderizar
const App = () => (
  <Router>
    <StoreProvider>
      <div>
        <Routes>
          <Route path="/login" exact element={<LoginScreen />} />
          <Route
            path="/"
            exact
            element={
              <RoutesPrivate>
                <Home />
              </RoutesPrivate>
            }
          />
        </Routes>
      </div>
    </StoreProvider>
  </Router>
);

export default App;
