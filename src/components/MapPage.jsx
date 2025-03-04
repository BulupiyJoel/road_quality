import React, { useEffect, useState } from "react";
import { Box, ThemeProvider, Typography ,CssBaseline ,Toolbar,AppBar,Button} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importer Leaflet pour personnaliser les icônes si nécessaire
import axios from "axios";
import theme from "./theme";
import { Link } from "react-router-dom";

const MapPage = () => {
  const [locationData, setLocationData] = useState([]);
  
  useEffect(() => {
    // Si tu utilises une API, remplace les données statiques par un appel API pour récupérer des localisations

    const mapData = async () => {
      try {
        const response = await axios.get("/api/getMapData.php")
        setLocationData(response.data)
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    mapData()
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Qualité de Route
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{ textTransform: 'none', marginRight: 3 }}
          >
            Acceuil
          </Button>
          <Button
            component={Link}
            to="/map"
            variant="contained"
            sx={{ textTransform: 'none', marginRight: 3 }}
          >
            Map
          </Button>
          <Button
            component={Link}
            to="/init-sys"
            variant="contained"
            sx={{ textTransform: 'none', marginRight: 3 }}
          >
            View Initialization system
          </Button>
        </Toolbar>
      </AppBar>
    <Box sx={{ paddingX: 10 }}>
      <Typography variant="h3" gutterBottom>
        Carte des Routes
      </Typography>

      {/* Conteneur de la carte Leaflet */}
      <MapContainer 
        center={[-4.336617, 15.300682]} // Centré par défaut sur Paris
        zoom={15} 
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
            <Popup>{`Zone : ${location.label} | Ratio : ${location.avg_vibration}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
    </ThemeProvider>
  );
};

export default MapPage;
