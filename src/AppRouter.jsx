import React from 'react';
import { StaticRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Inicio, TramitePage } from "./pages";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Inicio />} />
          <Route path="tramite/:id" element={<TramitePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
