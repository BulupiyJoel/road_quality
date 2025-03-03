import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importer Leaflet pour personnaliser les icônes si nécessaire

const MapPage = () => {
  const [locationData, setLocationData] = useState([]);
  
  // Exemple de données de localisation (remplace-les par une API réelle si nécessaire)
  const locations = [
    { id: 1, lat: 48.8566, lon: 2.3522, label: "Paris" },
    { id: 2, lat: 51.5074, lon: -0.1278, label: "London" },
    { id: 3, lat: 40.7128, lon: -74.0060, label: "New York" },
    { id: 4, lat: 34.0522, lon: -118.2437, label: "Los Angeles" }
  ];

  useEffect(() => {
    // Si tu utilises une API, remplace les données statiques par un appel API pour récupérer des localisations
    setLocationData(locations); // Ici on utilise les données statiques
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Carte des Routes
      </Typography>

      {/* Conteneur de la carte Leaflet */}
      <MapContainer 
        center={[48.8566, 2.3522]} // Centré par défaut sur Paris
        zoom={5} 
        style={{ height: "500px", width: "100%" }} // Taille de la carte
      >
        {/* Tuiles de la carte (ici on utilise OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Affichage des marqueurs pour chaque localisation */}
        {locationData.map((location) => (
          <Marker key={location.id} position={[location.lat, location.lon]}>
            <Popup>{location.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapPage;
