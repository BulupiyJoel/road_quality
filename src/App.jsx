import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import HomePage from "./components/Home";
// Importe le composant pour la page Carte et Visualisation des Données
import MapPage from "./components/MapPage"; // Remplace par ton composant de carte
import DataPage from "./components/DataPage"; // Remplace par ton composant de visualisation des données
import FirebaseAuthPage from "./components/FirebaseLogin";
import InitSystem from "./components/InitializeSystemPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<HomePage />} />

        {/* Route pour la page de la carte */}
        <Route path="/map" element={<MapPage />} />

        {/* Route pour la page de visualisation des données */}
        <Route path="/data" element={<DataPage />} />

        {/* Authentification avec Firebase et Recuperation de Token*/}
        <Route path="/login" element={<FirebaseAuthPage />} />

        {/* Init System Page*/}
        <Route path="/init-sys" element={<InitSystem/>}/>
      </Routes>
    </Router>
  );
}

export default App;
