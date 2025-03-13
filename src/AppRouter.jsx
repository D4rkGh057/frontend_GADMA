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
  AdminPanel,
  FormatosCRUD,
  InformacionCRUD,
  RequisitosCRUD,
  TramitesCRUD,
  UsersCRUD,
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
          <Route path="admin-panel" element={<AdminPanel />} />
          <Route path="admin-panel/users" element={<UsersCRUD />} />
          <Route path="admin-panel/tramites" element={<TramitesCRUD />} />
          <Route path="admin-panel/requisitos" element={<RequisitosCRUD />} />
          <Route path="admin-panel/informacion" element={<InformacionCRUD />} />
          <Route path="admin-panel/formatos" element={<FormatosCRUD />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
