import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import {
  Inicio,
  TramitePage,
  SearchPage,
  Login,
  Register,
  ForgotPassword,
} from "./pages";
import { InformacionProvider } from "./context/InformacionProvider";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Inicio />} />
          <Route
            path="tramite/:id"
            element={
              <InformacionProvider>
                <TramitePage />
              </InformacionProvider>
            }
          />
          <Route path="search" element={<SearchPage />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
