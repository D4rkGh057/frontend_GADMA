import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Inicio, TramitePage, SearchPage } from "./pages";
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
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
